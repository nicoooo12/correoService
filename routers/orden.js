const express = require('express')
const passport = require('passport');
const boom = require('@hapi/boom')

const scopesValidationHandler = require('../utils/middleware/scopeValidationHandler');
const validationHandler = require('../utils/middleware/validationHandler')
const refresh = require('../services/refresh')

const {
  createOrdenSchema,
  addCanvasUrlSchema,
  editOrdenSchema,
  addCommentSchema,
  endSchema
} = require('../utils/schemas/orden')
const idsSchema = require('../utils/schemas/id')

const ordenServices = require('../services/ordenes')
require('../utils/auth/strategies/jwt');


module.exports = function (app) {
  const router = express.Router()
  app.use('/api/orden',router)
  

  router.post('/my', //create My orden (user.id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:myOrden']),
  validationHandler(createOrdenSchema),
  async (req,res,next)=>{
    let {compra, totalPago, tipoDePago, } = req.body
    try {
      let newOden = await ordenServices.createOrden(
        compra,
        totalPago,
        tipoDePago,
        req.user._id
      )

      if(newOden.err){
        next(boom.badRequest('orden already created, finish or cancel to be able to create another'))
      }

      res.json({
        message: 'created',
        data: newOden.newOrden,  
      }).status(201)

    } catch (err) {
      next(err)
    }
  })

  router.post('/canvas', //add canvas Url (user.id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:canvasOrden']),
  validationHandler(addCanvasUrlSchema),
  async (req,res, next)=>{
    try {
      let addCanvasUrl = await ordenServices.addCanvasUrl(
        req.user._id,
        req.body.data.blob()
      )

      res.json({
        message: 'added',
        data: addCanvasUrl,
      }).status(201)

    } catch (err) {
      next(err)
    }
  })

  router.post('/:id', //create orden (id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:orden']),
  validationHandler(idsSchema, 'params'),
  validationHandler(createOrdenSchema),
  async (req,res,next)=>{
    let {compra, totalPago, tipoDePago, } = req.body
    try {
      let newOden = await ordenServices.createOrden(
        compra,
        totalPago,
        tipoDePago,
        req.params.id
      )

      if(newOden.err){
        next(boom.badRequest('orden already created, finish or cancel to be able to create another'))
      }

      res.json({
        message: 'created',
        data: newOden.newOrden,  
      }).status(201)

    } catch (err) {
      next(err)
    }
  })

  router.post('/comment/:id', //create orden (id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:commentOrden']),
  validationHandler(idsSchema, 'params'),
  validationHandler(addCommentSchema),
  async (req,res,next)=>{

    try {
      let newCommentOden = await ordenServices.addComment(
        req.params.id,
        req.body.message
      )

      refresh(req.params.id)

      res.json({
        message: 'add comment',
        data: newCommentOden,  
      }).status(201)

    } catch (err) {
      next(err)
    }
  })

  router.get('/my', //read my orden (user.id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:myOrden']),
  async (req,res, next)=>{
    try {
      
      let getOrden = await ordenServices.getOrden(req.user._id)

      res.json({
        message:'ok',
        data: getOrden,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/terminadas/my', //read my orden (user.id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:myOrden']),
  async (req,res, next)=>{
    try {
      
      let getOrden = await ordenServices.getOrdenTerminadas(req.user._id)

      res.json({
        message:'ok',
        data: getOrden,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', //read orden (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:ordenId']),
  validationHandler(idsSchema, 'params'),
  async (req,res, next)=>{
    try {
      
      let getOrden = await ordenServices.getOrden(req.params.id)

      res.json({
        message:'ok',
        data: getOrden,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/terminadas/:id', //read orden (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:ordenId']),
  validationHandler(idsSchema, 'params'),
  async (req,res, next)=>{
    try {
      
      let getOrden = await ordenServices.getOrdenTerminadas(req.params.id)

      res.json({
        message:'ok',
        data: getOrden,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/', //read ordenes
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:ordenes']),
  async (req,res, next)=>{
    try {
      
      let getOrden = await ordenServices.getOrdenes()

      res.json({
        message:'ok',
        data: getOrden,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/canvas/my', //read canvas (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:myCanvas']),
  async (req,res, next)=>{
    try {
      
      let getCanvasOrden = await ordenServices.getCanvasOrden(req.user._id)

      if(getCanvasOrden.canvas){
        res.json({
          message:'ok',
          data: getCanvasOrden.data,
        }).status(200)
      }else{
        next(boom.badRequest('canvas no existe'))
      }


    } catch (err) {
      next(err)
    }
  })
  
  router.get('/canvas/:id', //read canvas (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:canvas']),
  validationHandler(idsSchema, 'params'),
  async (req,res, next)=>{
    try {
      
      let getCanvasOrden = await ordenServices.getCanvasOrden(req.params.id)

      if(getCanvasOrden.canvas){
        res.json({
          message:'ok',
          data: getCanvasOrden.data,
        }).status(200)
      }else{
        next(boom.badRequest('canvas no existe'))
      }


    } catch (err) {
      next(err)
    }
  })

  router.put('/my', //update orden (id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:myOrden']),
  validationHandler(editOrdenSchema),
  async (req,res,next)=>{
    try {
      let editOrden = await ordenServices.editOrden(req.user._id,req.body)

      res.json({
        message:'edited',
        data: editOrden
      }).status(200)

    } catch (err) {
      next(err)
    }
  })


  router.put('/:id', //update orden (id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:orden']),
  validationHandler(idsSchema, 'params'),
  validationHandler(editOrdenSchema),
  async (req,res,next)=>{
    try {
      let editOrden = await ordenServices.editOrden(req.params.id,req.body)

      refresh(req.params.id)

      res.json({
        message:'edited',
        data: editOrden
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.delete('/my', //cancel orden (user.id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['deleted:myOrden']),
  async (req,res,next)=>{
    try {

      let editOrden = await ordenServices.cancelOrden(req.user._id)

      res.json({
        ...editOrden
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.delete('/:id', //cancel orden (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['deleted:orden']),
  validationHandler(idsSchema, 'params'),
  async (req,res,next)=>{
    try {

      let editOrden = await ordenServices.cancelOrden(req.params.id)

      refresh(req.params.id)

      res.json({
        ...editOrden
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.post('/end/:id', //end orden (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['end:orden']),
  validationHandler(idsSchema, 'params'),
  validationHandler(endSchema),
  async (req,res,next)=>{
    try {
      // console.log(req.body.comment);
      let editOrden = await ordenServices.terminarOrden(req.params.id, req.body.pagado, req.body.correo, req.body.comment)

      refresh(req.params.id)

      res.json({
        message:'finished successfully',
        data: editOrden
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

}