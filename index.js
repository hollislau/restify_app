const server = module.exports = require(__dirname + "/server");
const port = process.env.PORT || 3000;

server(port);
