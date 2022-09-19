const express = require('express');

const CorreoService = require('../services/correo');

module.exports = function(app) {
  const router = new express.Router();
  app.use('/api', router);

  router.post('/',
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
};
