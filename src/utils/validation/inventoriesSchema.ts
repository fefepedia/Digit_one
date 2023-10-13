import Joi from 'joi';

const inventorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  quantityType: Joi.string().required(),
  items: Joi.array().items(Joi.string()),
  company: Joi.string()
});

const inventoryItemSchema = Joi.object({
  name: Joi.string(),
  quantity: Joi.number(),
  financialValue: Joi.number(),
  inventoryId: Joi.string()
});

const superInventorySchema = Joi.object({
  name: Joi.string().min(3),
  inventories: Joi.array().items(Joi.string()).optional(),
  company: Joi.string(),
  superInventoryId: Joi.string(), 
  inventoryId: Joi.string() 
});

export { inventorySchema, inventoryItemSchema, superInventorySchema };

