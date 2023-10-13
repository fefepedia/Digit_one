import Joi from 'joi';

const userSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid('admin', 'operator', 'accountant')
    .default('operator'),
  company: Joi.string()
});

export default userSchema;
