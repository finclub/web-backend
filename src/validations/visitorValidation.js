import Joi from 'joi';

export const checkVisitorSchema = Joi.object({
  phone_number: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(10)
    .required()
    .messages({
      'string.base': 'Phone number must be a string.',
      'string.pattern.base': 'Phone number must only contain digits.',
      'string.length': 'Phone number must be exactly 10 characters long.',
      'any.required': 'Phone number is required.'
    })
});
