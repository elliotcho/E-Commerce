import Message from '../models/message';
import { filterChats } from '../utils/filterChats';

export const createMessage = async (req, res) =>{
    if(!req.user){
        res.json({ ok: false });
    } else{
        const{ content, receiver } = req.body;
        const sender = req.user._id;

        const newMsg = new Message({
            dateSent: new Date(),
            content,
            sender,
            receiver
        });

        const msg = await newMsg.save();

        res.json({ ok: true, msg });
    }
}

export const getMessages = async (req, res) => {
    if(!req.user) {
        res.json({ ok: false });
    } else{
        const { otherUser } = req.body;
        const me = req.user._id;

        const receivedMsgs = await Message.find({ receiver: me, sender: otherUser });
        const sentMsgs = await Message.find({ receiver: otherUser, sender: me });

        const result = [...receivedMsgs, ...sentMsgs];

        result.sort((a, b) => b.dateSent - a.dateSent);
        res.json({ok: true, messages: result});
    }
}


export const getUserChats = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const me = req.user._id;

        const sentMsgs = filterChats(
            await Message.find({ sender: me }), 'receiver'
        );

        const receivedMsgs = filterChats(
            await Message.find({ receiver: me }), 'sender'
        );
    
        const result = [...sentMsgs, ...receivedMsgs];

        result.sort((a, b) => b.dateSent - a.dateSent);
        res.json({ok: true, chats: result});
    }
}