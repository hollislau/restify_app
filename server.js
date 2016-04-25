const restify = require("restify");
const server = restify.createServer();
const mongoose = require("mongoose");
const SaoChar = require(__dirname + "/models/sao_char");
const serverErrorHandler = require(__dirname + "/lib/server_error_handler");

server.use(restify.bodyParser());

server.post("/api/sao", (req, res, next) => {
  var newSaoChar = new SaoChar(req.body);

  newSaoChar.save((err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.json(200, data);
    next();
  });
});

server.get("/api/sao", (req, res, next) => {
  SaoChar.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.json(200, data);
    next();
  });
});

server.put("/api/sao/:id", (req, res, next) => {
  var saoCharData = req.body;

  delete req.body._id;
  SaoChar.update({ _id: req.params.id }, saoCharData, (err) => {
    if (err) return serverErrorHandler(err, res);

    res.json(200, { msg: "SAO character updated!" });
    next();
  });
});

server.del("/api/sao/:id", (req, res, next) => {
  SaoChar.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrorHandler(err, res);

    res.json(200, { msg: "SAO character deleted!" });
    next();
  });
});

module.exports = function (port, cb) {
  cb = cb || (() => {});
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sao");

  return server.listen(port, () => {
    process.stdout.write("Server up on port " + port + "\n");
    cb();
  });
};
