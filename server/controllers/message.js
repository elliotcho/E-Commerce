import {Message} from '../models/message';

export const createMessage = async(req, res) =>{
    if(!req.user){
        res.json({ok: false});
    } else{
        const{content, receiverID} = req.body;
        const senderID = req.user._id;
        
        const newMsg = new Message({
            content: content,
            userSender: senderID,
            userReceiver: receiverID
        });
        const msg = await newMsg.save();
        res.json({ok: true, msg});
    }
}