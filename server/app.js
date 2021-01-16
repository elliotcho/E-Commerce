//environment variables
import 'dotenv/config';

//dependencies
import socket from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';

//util functions
import { refreshTokens } from './utils/authTokens';

//routes
import userRouter from './routes/user';
import productRouter from './routes/product';
import departmentRouter from './routes/department';
import messageRouter from './routes/message';
import paymentRouter from './routes/payment';
import reviewRouter from './routes/review';

//socket events
import SubscriptionServer from './socket/index';

export const redis = new Redis();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];

    if(token){
        try{
            const { user } = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
        } catch (err) {
            const refreshToken = req.headers['x-refresh-token'];
            const newTokens = await refreshTokens(token, refreshToken);

            if(newTokens.token && newTokens.refreshToken){
                res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }

            req.user = newTokens.user;
        }
    }

    next();
}

app.use(addUser);

//db set up
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log('Connected to the Database');
})
.on('error' , err => {
    console.log(err);
});

//routes set up
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/department', departmentRouter);
app.use('/api/message', messageRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/review', reviewRouter);

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

SubscriptionServer(socket(server, {
        cors: { origin: '*' }
    })
);