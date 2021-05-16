const express = require('express')
const router = express.Router()
module.exports = function (app) {
  app.use('/api',router)

  //API premios ---
  router.post('/premio',(req,res)=>{
    //crear (premio_nombre)
    res.send('hola mundo')
  })
  router.get('/premio',(req,res)=>{
    //obtener (premio_nombre)
    res.send('hola mundo')
  })
  router.put('/premio',(req,res)=>{
    //editar (id, premio_nombre)
    res.send('hola mundo')
  })
  router.delete('/premio',(req,res)=>{
    //Eliminar (id)
    res.send('hola mundo')
  })
  
}