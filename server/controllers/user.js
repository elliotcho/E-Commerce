import bcyrpt from 'bcrypt';
import User from '../models/user';
import { redis } from '../app'; 
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';

export const login = async (req, res) => {
    const {username, password} = req.body;


    let user;
    const errors = [];
    let field;
 
    if(username.includes('@')){
        user = await User.findOne({email: username});
        field = 'Email'
    } else{
        user = await User.findOne({username});
        field = 'Username';
    }

    if(!user){
        errors.push({
            field, 
            message: `${field} doesn't exist`
        });
    } 
    
    else{
        const valid = await bcyrpt.compare(password, user.password);

        if(valid){
            user.password = '';
            req.session.uid = user._id;
        } else{
            errors.push({
                field: 'Password', 
                message: 'Incorrect password'
            });
            
            user = null;
        }
    } 

    res.json({user, errors});
}



export const register = async (req, res) => {
    const { username, password, email } = req.body;

    const errors = [];
    let user;

    if(username.includes('@')){
        errors.push({
            field: 'Username', 
            message: 'Username cannot include the @ sign'
        });
    }

    if(!email.includes('@')){
        errors.push({
            field: 'Email', 
            message: 'Email should include the @ sign'
        });
    }
  
    user = await User.findOne({email});
    
    if(user){
        errors.push({
            field: 'Email', 
            message: 'Email is already taken'
        });

        user = null;
    }

    user = await User.findOne({username});

    if(user){
        errors.push({
            field: 'Username', 
            message: 'Username is already taken'
        });

        user = null;
    }

    if(errors.length === 0){
        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(password, salt);
        
        const newUser = new User({...req.body, password: hashedPassword, cart: []});
                
        user = await newUser.save();
        user.password = '';
        
        req.session.uid = user._id;
    }
       
    res.json({user, errors});
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        res.json({success: true});
    } 

    else{
        const token = v4();
        const href = `<a href="http://localhost:3000/change_password/${token}">Reset Password</a>`

        await redis.set(
           'forget-password:' + token,
            user._id,
            'ex',
            1000 * 60 * 60 * 24 * 3
        ); //token expires in 3 days

        await sendEmail(email, href);

        res.json({success: true});
    }
}

export const changePassword = async (req, res) => {
    const {token, newPassword} = req.body;
    const errors = [];

    const key = 'forget-password:' + token;
    const uid = await redis.get(key);

    if(!uid){
        errors.push({
            field: 'token',
            message: 'token expired'
        });
    }

    const user = await User.findOne({_id: uid});

    if(!user){
        errors.push({
            field: 'token',
            message: 'user no longer exists'
        });
    }

    if(user && errors.length === 0){
        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(newPassword, salt)

        await User.updateOne({_id: uid}, {password: hashedPassword});

        req.session.uid = user._id;

        res.json({user, errors});
    }

    else{
        res.json({user: null, errors});
    }
}

export const changeUsername = async (req, res) => {
    const { username } = req.body;
    const { uid } = req.session;

    const user = await User.findOne({username}); 

    if(user !== null){
        res.json({msg:"Username already exists"});
    }

    else{
        await User.updateOne({ _id: uid } , { username });
        res.json({msg: 'Username changed successfully'});
    }
}

export const logout = async (req, res) => {
    const msg = await clearSession(req, res);
    res.json( { msg });
}

export const deleteUser = async(req, res) => {
    if(!req.session.uid){
        res.json({ msg: 'User is not authenticated'});
    } 
    
    else{
        await User.deleteOne({ _id : req.session.uid });

        const msg = await clearSession(req, res);
        res.json( { msg });     
    }
}

const clearSession = async (req, res) => {
    try { 
        req.session.destroy();
        res.clearCookie(process.env.COOKIE_NAME);

        return 'Success';
    } 

    catch (err) {
        return 'Something went wrong';
    }
}