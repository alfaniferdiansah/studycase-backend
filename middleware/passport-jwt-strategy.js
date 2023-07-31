// ...

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const passport = require('passport');
const errorMessage = require('../constant/errorMessage');

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'myscreet',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
          const { userId, name } = token;
          const user = await User.findOne({ name });
          if (user) {
              return done(null, user);
          }
          return done(null, false, { message: errorMessage.UN_AUTHENTICATED });
      } catch (error) {
          return done(error)
      }
    }
  )
);