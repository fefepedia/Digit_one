// models/SuperInventory.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ISuperInventory extends Document {
  inventories: mongoose.Types.ObjectId[];
}

const SuperInventorySchema: Schema = new Schema({
  inventories: [{
    type: Schema.Types.ObjectId,
    ref: 'Inventory'
  }]
});

export default mongoose.model<ISuperInventory>(
  'SuperInventory',
  SuperInventorySchema
);
