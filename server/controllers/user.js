import User from '../models/user';

export const login = async (req, res) => {
    const {username, password} = req.body;

    const auth = await User.login(username,password);

    if (auth.msg === "Success") {
        req.sesssion.uid = auth.uid;
        res.json({msg: 'Login Successful'});
    } 
    else if (auth.msg === "Incorrect password") {
        res.json({msg: 'Password Incorrect'});
    }
    else {
        res.json({msg: 'User not registered'})
    } 

    
}



export const register = async (req, res) => {
    const {username, password, confirmPassword} = req.body;

    const user = await User.findOne({username});

    if(password !== confirmPassword){
        res.json({msg: 'Passwords do not match'});
    }

    else if(user){
        res.json({msg: 'Username already exists'});
    }

    else{
        const newUser = new User({
            username,
            password
        });

        const user = await newUser.save();
        req.session.uid = user._id;
        
        res.json({msg: 'Success'});
    }
}

export const change_username = async (req, res) => {
    const {username, id} = req.body;

    const nuser = await User.findOne({username});

    if(nuser === newusername){
        res.json({msg:"Username already exists"});
    }

    else{
        await User.updateOne({
            _id:id
        },{username});
       

    }





}