import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    date: Date;
}

const userSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    last_name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    role: {
        type: String, 
        enum: ['operator', 'admin', 'accountant'], 
        default: 'operator', 
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
