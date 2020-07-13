const express = require("express");
const app = express();

// mongoDB connect
const mongoose = require("mongoose");
const dbURL = "mongodb://root:admin123456@ds161950.mlab.com:61950/node-login";
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// req by json
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// auth route
const auth = require("./route/auth");
app.use("/auth", auth);

// api routes protect with passport
require("./config/passport");
const passport = require("passport");
const api = require("./route/api");
app.use("/api", passport.authenticate("jwt", { session: false }), api);

// start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server on http://localhost:${port}`));
