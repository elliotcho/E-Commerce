import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import Redis from 'ioredis';
import userRouter from './routes/user';
import productRouter from './routes/product';

dotenv.config();
const app = express();


export const redis = new Redis();

app.use(cors('*'));
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