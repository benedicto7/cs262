/**
 * This module implements a REST-inspired webservice for the Monopoly DB.
 * The database is hosted on ElephantSQL.
 *
 * Currently, the service supports the player table only.
 *
 * To guard against SQL injection attacks, this code uses pg-promise's built-in
 * variable escaping. This prevents a client from issuing this URL:
 *     https://cs262-monopoly-service.herokuapp.com/players/1%3BDELETE%20FROM%20PlayerGame%3BDELETE%20FROM%20Player
 * which would delete records in the PlayerGame and then the Player tables.
 * In particular, we don't use JS template strings because it doesn't filter
 * client-supplied values properly.
 *
 * TODO: Consider using Prepared Statements.
 *      https://vitaly-t.github.io/pg-promise/PreparedStatement.html
 *
 * @author: kvlinden
 * @date: Summer, 2020
 */

// Set up the database connection.
const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.DB_SERVER, //	peanut.db.elephantsql.com
    port: process.env.DB_PORT, //5432
    database: process.env.DB_USER,
    user: process.env.DB_USER, //zggmnmkr
    password: process.env.DB_PASSWORD //Xa697pyBTQ6H9mrRsiawNmClV-HWEwLN
});

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Configure the server and its routes.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

// Home screen
router.get("/", readHelloMessage);

// Players
router.get("/players", readPlayers);
router.get("/players/:id", readPlayer);
router.put("/players/:id", updatePlayer);
router.post('/players', createPlayer);
router.delete('/players/:id', deletePlayer);

// PlayerGame
router.get("/playergame", readPlayerGames);
router.get("/playergame/game=:id", readPlayersInGame);
router.get("/playergame/player=:id", readGamesWithPlayer);

// Players and PlayerGame
router.get("/player_playergame", joinPlayer_PlayerGame);

app.use(router);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));

// Implement the CRUD operations.

function errorHandler(err, req, res) {
    if (app.get('env') === "development") {
        console.log(err);
    }
    res.sendStatus(err.status || 500);
}

function returnDataOr404(res, data) {
    if (data == null) {
        res.sendStatus(404);
    } else {
        res.send(data);
    }
}

// Home screen
function readHelloMessage(req, res) {
    res.send('Hello, CS 262 Monopoly service!');
}

// Players
function readPlayers(req, res, next) {
    db.many("SELECT * FROM Player")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readPlayer(req, res, next) {
    db.oneOrNone('SELECT * FROM Player WHERE id=${id}', req.params)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        });
}

function updatePlayer(req, res, next) {
    db.oneOrNone('UPDATE Player SET email=${body.email}, name=${body.name} WHERE id=${params.id} RETURNING id', req)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        });
}

function createPlayer(req, res, next) {
    db.one('INSERT INTO Player(email, name) VALUES (${email}, ${name}) RETURNING id', req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function deletePlayer(req, res, next) {
    db.oneOrNone('DELETE FROM Player WHERE id=${id} RETURNING id', req.params)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        });
}

// PlayerGame
function readPlayerGames(req, res, next) {
    db.many("SELECT * FROM PlayerGame")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readPlayersInGame(req, res, next) {
    db.many(`SELECT * FROM PlayerGame WHERE gameID=${req.params.id}`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readGamesWithPlayer(req, res, next) {
    db.many(`SELECT * FROM PlayerGame WHERE playerID=${req.params.id}`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

// Player and PlayerGame
function joinPlayer_PlayerGame(req, res, next) {
    db.many("SELECT * FROM Player, PlayerGame WHERE playerID = Player.ID")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}