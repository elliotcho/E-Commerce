import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    receiver:{
        type: String
    },
    sender: {
        type: String
    },
    read:{
        type: Boolean,
        default: false
    },
    content:{
        type: String,
        trim: true
    },
    dateSent: {
        type: Date
    }
});

const Message = mongoose.model('message', MessageSchema);
export default Message;