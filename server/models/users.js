import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    birthdate: Date
});

const User = mongoose.model('User', userSchema);

export default User;