const User = require('../models/user');

exports.login = async (req, res) => {
    const {username, password} = req.body;

    const auth = await User.login(username,password);

    if (auth.msg === "Success") {
        res.json({msg: 'Login Successful'});
    } 
    else if (auth.msg === "Incorrect password") {
        res.json({msg: 'Password Incorrect'});
    }
    else {
        res.json({msg: 'User not registered'})
    } 
}

exports.register = async (req, res) => {
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