import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
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
    }
});

const Message = mongoose.model('message', messageSchema);
export default Message;