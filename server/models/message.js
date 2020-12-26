import { trim } from 'lodash';
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    userSent:{
        type: 'String'
    },
    userReceived: {
        type: 'String'
    },
    read:{
        type: Boolean,
        default: false
    },
    contents:{
        type: 'String',
        trim: true
    }
});

const Message = mongoose.model('message', messageSchema);
export default Message;