
const passport = require('passport');
const { NOT_AUTHENTICATED_CODE } = require('../constant/errorCode');
const { UNAUTHORIZED } = require('../constant/errorHttp');
const { UNAUTHORIZED_USER } = require('../constant/errorMessage');
const HttpError = require('../interface/httpError');

const authorized = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
      // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
      if (err || !user) {
        // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
        const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
        return next(error);
      } else {
        req.user = {
          name: user.name,
          userId: user._id,
          role: user.role
        }
        return next();
      }
    })(req, res, next);
}

module.exports = {
    authorized
}