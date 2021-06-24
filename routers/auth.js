const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const apiKeysService = require('../services/apiKeys');
const usersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const scopesValidationHandler =
require('../utils/middleware/scopeValidationHandler');

const {
  createUserSchema,
  updateUserSchema,
} = require('../utils/schemas/users');
// const idSchema = require('../utils/schemas/id');

const config = require('../config');

// Basic strategy
require('../utils/auth/strategies/basic');
require('../utils/auth/strategies/jwt');

const authApi = (app) => {
  const router = new express.Router();
  app.use('/api/auth', router);

  router.post('/sign-in', async (req, res, next) => {
    const {apiKeyToken} = req.body;

    if (!apiKeyToken) {
      return next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', async function(error, user) {
      try {
        if (error || !user) {
          return next(boom.unauthorized());
        }
        req.login(user, {session: false}, async function(error) {
          if (error) {
            return next(error);
          }

          const apiKey = apiKeysService.getApiKey({token: apiKeyToken});
          if (!apiKey) {
            return next(boom.unauthorized());
          }

          const {_id: id, name, email} = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '20d',
          });

          return res.status(200).json({token, user: {id, name, email}});
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up',
      validationHandler(createUserSchema),
      async function(
          req,
          res,
          next,
      ) {
        const {body: user} = req;

        try {
          const createdUserId = await usersService.createUser({user});

          res.status(201).json({
            data: createdUserId,
            message: 'user created',
          });
        } catch (error) {
          next(error);
        }
      });

  router.put('/',
      passport.authenticate('jwt', {session: false}),
      validationHandler(updateUserSchema),
      async (req, res, next)=>{
        try {
          const updateUser = await usersService.updateUser(
              req.user._id,
              req.body,
          );

          res.json({
            message: 'ok',
            data: updateUser,
          }).status(200);
        } catch (err) {
          next(err);
        }
      });

  router.get('/isauth',
      passport.authenticate('jwt', {session: false}),
      (req, res)=>{
        res.json({
          message: 'ok',
        }).status(200);
      });

  router.get('/:correo',
      passport.authenticate('jwt', {session: false}),
      scopesValidationHandler(['read:cartonUser']),
      async (req, res, next)=>{
        try {
          const getUser = await usersService.getUser({
            email: req.params.correo,
          });
          res.json({
            message: 'ok',
            data: {
              email: getUser.email,
              name: getUser.name,
              id: getUser._id,
            },
          }).status(200);
        } catch (error) {
          next(error);
        }
      });
};

module.exports = authApi;
