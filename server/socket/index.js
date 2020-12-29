import { redis } from '../app';
import jwt from 'jsonwebtoken';

const socketEvents = (io) => {
    io.on('connection', socket => {
        socket.on('JOIN', async data => {
            const { token } = data;

            const { user: { _id } } = jwt.decode(token);
        
            await redis.set(_id, socket.id);
        });

        socket.on('DISCONNECT', async data => {
            const { token } = data;

            const { user: { _id } } = jwt.decode(token);

            await redis.del(_id);
        })
    });
}

export default socketEvents;