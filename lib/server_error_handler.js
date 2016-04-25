module.exports = function (err, res) {
  process.stderr.write(err + "\n");
  res.json(500, { msg: "Server error" });
};
