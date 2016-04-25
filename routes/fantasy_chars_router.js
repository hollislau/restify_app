const FantasyChar = require(__dirname + "/../models/fantasy_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

module.exports = function (server) {
  server.post("/api/fantasychars", (req, res, next) => {
    var newFantasyChar = new FantasyChar(req.body);

    newFantasyChar.save((err, data) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, data);
      next();
    });
  });

  server.get("/api/fantasychars", (req, res, next) => {
    FantasyChar.find(null, (err, data) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, data);
      next();
    });
  });

  server.put("/api/fantasychars/:id", (req, res, next) => {
    var fantasyCharData = req.body;

    delete req.body._id;
    FantasyChar.update({ _id: req.params.id }, fantasyCharData, (err, raw) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, { msg: "Fantasy character updated!", raw: raw });
      next();
    });
  });

  server.del("/api/fantasychars/:id", (req, res, next) => {
    FantasyChar.remove({ _id: req.params.id }, (err, product) => {
      if (err) return serverErrorHandler(err, res);

      res.json(200, { msg: "Fantasy character deleted!", product: product });
      next();
    });
  });
};
