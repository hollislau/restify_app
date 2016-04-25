const restify = require("restify");
const server = restify.createServer();
const mongoose = require("mongoose");
server.use(restify.bodyParser());
require(__dirname + "/routes/sao_chars_router")(server);

module.exports = function (port, cb) {
  cb = cb || (() => {});
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sao");

  return server.listen(port, () => {
    process.stdout.write("Server up on port " + port + "\n");
    cb();
  });
};
