const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

});

const User = mongoose.model('user', UserSchema);
exports.User = User;