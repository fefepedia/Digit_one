import Joi from 'joi';

const createCompanySchema = Joi.object({
  name: Joi.string().min(2).max(255)
});

export default createCompanySchema;
