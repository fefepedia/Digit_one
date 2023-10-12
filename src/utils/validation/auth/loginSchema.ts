// Import Joi using ES6-style import
import Joi from 'joi';

// Define the login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export default loginSchema;
