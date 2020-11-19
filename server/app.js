import dotenv from 'dotenv';
import cors from 'cors';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routes/user';
import productRouter from './routes/product';

dotenv.config();
const app = express();

//redis cache set up
const RedisStore = connectRedis(session);
export const redis = new Redis();

app.use(
    session({
        name: process.env.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,//1 year
            httpOnly: true,  
            sameSite: 'lax', //handles csrf 
            secure: false //cookie only works in https
        }
    })
);

app.use(cors());
app.use(bodyParser.json());

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

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening to port 5000');
});