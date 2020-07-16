const express = require("express");
const app = express();

// req by json
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// mongoDB connect
const mongoose = require("mongoose");
require("./config/mongoose")(mongoose);

// passport config
const passport = require("passport");
require("./config/passport")(passport);

// route
const route = require("./route");
app.use(route);

// start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server on http://localhost:${port}`));
