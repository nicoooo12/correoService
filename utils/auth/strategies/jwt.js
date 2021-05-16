const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const usersService = require('../../../services/users');
const config = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
      try {
        const user = await usersService.getUser({ email: tokenPayload.email });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        cb(null, { 
          _id : user._id,
          name : user.name,
          email: user.email,
          scopes: tokenPayload.scopes 
        });
      } catch (error) {
        return cb(error);
      }
    }
  )
);