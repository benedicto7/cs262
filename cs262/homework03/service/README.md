1. What are the (active) URLs for your data service?

   /players
   /players/[id]
   /playergame
   /playergame/game=[id]
   /playergame/player=[id]
   /player_playergame

2. Which of these endpoints implement actions that are idempotent? nullipotent?

   All of the endspoints are both idempotent and nullipotent because they are HTTP GET commands.

3. Is the service RESTful? If not, why not? If so, what key features make it RESTful.

   The service is RESTful because it is stateless, uses HTTP protocol, and data are formatted in JSON.

4. Is there any evidence in your implementation of an impedance mismatch?

   No because the data types used in PostgreSQL can be implemented/converted to JavaScript data types.
