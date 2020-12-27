import Message from '../models/message';
import _ from 'lodash';

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

        const result = [];

        const sentMsgs = await Message.find({ sender: me });
        const receivedMsgs = await Message.find({ receiver: me });
    
        const map = {};

        sentMsgs.forEach(msg => {
            if(!map[msg.receiver]){
                map[msg.receiver] = msg.dateSent;
                result.push(msg);
            } 
            
            else if(map[msg.receiver] < msg.dateSent){
                map[msg.receiver] = msg.dateSent;

                const idx = _.findIndex(result, ['receiver', msg.receiver]);
                result.splice(idx, 1);

                result.push(msg);
            }
        });

        receivedMsgs.forEach(msg => {
            if(!map[msg.sender]){
                map[msg.sender] = msg.dateSent;
                result.push(msg);
            } 
            
            else if(map[msg.sender] < msg.dateSent){
                map[msg.sender] = msg.dateSent;

                const idx = _.findIndex(result, ['sender', msg.sender]);
                result.splice(idx, 1);

                result.push(msg);
            }
        });

        result.sort((a, b) => b.dateSent - a.dateSent);
        res.json({ok: true, chats: result});
    }
}