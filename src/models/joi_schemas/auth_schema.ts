import * as Joi from '@hapi/joi';

const registerSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('operator', 'admin', 'accountant').default('operator'),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

export { registerSchema, loginSchema };
