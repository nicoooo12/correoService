const boom = require('@hapi/boom');
// const joi = require('joi');

const validateF = (data, schema) => {
  const {error} = schema.validate(data);
  return error;
};

const validationHandler = (schema, check = 'body') => {
  return function(req, res, next) {
    const error = validateF(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
};

module.exports = validationHandler;
