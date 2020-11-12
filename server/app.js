const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

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

app.use('/api/user', require('./routes/user'));

app.listen(5000);