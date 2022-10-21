--
-- This SQL script implements sample queries on the Monopoly database.
--
-- @author kvlinden
-- @version Summer, 2015
--
-- Get the number of Game records.
SELECT *
FROM Game;
-- Get the player records.
SELECT *
FROM Player;
-- Get all the users with Calvin email addresses.
SELECT *
FROM Player
WHERE emailAddress LIKE '%calvin%';
-- Get the highest score ever recorded.
SELECT score
FROM PlayerGame
ORDER BY score DESC
LIMIT 1;
-- Get the cross-product of all the tables.
SELECT *
FROM Player,
  PlayerGame,
  Game;
-- Exercise 8.1 --
-- Get a list of all the games, ordered by date with the most recent game coming first
SELECT *
FROM game
ORDER BY time DESC;
-- Get all the games that occurred in the past week
SELECT *
FROM game
WHERE time > '2022-10-14';
-- Get a list of players who have non-NULL names
SELECT *
FROM player
WHERE name IS NOT NULL;
-- Get a list of ID's for players who have some game score larger than 2000
SELECT playerid
FROM playergame
WHERE score > 2000;
-- Get a list of players who have GMail accounts
SELECT *
FROM player
WHERE emailaddress IS NOT NULL;
-- Exercise 8.2 --
-- Get all "The King"'s games scores in decreasing order
SELECT *
FROM playergame,
  player
WHERE playerid = 2
ORDER BY score DESC;
-- Get the name of the winner of the game played on 2006-06-28 13:20:00
SELECT Player.name
FROM Player,
  PlayerGame,
  Game
WHERE Game.time = '2006-06-28 13:20:00'
  AND PlayerGame.gameID = Game.ID
  AND PlayerGame.playerID = Player.ID
ORDER BY score DESC
LIMIT 1;
-- What does P1.ID < P2.ID clause do in the last example query
SELECT P1.name
FROM Player AS P1,
  Player AS P2
WHERE (P1.name = P2.name)
  AND (P1.ID < P2.ID);
-- It's possible that there are different players with the same name.
-- P1.ID < P2.ID compares those players and gives the player whose ID number is bigger.
-- The query that joined the Player table to itself seems rather contrived. Can you think of a realistic situation in whic youd want to join a table to itself
-- Compares the player's data to find a pattern of wining and losing.