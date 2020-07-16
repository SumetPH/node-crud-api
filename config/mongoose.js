module.exports = (mongoose) => {
  const key = require("./key");
  mongoose.connect(key.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
};
