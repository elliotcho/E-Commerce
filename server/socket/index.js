import { redis } from '../app';

const socketEvents = (io) => {
    io.on('connection', socket => {

    });
}

export default socketEvents;