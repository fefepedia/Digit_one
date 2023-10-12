import Joi from 'joi';

const inventorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  quantityType: Joi.string().required(),
  items: Joi.array().items(Joi.string()),
  company: Joi.string().required()
});

const inventoryItemSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  financialValue: Joi.number().required(),
  inventoryId: Joi.string().required()
});

const superInventorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  inventories: Joi.array().items(Joi.string()).optional(),
  company: Joi.string().required()
});

export { inventorySchema, inventoryItemSchema, superInventorySchema };
