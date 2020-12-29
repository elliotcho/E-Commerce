import { redis } from '../app';
import jwt from 'jsonwebtoken';

const socketEvents = (io) => {
    io.on('connection', socket => {
        socket.on('JOIN', async payload => {
            const { token } = payload;

            const { user: { _id } } = jwt.decode(token);
        
            await redis.set(_id, socket.id);
        });

        socket.on('NEW_MESSAGE', async payload => {
            const { receiver, sender } = payload;

            const receiverSocketId = await redis.get(receiver);
            const senderSocketId = await redis.get(sender);

            if(receiverSocketId){
                io.sockets.to(receiverSocketId).emit('NEW_MESSAGE');
            }

            if(senderSocketId){
                io.sockets.to(senderSocketId).emit('NEW_MESSAGE');
            }
        });

        socket.on('DISCONNECT', async payload => {
            const { token } = payload;

            const { user: { _id } } = jwt.decode(token);

            await redis.del(_id);
        })
    });
}

export default socketEvents;