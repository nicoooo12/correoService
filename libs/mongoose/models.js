const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchemaUsers = new Schema({
  name: String,
  email: String,
  // telefono: Number,
  password: String,
})

const mySchemaCartones = new Schema({
  user: String,
  data: Array,
  serie: Number,
})

const mySchemaCatalogos = new Schema({
  premios: Array,
  titulo: String,
  subTitulo: String,
  precio: Number,
  enVenta: Boolean,
  serie: Number,
  // color: String,
  // emoji: String,
})

const mySchemaOrdenes = new Schema({
  compra: Array,
  totalPago: Number,
  tipoDePago: String,
  estado: Number, // 0: finalizado, 1: en revisión, 2: iniciada
  canvasUrl: Boolean,
  user: String,
  message: String,
})

const mySchemaOrdenesTerminadas = new Schema({
  compra: Array,
  pago: Number,
  pagado: Number,
  user: String,
  comment: String,
})

const mySchemaEstados = new Schema({
  
})

const mySchemaErrores = new Schema({
  type: String,
  stack: String,
  url: String,
  user: Object,
})


const users = mongoose.model('users', mySchemaUsers)
const cartones = mongoose.model('cartones', mySchemaCartones)
const catalogos = mongoose.model('catalogos', mySchemaCatalogos)
const ordenes = mongoose.model('ordenes', mySchemaOrdenes)
const ordenesTerminadas = mongoose.model('ordenesTerminadas', mySchemaOrdenesTerminadas)

const estados = mongoose.model('estados', mySchemaEstados)
const errores = mongoose.model('errores', mySchemaErrores)

module.exports = {
  users,
  catalogos,
  cartones,
  ordenes,
  estados,
  errores,
  ordenesTerminadas,
}