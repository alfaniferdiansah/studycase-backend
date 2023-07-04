// ...
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const errorMessage = require('../constant/errorMessage');


passport.use(
    'login',
    new localStrategy(
      {
        username: 'username',
        password: 'password',
      },
      async (username, password, done) => {
        console.log(username, password);
        try {
          const user = await User.findOne({
              username,
          });
          if (!user) {
              return done(null, false, { message: errorMessage.UN_AUTHENTICATED });
          }
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
              return done(null, false, { message: errorMessage.UN_AUTHENTICATED });
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );