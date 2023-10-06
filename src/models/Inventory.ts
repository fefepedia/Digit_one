import Joi from 'joi';
import mongoose, { Document, Schema, Types } from 'mongoose';

const objectId = Joi.extend((joi) => ({
  type: 'objectId',
  base: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  messages: {
    'objectId.invalid': 'Invalid ObjectId format',
  },
  validate(value, helpers) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return { value, errors: helpers.error('objectId.invalid') };
    }
  },
}));

export interface IInventory extends Document {
  id: Types.ObjectId
  name: string;
  quantityType: string;
  items: Types.ObjectId[];
}
const inventorySchema = Joi.object({
  name: Joi.string().required(),
  quantityType: Joi.string().required(),
  items: Joi.array().items(objectId.objectId()).optional(),
});

const InventorySchema: Schema = new Schema({
  name: { type: String, required: true },
  quantityType: { type: String, required: true },
  items: [{ type: Types.ObjectId, ref: 'InventoryItem' }],
});

export function validateInventory(inventoryData: any): Joi.ValidationResult {
  return inventorySchema.validate(inventoryData);
}

export default mongoose.model<IInventory>('Inventory', InventorySchema);
