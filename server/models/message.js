import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    receiver:{
        type: String
    },
    sender: {
        type: String
    },
    read:{
        type: Date,
        default: null
    },
    content:{
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    dateSent: {
        type: Date
    }
});

const Message = mongoose.model('message', MessageSchema);
export default Message;