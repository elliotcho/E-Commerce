import Message from '../models/message';
import { filterChats } from '../utils/filterChats';
import { createUpload } from '../utils/createUpload';
import path from 'path';

const messagesUpload = createUpload('messages');

export const createMessage = async (req, res) =>{
    if(!req.user){
        res.json({ ok: false });
    } else{
        messagesUpload(req, res, async err => {
            if(err) {
                console.log(err);
            }

            const { receiver, content } = req.body;
            const sender = req.user._id;
        
            const newMsg = new Message({
                dateSent: new Date(),
                sender,
                receiver
            });

            if(req.file){
                newMsg._doc.image = req.file.filename;
            } else{
                newMsg._doc.content = content;
            }

            const msg = await newMsg.save();
            res.json({ ok: true, msg });
        });
    }
}

export const getMessages = async (req, res) => {
    if(!req.user) {
        res.json({ ok: false });
    } else{
        const { otherUser } = req.body;
        const me = req.user._id;

        const messages = await Message.find({
            $or: [
                { receiver: me, sender: otherUser },
                { receiver: otherUser, sender: me }
            ]
        });

        messages.sort((a, b) => b.dateSent - a.dateSent);
        res.json({ ok: true, messages });
    }
}


export const getUserChats = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const me = req.user._id;

        let result = [];
        const map ={};

        const sent = await Message.find({ sender: me });
        const received = await Message.find({ receiver: me });
        
        //filter chats with different users and the latest times
        result = filterChats(result, map, sent, 'receiver');
        result = filterChats(result, map, received, 'sender');

        result.sort((a, b) => b.dateSent - a.dateSent);
        res.json({ok: true, chats: result});
    }
}

export const loadMessagePic = async (req, res) => {
    const message = await Message.findOne({ _id: req.params.messageId });

    if(message && message.image){
        res.sendFile(path.join(__dirname, '../', `images/messages/${message.image}`));
    }
}

export const readMessages = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const { otherUser } = req.body;
        const me = req.user._id;
    
        await Message.updateMany(
            { receiver: me, sender: otherUser },
            { read: new Date() }
        );
    
        res.json({ 
            ok: true,
            otherUser,
            me
        });
    }
}

export const getUnreadChats = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else {
        const me = req.user._id;

        let result = [];
        const map ={};
    
        const sent = await Message.find({ sender: me });
        const received = await Message.find({ receiver: me });
        
        //filter chats with different users and the latest times
        result = filterChats(result, map, sent, 'receiver');
        result = filterChats(result, map, received, 'sender');
    
        result = result.filter(c => 
            c.read === null && c.sender !== me
        );
    
        res.json({ ok: true, unread: result.length });
    }
}