import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String, 
    firstName: String,
    lastName: String,
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: Date,
    bearerToken: String
});

const User = mongoose.model('User', userSchema);
export default User;
