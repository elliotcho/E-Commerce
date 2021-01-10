import bcyrpt from 'bcrypt';
import { createTokens } from './authTokens';
import User from '../models/user';

export const tryRegister = async (data) => {
    const { username, password, email, adminCode } = data;

    const errors = [];
    let isAdmin = adminCode === process.env.ADMIN_CODE;
    let user;

    if(adminCode && !isAdmin){
        const msg = 'Invalid admin code';
        const error = { field: 'Admin Code', msg };

        errors.push(error);

        return { user, errors };
    }

    if(username.includes('@')){
        const msg = 'Username should not include @ sign';
        const error = { field: 'Username', msg };

        errors.push(error);
    }

    if(!email.includes('@')){
        const msg = 'Email should include @ sign';
        const error = { field: 'Email', msg };

        errors.push(error);
    }

    if(password.length < 6 || password.length > 50){
        const msg = 'Password must be between 6 and 50 characters';
        const error = { field: 'Password', msg };

        errors.push(error);
    }

    if(email.length < 6 || email.length > 50){
        const msg = 'Email must be between 6 and 50 characters';
        const error = { field: 'Email', msg };

        errors.push(error);
    }
  
    user = await User.findOne({ email });
    
    if(user){
        const msg = 'Email is already taken';
        const error = { field: 'Email', msg };

        errors.push(error);

        user = null;
    }

    user = await User.findOne({ username });

    if(user){
        const msg = 'Username is already taken';
        const error = { field: 'Username', msg };

        errors.push(error);

        user = null;
    }

    if(errors.length === 0){
        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(password, salt);
        
        try {
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
        } catch (e){
            const msg = 'Username must be between 2 and 30 characters';
            const error = { field: 'Username', msg };
    
            errors.push(error);
        }
    }

    return { user, errors };
}