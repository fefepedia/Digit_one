import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISuperInventory extends Document {
  name: string;
  inventories: mongoose.Types.ObjectId[];
  company: Types.ObjectId;
}

const SuperInventorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  inventories: [{
    type: Schema.Types.ObjectId,
    ref: 'Inventory'
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true, 
  }
});

export default mongoose.model<ISuperInventory>('SuperInventory', SuperInventorySchema);
