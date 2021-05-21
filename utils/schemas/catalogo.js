const Joi = require('joi')

const createCatalogoSchema =Joi.object({
  premios: Joi
  .array().items(
    Joi.object({
      nombre: Joi
      .string()
      .required(),
    })
  )
  .required(),
  titulo:Joi
  .string()
  .required(),
  subTitulo: Joi
  .string()
  .required(),
  precio:Joi
  .number()
  .required(),
  enVenta:Joi
  .boolean()
  .required(),
  serie: Joi
  .number(),
  color: Joi
  .string()
  .required(),
  icon: Joi
  .string()
  .required()
})


const editCatalogoSchema =Joi.object({
  premios: Joi
  .array().items(
    Joi.object({
      nombre: Joi
      .string()
      .required(),
    })
  ),
  titulo:Joi
  .string(),
  subTitulo: Joi
  .string(),
  precio:Joi
  .number(),
  enVenta:Joi
  .boolean(),
  serie: Joi
  .number(),
  color: Joi
  .string(),
  icon: Joi
  .string(),
})

module.exports = {
  createCatalogoSchema,
  editCatalogoSchema
}