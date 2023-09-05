import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
  name: string;
  quantityType: string;
  items: Array<{ name: string; quantity: number; financialValue: number }>;
}

const InventorySchema: Schema = new Schema({
  name: { type: String, required: true },
  quantityType: { type: String, required: true },
  items: [
    {
      name: { type: String },
      quantity: { type: Number },
      financialValue: { type: Number }
    }
  ]
});

export default mongoose.model<IInventory>('Inventory', InventorySchema);
