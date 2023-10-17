import Joi from 'joi';
import { IInventory } from '../../models/Inventory';
import { ISuperInventory } from '../../models/SuperInventory';

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
  name: Joi.string().min(3).required(),
  inventories: Joi.array().items(Joi.string()).optional(),
  companyId: Joi.string().required()
});

const updateSuperInventorySchema = Joi.object<Partial<ISuperInventory>>({
  // .. rest of props, whatever
});

export {
  inventorySchema,
  inventoryItemSchema,
  superInventorySchema,
  updateSuperInventorySchema
};
