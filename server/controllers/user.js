import bcyrpt from 'bcrypt';
import User from '../models/user';
import { redis } from '../app'; 
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import { validateLogin } from '../utils/validateLogin';
import { validateRegister } from '../utils/validateRegister';
import { createUpload } from '../utils/createUpload';
import Product from '../models/product';
import path from 'path';
import fs from 'fs';
import { Product } from '../models/product';

const profileUpload = createUpload('profile');

export const login = async (req, res) => {
    const userResponse = await validateLogin(req);
    res.json(userResponse);
}

export const register = async (req, res) => {
    const userResponse = await validateRegister(req);    
    res.json(userResponse);
}

export const forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user){
        res.json({success: true});
    } 

    else{
        const token = 'forget-password:' + v4();
        const href = `<a href="http://localhost:3000/change_password/${token}">Reset Password</a>`
        const expiresIn = 1000 * 60 * 60 * 24 * 3; //3 days

        //set token as key and uid as value in redis, then send email
        await redis.set(token, user._id, 'ex', expiresIn);
        await sendEmail(req.body.email, href);

        res.json({success: true});
    }
}

export const changePassword = async (req, res) => {
    const errors = [];

    const key = 'forget-password:' + req.body.token;
    const uid = await redis.get(key);

    const user = await User.findOne({_id: uid});

    if(!uid){
        errors.push({ field: 'token', msg:'token expired' });
    }

    if(!user){
        errors.push({ field: 'token', msg:'user no longer exists' });
    }

    if(user && errors.length === 0){
        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(req.body.newPassword, salt)

        await User.updateOne({_id: uid}, {password: hashedPassword});
        req.user._id = user._id;
        
        res.json({ user, errors });
    } 
    
    else{
        res.json({ user: null, errors });
    }
}

export const changeUsername = async (req, res) => {
    const user = await User.findOne({username : req.body.username}); 

    if(user){
        res.json({msg:"Username already exists"});
    }

    else{
        await User.updateOne({ _id: req.user._id } , { username: req.body.username });
        res.json({msg: 'Username changed successfully'});
    }
}

export const loadProfilePic = async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if(user && user.profilePic){
        res.sendFile(path.join(__dirname, '../', `images/profile/${user.profilePic}`));
    } else {
        res.sendFile(path.join(__dirname, '../', 'images/profile/default.png'));
    }
}

export const changeProfilePic = async (req, res) => {
   profileUpload(req, res, async err => {
        if(err){
            console.log(err);
        }

        const user = await User.findOne({ _id: req.user._id });
        const { profilePic } = user;
    
        if(profilePic){
            fs.unlink(path.join(__dirname, '../', `images/profile/${profilePic}`), err => {
                if(err){
                    console.log(err);
                }
            });
        } 

        const { filename } = req.file;

        await User.updateOne( { _id: req.user._id } , {profilePic: filename});
        res.sendFile(path.join(__dirname, '../', `images/profile/${filename}`));
   });
}

export const removeProfilePic = async (req, res) => {
    if(req.user){
        const user = await User.findOne({ _id: req.user._id });
        const { profilePic } = user;

        if( profilePic ){
            fs.unlink(path.join(__dirname, '../', `images/profile/${profilePic}`), err => {
                if(err){
                    console.log(err);
                }
            });

            await User.updateOne({ _id: req.user._id }, { profilePic: null });
        }

        res.sendFile(path.join(__dirname, '../', 'images/profile/default.png'));
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({ _id : req.user._id });
    const { _id, profilePic } = user;

    if(profilePic){
        fs.unlink(path.join(__dirname, '../', `images/profile/${profilePic}`), err => {
            if(err){
                console.log(err);
            }
        });
    } 

    await User.deleteOne({ _id });

    res.json( { msg: 'Success' });     
}

export const addToCart = async (req, res) => {
    if (!req.user) {
        res.json({msg: 'User is not authenticated'});
    } else{
        const {productId} = req.body;

        const user = await User.findOne({_id: req.user._id});

        const {cart} = user
        cart.push(productId);

        await User.updateOne({_id: req.user._id}, {cart});

        res.json({msg: 'Cart Updated'});
    }
}

export const deleteFromCart = async (req, res) => {
    if (!req.user) {
        res.json({msg: 'User is not authenticated'});
    } else {
        const {productId} = req.body;

        const user = await User.findOne({_id: req.user._id});
        const {cart} = user;

        for (let i=0; i < cart.length; i++) {
            if (productId === cart[i]) {
                cart.slice(i, 1);
                break;
            } 
        }
        
        await User.updateOne({_id: req.user._id}, {cart});

        res.json({msg: 'Cart Updated'});
    }
}

export const loadCart = async (req, res) => {
    if (!req.user) {
        res.json({msg: 'User is not authenticated'});
    } else {
        const user = await User.findOne({_id: req.user._id});
        const {cart} = user; 

        const cartProducts = [];

        for (let i = 0; i < cart.length; i++) {
            const product = await Product.findOne({_id: cart[i]});
            cartProducts.push(product);
        }
      
        res.json(cartProducts);
    }
}

export const userInfo = async (req, res) => {
    if (!req.user) {
        res.json({msg: 'User is not authenticated'});
    } else {
        const user = await User.findOne({_id: req.user._id});

        user.password = '';

        res.json(user);
    }
}