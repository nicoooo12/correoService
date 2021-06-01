const express = require('express'); 
const passport = require('passport');

const scopesValidationHandler = require('../utils/middleware/scopeValidationHandler');

const playService = require('../services/play')

require('../utils/auth/strategies/jwt')

module.exports = function (app) {
  const router = express.Router()
  app.use('/api/play',router)

  router.put('/estado/:estado', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['put:play']),
  async (req, res, next) => {
    try {

      let editedPlay = await playService.updatePlay({ estado:  req.params.estado })
      
      res.json({
        message: 'edited',
        data: editedPlay,
      }).status(200)

    } catch (error) {
      next(error)
    }

  });



  router.put('/serie/:serie', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['put:play']),
  async (req, res, next) => {
    try {

      let editedPlay = await playService.updatePlay({ serieJuego:  req.params.serie })
      
      res.json({
        message: 'edited',
        data: editedPlay,
      }).status(200)

    } catch (error) {
      next(error)
    }

  });


  router.put('/comment', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['put:play']),
  async (req, res, next) => {
    try {

      let editedPlay = await playService.updatePlay({ comment:  req.body.comment })
      
      res.json({
        message: 'edited',
        data: editedPlay,
      }).status(200)

    } catch (error) {
      next(error)
    }

  });


  router.get('/', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {

      let editedPlay = await playService.getPlay()
      
      res.json({
        message: 'ok',
        data: editedPlay,
      }).status(200)

    } catch (error) {
      next(error)
    }

  });

}