// models/Inventory.ts

import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IInventory extends Document {
  id: Types.ObjectId
  name: string;
  quantityType: string;
}

const InventorySchema: Schema = new Schema({
  name: { type: String, required: true },
  quantityType: { type: String, required: true },
});

export default mongoose.model<IInventory>('Inventory', InventorySchema);
