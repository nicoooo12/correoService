const Joi = require('joi');

const createUserSchema =Joi.object({
  name: Joi
      .string()
      .max(100)
      .required(),
  email: Joi
      .string()
      .email()
      .required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean(),
});

const updateUserSchema =Joi.object({
  name: Joi
      .string()
      .max(100),
  email: Joi
      .string()
      .email(),
  isAdmin: Joi.boolean(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
