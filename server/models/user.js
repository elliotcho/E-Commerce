import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        minlength: 6,
        maxlength: 50,
        trim: true,
    },
    username: {
        type: String,
        minlength: 2,
        maxlength: 30,
        trim: true,
    },
    password: {
        type: String
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    profilePic: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', UserSchema);
export default User;