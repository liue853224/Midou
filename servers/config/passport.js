const passport = require("passport");
const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { User } = require("../models");

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    User.findByPk(jwtPayload.id)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return cb(null, user);
      })
      .catch((err) => cb(err));
  })
);

module.exports = passport;
