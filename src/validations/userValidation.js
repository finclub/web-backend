// src/validations/userValidation.js
import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'staff').required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
