const Joi = require('joi')

const createCartonSchema =Joi.object({
  idUser: Joi
  .string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required(),
  serie:Joi
  .number()
  .required()
})

module.exports = {
  createCartonSchema
}