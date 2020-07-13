const route = require("express").Router();

route.get("/", (req, res) => {
  res.json("Hello World.");
});

module.exports = route;
