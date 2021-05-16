const express = require('express')
const passport = require('passport');

const scopesValidationHandler = require('../utils/middleware/scopeValidationHandler');
const validationHandler = require('../utils/middleware/validationHandler')

const cartonesService = require('../services/cartones')

const {
  createCartonSchema
} = require('../utils/schemas/carton')
const idSchema = require('../utils/schemas/id')

require('../utils/auth/strategies/jwt')

module.exports = function (app) {
  const router = express.Router()
  app.use('/api/cartones',router)

  router.post('/:idUser/:serie', //create carton (id, serie)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:carton']),
  validationHandler(createCartonSchema, 'params'),
  async (req,res,next)=>{
    try {
      
      let newCarton = await cartonesService.createCarton(req.params.idUser, req.params.serie)
      
      res.json({
        message: 'created',
        data: newCarton
      }).status(201)

    } catch (err) {
      next(err)
    }
  })

  router.get('/mys', //get My cartones (user.id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:myCarton']),
  // validationHandler(createCartonSchema),
  async (req,res,next)=>{
    try {
      
      let getCartones = await cartonesService.getCarton({ user: req.user._id})
      
      res.json({
        message: 'ok',
        data: getCartones
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/mys/:serie', //get My cartones (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:myCarton']),
  // validationHandler(createCartonSchema),
  async (req,res,next)=>{
    try {
      
      let getCartones = await cartonesService.getCarton({ user: req.user._id, serie: req.params.serie })
      
      res.json({
        message: 'ok',
        data: getCartones
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/user/:id', //get My cartones (user.id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:cartonUser']),
  validationHandler(idSchema, 'params'),
  async (req,res,next)=>{
    try {
      let getCartones = await cartonesService.getCarton({ user: req.params.id})
      
      res.json({
        message: 'ok',
        data: getCartones
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', //get My cartones (user.id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:cartonById']),
  validationHandler(idSchema, 'params'),
  async (req,res,next)=>{
    try {
      let getCartones = await cartonesService.getCarton({ _id: req.params.id})
      
      res.json({
        message: 'ok',
        data: getCartones
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/', //get My cartones (user.id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:cartones']),
  async (req,res,next)=>{
    try {
      let getCartones = await cartonesService.getCarton({})
      
      res.json({
        message: 'ok',
        data: getCartones
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.delete('/:id', //get My cartones (user.id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['deleted:carton']),
  validationHandler(idSchema, 'params'),
  async (req,res,next)=>{
    try {
      
      let deletedCartones = await cartonesService.deletedCarton({ _id: req.params.id})
      
      res.json({
        message: deletedCartones.message,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

}