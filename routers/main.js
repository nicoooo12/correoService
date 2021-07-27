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
              req.body.cartones,
              req.body.catalogos,
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
