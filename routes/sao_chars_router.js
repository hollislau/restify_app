const SaoChar = require(__dirname + "/../models/sao_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

module.exports = function (server) {
  server.post("/api/saochars", (req, res, next) => {
    var newSaoChar = new SaoChar(req.body);

    newSaoChar.save((err, data) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, data);
      next();
    });
  });

  server.get("/api/saochars", (req, res, next) => {
    SaoChar.find(null, (err, data) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, data);
      next();
    });
  });

  server.put("/api/saochars/:id", (req, res, next) => {
    var saoCharData = req.body;

    delete req.body._id;
    SaoChar.update({ _id: req.params.id }, saoCharData, (err, raw) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, { msg: "SAO character updated!", raw: raw });
      next();
    });
  });

  server.del("/api/saochars/:id", (req, res, next) => {
    SaoChar.remove({ _id: req.params.id }, (err, product) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, { msg: "SAO character deleted!", product: product });
      next();
    });
  });
};
