import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);
export default User;