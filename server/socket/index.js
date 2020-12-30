import { redis } from '../app';
import jwt from 'jsonwebtoken';

const socketEvents = (io) => {
    io.on('connection', socket => {

        socket.on('JOIN', async payload => {
            const { token } = payload;

            const { user: { _id } } = jwt.decode(token);
        
            await redis.set(_id, socket.id);    //key-value stored in some socket, userid ->socketid
        });

        socket.on('NEW_MESSAGE', async payload => {
            const { receiver, sender } = payload;

            const receiverSocketId = await redis.get(receiver);
            const senderSocketId = await redis.get(sender);

            if(receiverSocketId){   //if online
                io.sockets.to(receiverSocketId).emit('NEW_MESSAGE');
            }

            if(senderSocketId){
                io.sockets.to(senderSocketId).emit('NEW_MESSAGE');
            }
        });

        socket.on('TYPING', async payload => {
            const {senderId, receiverId} = payload;

            const receiverSocketId = await redis.get(receiverId);
            const senderSocketId = await redis.get(senderId);

            if(receiverSocketId){
                io.sockets.to(receiverSocketId).emit('TYPING');
            }
            if(senderSocketId){
                io.sockets.to(senderSocketId).emit('TYPING');
            }
             
        });

        socket.on('DISCONNECT', async payload => {
            const { token } = payload;

            const { user: { _id } } = jwt.decode(token);

            await redis.del(_id);
        });

    });
}

export default socketEvents;