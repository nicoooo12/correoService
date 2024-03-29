const express = require('express');

const CorreoService = require('../services/correo');

module.exports = function(app) {
  const router = new express.Router();
  app.use('/api', router);

  router.post('/sendConfirmationEmail',
      async (req, res, next)=>{
        try {
          CorreoService.correoConfirmation(
              req.body.email,
              req.body.name,
              req.body.cartones,
              req.body.catalogos,
              req.body.orden,
              req.body.fecha,
          );

          res.json({
            message: 'ok',
          }).status(200);
        } catch (error) {
          throw new Error(error);
        }
      },
  );

  router.post('/sendCodeChangePassword',
      async (req, res, next)=>{
        try {
          CorreoService.correoChangePassword(
              req.body.email,
              req.body.name,
              req.body.code,
          );

          res.json({
            message: 'ok',
          }).status(200);
        } catch (error) {
          throw new Error(error);
        }
      },
  );

  router.post('/massageOrden',
      async (req, res, next)=>{
        try {
          CorreoService.massageOrden(
              req.body.email,
              req.body.name,
              req.body.message,
          );

          res.json({
            message: 'ok',
          }).status(200);
        } catch (error) {
          throw new Error(error);
        }
      },
  );
};
