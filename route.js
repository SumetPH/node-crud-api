const route = require("express").Router();
const passport = require("passport");
const checkAuth = passport.authenticate("jwt", { session: false });

const auth = require("./controller/auth");
route.post("/auth/register", auth.register);
route.post("/auth/login", auth.login);

const api = require("./controller/api");
route.get("/api", checkAuth, api.index);

module.exports = route;
