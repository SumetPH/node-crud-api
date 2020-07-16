const jwt = require("jsonwebtoken");
const key = require("../config/key");
const User = require("../model/User");

// POST register
module.exports.register = (req, res) => {
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
};

// POST login
module.exports.login = (req, res) => {
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
};
