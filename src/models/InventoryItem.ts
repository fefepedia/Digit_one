import Joi from 'joi';
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInventoryItem extends Document {
  name: string;
  quantity: number;
  financialValue: number;
  inventoryId: Types.ObjectId;
}

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const inventoryItemSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  financialValue: Joi.number().required(),
  inventoryId: objectId.required(),
});

export function validateInventoryItem(inventoryItemData: any): Joi.ValidationResult {
  return inventoryItemSchema.validate(inventoryItemData);
}

const InventoryItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  financialValue: { type: Number, required: true },
  inventoryId: { type: Types.ObjectId, ref: 'Inventory', required: true },
});

const InventoryItemModel = mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);

export default InventoryItemModel;
