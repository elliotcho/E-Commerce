import bcyrpt from 'bcrypt';
import { createTokens } from './authTokens';
import User from '../models/user';

export const tryLogin = async (req) => {
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
            msg: `${field} doesn't exist`
        });
    } 
    
    else{
        const valid = await bcyrpt.compare(password, user.password);

        if(valid){
            const refreshTokenSecret = user.password + process.env.REFRESH_SECRET;
            const [ token , refreshToken ] = await createTokens(user, process.env.JWT_SECRET, refreshTokenSecret);

            user._doc.token = token;
            user._doc.refreshToken = refreshToken;
            user.password = '';
        } else{
            errors.push({
                field: 'Password', 
                msg: 'Incorrect password'
            });
            
            user = null;
        }
    } 

    return {user, errors};
}