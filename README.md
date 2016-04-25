# Different Server-Side Framework - Restify App

Store your favorite fantasy characters in a MongoDB database. Install using `npm install` and verify the tests with `npm test`. Start up your local install of MongoDB, then run `npm start` to get your server going. The port defaults to `3000` unless you have a PORT environment variable set up. Assuming a default port, POST new characters to <http://localhost:3000/api/fantasychars>.

The schema for a character is as follows:
```
{
  name: String,
  gender: String,
  weapon: String
}
```
New characters will be stored in a `fantasychars` collection in a `fantasy` MongoDB database. After creating them, you can return a list of all characters in your collection by submitting a GET request to the path shown above. You may UPDATE or DELETE your characters by submitting requests to the path followed by the MongoDB ID number of the character you wish to update/delete. For example:
```
UPDATE http://localhost:3000/api/fantasychars/:id
DELETE http://localhost:3000/api/fantasychars/:id
```
Enjoy!
