import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  superinventories: mongoose.Types.ObjectId[];
}

const CompanySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  superinventories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SuperInventory'
    }
  ]
});

export default mongoose.model<ICompany>('Company', CompanySchema);
