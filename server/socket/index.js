import { redis } from '../app';

const socketEvents = (io) => {
    io.on('connection', socket => {
        socket.on('JOIN', data => {
            console.log(data);
        });

        socket.on('DISCONNECT', data => {
            console.log(data);
        })
    });
}

export default socketEvents;