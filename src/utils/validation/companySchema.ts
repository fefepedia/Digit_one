import Joi from 'joi';

const createCompanySchema = Joi.object({
  name: Joi.string().min(2).max(255)
});

module.exports = {
  createCompanySchema
};
export default createCompanySchema;
