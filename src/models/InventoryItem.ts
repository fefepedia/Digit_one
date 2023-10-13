import Joi from 'joi';
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInventoryItem extends Document {
  name: string;
  quantity: number;
  financialValue: number;
  inventoryId: Types.ObjectId;
}

const InventoryItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  financialValue: { type: Number, required: true },
  inventoryId: { type: Types.ObjectId, ref: 'Inventory', required: true }
});

const InventoryItemModel = mongoose.model<IInventoryItem>(
  'InventoryItem',
  InventoryItemSchema
);

export default InventoryItemModel;
