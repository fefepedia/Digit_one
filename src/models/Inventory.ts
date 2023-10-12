import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IInventory extends Document {
  id: Types.ObjectId;
  name: string;
  quantityType: string;
  items: Types.ObjectId[];
  company: Types.ObjectId; // Add the 'company' field
}

const InventorySchema: Schema = new Schema({
  name: { type: String, required: true },
  quantityType: { type: String, required: true },
  items: [{ type: Types.ObjectId, ref: 'InventoryItem' }],
  company: { type: Types.ObjectId, ref: 'Company', required: true } // Reference to Company model
});

export default mongoose.model<IInventory>('Inventory', InventorySchema);
