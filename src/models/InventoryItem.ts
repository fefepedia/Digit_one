import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInventory extends Document {
  name: string;
  quantityType: string;
}

const InventorySchema: Schema = new Schema({
  name: { type: String, required: true },
  quantityType: { type: String, required: true },
});

// Define the InventoryItem schema
export interface IInventoryItem extends Document {
  name: string;
  quantity: number;
  financialValue: number;
  inventoryId: Types.ObjectId;  // This references the Inventory it belongs to
}

const InventoryItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  financialValue: { type: Number, required: true },
  inventoryId: { type: Types.ObjectId, ref: 'Inventory', required: true }, // Reference to Inventory model
});

export default mongoose.model<IInventoryItem>(
  'InventoryItem',
  InventoryItemSchema
);
