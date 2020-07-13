const route = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const key = require("../config/key");

// register to db
route.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, result) => {
    if (err) {
      return res.json("Something error.", err);
    }
    if (result) {
      return res.json("This username already exists.");
    }

    const newUser = new User({
      username: username,
      password: password,
    });
    newUser.save();
    res.json("Registered");
  });
});

// login return token.
route.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username, password: password }, (err, result) => {
    if (err) {
      return res.json("Something error.", err);
    }
    if (!result) {
      return res.json("username or password incorrect.");
    }
    const token = jwt.sign(
      { _id: result._id, username: result.username },
      key.secretKye
    );
    res.json(`Bearer ${token}`);
  });
});

module.exports = route;
