import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryItem extends Document {
  name: string;
  inventoryId: string;
  quantity: number;
}

const InventoryItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  inventoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true
  },
  quantity: { type: Number, required: true }
});

export default mongoose.model<IInventoryItem>(
  'InventoryItem',
  InventoryItemSchema
);
