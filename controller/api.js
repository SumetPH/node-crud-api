// GET index
module.exports.index = (req, res) => {
  console.log(req.user);
  res.json("Hello World.");
};
