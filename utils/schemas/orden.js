const Joi = require('joi');

const createOrdenSchema =Joi.object({
  compra: Joi
    .array().min(1).items(
      Joi.object({
        serie: Joi
        .number()
        .required(),
        cantidad: Joi
        .number()
        .required(),
      })
    )
    .required(),
  totalPago: Joi
    .number()
    .required(),
  tipoDePago: Joi
    .string()
    .required(),
});

const editOrdenSchema =Joi.object({
  compra: Joi
    .array().min(1).items(
      Joi.object({
        serie: Joi
        .number()
        .required(),
        cantidad: Joi
        .number()
        .required(),
      })
    ),
  totalPago: Joi
    .number(),
  tipoDePago: Joi
    .string(),
});

const addCanvasUrlSchema = Joi.object({
  code: Joi
    .string()
    .required(),
  url: Joi
    .string()
    .required(),
})

const addCommentSchema = Joi.object({
  message: Joi
    .string()
    .required(),
})

const endSchema = Joi.object({
  pagado: Joi
    .number()
    .required(),
  correo: Joi
    .boolean(),
  comment: Joi
    .string()
})

module.exports = {
  createOrdenSchema,
  addCanvasUrlSchema,
  editOrdenSchema,
  addCommentSchema,
  endSchema
};