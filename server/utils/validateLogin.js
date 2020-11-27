import bcyrpt from 'bcrypt';
import User from '../models/user';

export const validateLogin = async (req) => {
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
            user.password = '';
            req.session.uid = user._id;
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