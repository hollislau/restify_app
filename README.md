# Different Server-Side Framework - Restify App

Store your favorite Star Trek and Star Wars characters in a database and randomly pit them against one another in battle. Install using `npm install` and verify the tests with `npm test`. Start up your local install of MongoDB, then run `npm start` to get your server going. The port defaults to `3000` unless you have a PORT environment variable set up. Assuming a default port, POST your favorite Star Trek characters to <http://localhost:3000/api/startrekchars> and your favorite Star Wars heroes to <http://localhost:3000/api/starwarschars>.

The schema for Star Trek characters is as follows:
```
{
  name: String,
  gender: String,
  rank: String,
  weapon: String [default: "Phaser"],
  power: Number,
  ship: String [default: "Enterprise"]
}
```
The schema for Star Wars heroes is as follows:
```
{
  name: String,
  gender: String,
  weapon: String,
  power: Number,
  planet: String
}
```
The `name`, `weapon`, and `power` fields are required; the others are optional. The `power` value represents the strength of the character in battle. A character with a larger `power` value will always defeat one with a smaller value. Choose any `power` values you like, but they must be valid numbers.

After creating your characters, you can return a list of all characters in your collection by submitting a GET request to the appropriate path (see above). You may UPDATE or DELETE your characters by submitting requests to the appropriate paths, followed by the MongoDB ID number of the character you wish to update/delete. For example:
```
UPDATE http://localhost:3000/api/startrekchars/:id
DELETE http://localhost:3000/api/starwarschars/:id
```
Once your collection is complete, send your heroes into battle by submitting a GET request to <http://localhost:3000/api/battle>. The server will randomly select one Star Trek and one Star Wars character to fight against each other, and return an outcome depending on the power levels of the respective characters.
