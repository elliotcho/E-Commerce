import Message from '../models/message';
import { filterChats } from '../utils/filterChats';
import { createUpload } from '../utils/createUpload';

const messagesUpload = createUpload('messages');

export const createMessage = async (req, res) =>{
    if(!req.user){
        res.json({ ok: false });
    } else{
        messagesUpload(req, res, async err => {
            if(err) {
                console.log(err);
            }

            const newMsg = new Message({
                dateSent: new Date(),
                sender,
                receiver
            });

            if(req.file){
                newMsg._doc.image = req.file.filename;
            } else{
                newMsg._doc.content = req.body.content;
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
