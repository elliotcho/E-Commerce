import bcyrpt from 'bcrypt';
import User from '../models/user';

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
    const {username, password, email} = req.body;

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
        
        const newUser = new User({...req.body, password: hashedPassword});
                
        user = await newUser.save();
        user.password = '';
        
        req.session.uid = user._id;
    }
       
    res.json({user, errors});
}

export const logout = async (req, res) => {
    await req.session.destroy(err => {
        res.clearCookie(process.env.COOKIE_NAME);

        if(err){
           res.json({msg: 'Something went wrong'});
        } 
        
        else{
            res.json({msg: 'Successfully signed out'});
        }
    });
}