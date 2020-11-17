import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(); 
    this.password = await bcrypt.hash(this.password, salt); 
    next();
});

UserSchema.statics.login = async function(username, password){
    const user = await this.findOne({username});
 
    if(user){
        const auth = await bcrypt.compare(password, user.password);

        const success = {msg: 'Success', uid: user._id};
        const failure = {msg: 'Incorrect password'};

        return auth? success: failure;
    } else{
        return {msg: 'User is not registered'};
    }
}

const User = mongoose.model('user', UserSchema);
export default User;