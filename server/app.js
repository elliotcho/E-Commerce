const redis = require('redis');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//redis cache set up
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

app.use(
    session({
        name: 'cid',
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        secret: 'armaan is the goat',
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


app.use(bodyParser.json());

//db set up
mongoose.connect('mongodb+srv://giggsy:tangatanga333@cluster0.udqr5.mongodb.net/ECommerce?retryWrites=true&w=majority', {
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
app.use('/api/user', require('./routes/user'));

app.listen(5000, () => {
    console.log('Listening to port 5000');
});