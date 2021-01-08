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
            const { receiver, sender, content } = payload;

            const receiverSocketId = await redis.get(receiver);
            const senderSocketId = await redis.get(sender);

            if(receiverSocketId){   //if online
                io.sockets.to(receiverSocketId).emit('MESSAGE_NOTIFICATION', { content, sender });
                io.sockets.to(receiverSocketId).emit('NEW_MESSAGE');
            }

            if(senderSocketId){
                io.sockets.to(senderSocketId).emit('NEW_MESSAGE');
            }
        });

        socket.on('IS_TYPING', async payload => {
            const { receiverId } = payload;

            const receiverSocketId = await redis.get(receiverId);
        
            if(receiverSocketId){
                io.sockets.to(receiverSocketId).emit('IS_TYPING');
            }
        });

        socket.on('STOP_TYPING', async payload => {
            const { receiverId } = payload;

            const receiverSocketId = await redis.get(receiverId);
        
            if(receiverSocketId){
                io.sockets.to(receiverSocketId).emit('STOP_TYPING');
            }
        });

        socket.on('READ_MESSAGES', async payload => {
            const { me, otherUser } = payload;

            const otherSocketId = await redis.get(otherUser);
            const mySocketId = await redis.get(me);
     
            if(otherSocketId) {
                io.sockets.to(otherSocketId).emit('UPDATE_NAVBAR');
                io.sockets.to(otherSocketId).emit('READ_MESSAGES');
            }
        
            if(mySocketId){
                io.sockets.to(mySocketId).emit('READ_MESSAGES');
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