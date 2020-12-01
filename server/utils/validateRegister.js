import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const validateRegister = async (req) => {
    const { username, password, email } = req.body;

    const errors = [];
    let user;

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
        
        const newUser = new User({...req.body, password: hashedPassword, cart: []});
                
        user = await newUser.save();
        
        user._doc.token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);
        user.password = '';
        
        req.session.uid = user._id;
    }

    return { user, errors };
}