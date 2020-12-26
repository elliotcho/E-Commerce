import Message from '../models/message';

export const createMessage = async (req, res) =>{
    if(!req.user){
        res.json({ok: false});
    } else{
        const{ content, receiver } = req.body;
        const sender = req.user._id;
        
        const newMsg = new Message({
            content,
            sender,
            receiver
        });

        const msg = await newMsg.save();

        res.json({ok: true, msg});
    }
}

