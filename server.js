const restify = require("restify");
const server = restify.createServer();
const mongoose = require("mongoose");

server.use(restify.bodyParser());

require(__dirname + "/routes/fantasy_chars_router")(server);

module.exports = function (port, cb) {
  cb = cb || (() => {});
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fantasy");

  return server.listen(port, () => {
    process.stdout.write("Server up on port " + port + "\n");
    cb();
  });
};
