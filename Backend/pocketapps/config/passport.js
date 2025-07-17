const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { mypocket_info } = require("../model"); // correct path to your model
require("dotenv").config(); // load environment variables

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "your_secret_key",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("🔐 Passport verifying token payload:", jwt_payload);
    try {
      const user = await mypocket_info.findByPk(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      console.error("Passport JWT error:", err);
      return done(err, false);
    }
  })
);

module.exports = passport;
