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
    },
    cart: {
        type: [String],
        default: []
    },
    profilePic: {
        type: String,
        default: null
    }
});




const User = mongoose.model('user', UserSchema);
export default User;