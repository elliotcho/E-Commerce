import bcyrpt from 'bcrypt';
import { createTokens } from './authTokens';
import User from '../models/user';

export const tryRegister = async (data) => {
    const { username, password, email, adminCode } = data;

    let isAdmin = adminCode === process.env.ADMIN_CODE;
    const errors = [];
    let user;

    if(adminCode && !isAdmin){
        errors.push({
            field: 'Admin code',
            msg: 'Invalid admin code'
        });

        return { user, errors };
    }

    if(username.includes('@')){
        errors.push({
            field: 'Username', 
            msg: 'Username cannot include the @ sign'
        });
    }

    if(!email.includes('@')){
        errors.push({
            field: 'Email', 
            msg: 'Email should include the @ sign'
        });
    }
  
    user = await User.findOne({email});
    
    if(user){
        errors.push({
            field: 'Email', 
            msg: 'Email is already taken'
        });

        user = null;
    }

    user = await User.findOne({username});

    if(user){
        errors.push({
            field: 'Username', 
            msg: 'Username is already taken'
        });

        user = null;
    }

    if(errors.length === 0){
        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(password, salt);
        
        const newUser = new User({
            username,
            email, 
            password: hashedPassword, 
            cart: [],
            isAdmin
        });
                
        user = await newUser.save();
        
        const refreshTokenSecret = user.password + process.env.REFRESH_SECRET;
        const [ token , refreshToken ] = await createTokens(user, process.env.JWT_SECRET, refreshTokenSecret);

        user._doc.token = token;
        user._doc.refreshToken = refreshToken;
        user.password = '';
    }

    return { user, errors };
}