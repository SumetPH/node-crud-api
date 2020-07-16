// passport config
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
const key = require("../config/key");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = key.secretKye;

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({ _id: payload._id }, (err, result) => {
        if (err) return done(err, false);
        if (!result) return done(null, false);
        done(null, result);
      });
    })
  );
};
