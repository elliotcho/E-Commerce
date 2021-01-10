import { redis } from '../app';
import jwt from 'jsonwebtoken';

const JOIN_EVENT = 'JOIN';
const NEW_MESSAGE_EVENT = 'NEW_MESSAGE';
const MESSAGE_NOTIFICATION_EVENT = 'MESSAGE_NOTIFICATION';
const IS_TYPING_EVENT = 'IS_TYPING';
const STOP_TYPING_EVENT = 'STOP_TYPING';
const READ_MESSAGES_EVENT = 'READ_MESSAGES';
const UPDATE_NAVBAR_EVENT = 'UPDATE_NAVBAR';
const DISCONNECT_EVENT = 'DISCONNECT';

const socketEvents = (io) => {
    io.on('connection', socket => {

        socket.on(JOIN_EVENT, async payload => {
            const { token } = payload;
            const { user: { _id } } = jwt.decode(token);

            await redis.set(_id, socket.id); 
        });

        socket.on(NEW_MESSAGE_EVENT, async payload => {
            const { receiver, sender, content } = payload;

            const receiverSocketId = await redis.get(receiver);
            const senderSocketId = await redis.get(sender);

            if(receiverSocketId){ 
                io.sockets.to(receiverSocketId).emit(MESSAGE_NOTIFICATION_EVENT, { content, sender });
                io.sockets.to(receiverSocketId).emit(NEW_MESSAGE_EVENT);
            }

            if(senderSocketId){
                io.sockets.to(senderSocketId).emit(NEW_MESSAGE_EVENT);
            }
        });

        socket.on(IS_TYPING_EVENT, async payload => {
            const { receiverId } = payload;

            const receiverSocketId = await redis.get(receiverId);
        
            if(receiverSocketId){
                io.sockets.to(receiverSocketId).emit(IS_TYPING_EVENT);
            }
        });

        socket.on(STOP_TYPING_EVENT, async payload => {
            const { receiverId } = payload;

            const receiverSocketId = await redis.get(receiverId);
        
            if(receiverSocketId){
                io.sockets.to(receiverSocketId).emit(STOP_TYPING_EVENT);
            }
        });

        socket.on(READ_MESSAGES_EVENT, async payload => {
            const { me, otherUser } = payload;

            const otherSocketId = await redis.get(otherUser);
            const mySocketId = await redis.get(me);
     
            if(otherSocketId) {
                io.sockets.to(otherSocketId).emit(UPDATE_NAVBAR_EVENT);
                io.sockets.to(otherSocketId).emit(READ_MESSAGES_EVENT);
            }
        
            if(mySocketId){
                io.sockets.to(mySocketId).emit(UPDATE_NAVBAR_EVENT);
                io.sockets.to(mySocketId).emit(READ_MESSAGES_EVENT);
            }
        });

        socket.on(DISCONNECT_EVENT, async payload => {
            const { token } = payload;
            const { user: { _id } } = jwt.decode(token);

            await redis.del(_id);
        });

    });
}

export default socketEvents;