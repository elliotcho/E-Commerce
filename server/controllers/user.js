import bcyrpt from 'bcrypt';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';

import { redis } from '../app'; 

import User from '../models/user';
import { Product }  from '../models/product';
import Review from '../models/review';
import Message from '../models/message';

import { createUpload } from '../utils/createUpload';
import { sendEmail } from '../utils/sendEmail';
import { tryLogin } from '../utils/tryLogin';
import { tryRegister } from '../utils/tryRegister';

const profileUpload = createUpload('profile');

export const login = async (req, res) => { 
    const userResponse = await tryLogin(req.body);
    res.json(userResponse);
}

export const register = async (req, res) => {
    const userResponse = await tryRegister(req.body);    
    res.json(userResponse);
}

export const passwordSettings = async(req, res) => {
    const { newPassword } = req.body;

    const user = await User.findOne({ _id: req.user._id });
    
    if(!user){
        return res.json({ msg: "User not authenticated", error: true });
    }

    if(newPassword.length < 6 || newPassword.length > 50){
        const msg = 'New password must be between 6 and 50 characters';
        const data = { msg, error: true };

        return res.json(data);
    }
    
    const valid = await bcyrpt.compare(req.body.currPassword, user.password);
 
    if(valid){
        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(req.body.newPassword, salt);
        
        await User.updateOne( { _id: req.user._id }, { password: hashedPassword } );
        
        res.json({ msg: "Success", error: false });
    }
    
    else{
        res.json({ msg: "Invalid current password", error: true });
    }
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

        res.json({ success: true });
    }
}

export const changePassword = async (req, res) => {
    const errors = [];
    const key = req.body.token;

    const uid = await redis.get(key);
    const user = await User.findOne({ _id: uid });

    if(!uid){
        errors.push({ field: 'token', msg:'token expired' });
    }
    
    if(!user){
        errors.push({ field: 'token', msg:'user no longer exists' });
    }

    if(user && errors.length === 0){
        const { newPassword } = req.body;

        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(newPassword, salt)

        await User.updateOne({ _id: uid }, { password: hashedPassword });
       
        const userResponse = await tryLogin({ 
            username: user.username, 
            password: newPassword 
        });

        if(userResponse.user) await redis.del(key);
        
        res.json(userResponse);
    } 
    
    else{
        res.json({ user: null, errors });
    }
}

export const changeUsername = async (req, res) => {
    const user = await User.findOne({ username : req.body.username }); 

    if(user){
        res.json({ msg:"Username already exists", error: true });
    }

    else{
        try {
            await User.updateOne(
                { _id: req.user._id } , 
                { username: req.body.username },
                { runValidators: true }
            );

            const msg = 'Username changed successfully';

            res.json({ msg, error: false });
        } catch (err) {
            const msg = 'Username must be between 2 and 30 characters';
            const data = { msg, error: true };

            res.json(data);
        }
    }
}

export const loadProfilePic = async (req, res) => {
    let user;

    if(req.params.uid){
        user = await User.findOne({ _id: req.params.uid });
    } else{
        user = await User.findOne({ _id: req.user._id });
    }

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

        const { filename } = req.file;

        const user = await User.findOne({ _id: req.user._id });
        const { profilePic } = user;
    
        if(profilePic){
            fs.unlink(path.join(__dirname, '../', `images/profile/${profilePic}`), err => {
                if(err){
                    console.log(err);
                }
            });
        } 

        await User.updateOne( { _id: req.user._id } , { profilePic: filename });
        
        res.sendFile(path.join(__dirname, '../', `images/profile/${filename}`));
   });
}

export const removeProfilePic = async (req, res) => {
    if(req.user){
        const user = await User.findOne({ _id: req.user._id });
        const { profilePic } = user;

        if(profilePic){
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

export const addToCart = async (req, res) => {
    if (!req.user) {
        res.json({ msg: 'User is not authenticated' });
    } else{
        const { productId } = req.body;

        const user = await User.findOne({ _id: req.user._id });
        const { cart } = user
        
        cart.push(productId);

        await User.updateOne({ _id: req.user._id }, { cart });
        res.json({ msg: 'Cart Updated' });
    }
}

export const deleteFromCart = async (req, res) => {
    if (!req.user) {
        res.json({ msg: 'User is not authenticated' });
    } else {
        const { productId } = req.params;

        const user = await User.findOne({ _id: req.user._id });
        const { cart } = user;

        for (let i=0; i < cart.length; i++) {
            if (productId === cart[i]) {
                cart.splice(i, 1);
                break;
            } 
        }
        
        await User.updateOne({ _id: req.user._id }, { cart });
        res.json({ msg: 'Success' });
    }
}

export const loadCart = async (req, res) => {
    if (!req.user) {
        res.json({ msg: 'User is not authenticated' });
    } else {
        const user = await User.findOne({_id: req.user._id});
        const { cart } = user; 

        const result = [];
        const newCart = [];

        for(let i=0;i<cart.length;i++){
            const product = await Product.findOne({ _id: cart[i] });

            if(product){
                newCart.push(product._id);
                result.push(product);
            }
        }

        await User.updateOne({ _id: req.user._id}, { cart: newCart });
        res.json(result);
    }
}

export const loadHistory = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const user = await User.findOne({ _id: req.user._id });

        if(user){
            res.json({ ok: true, history: user.history });
        } else {
            res.json({ ok: false });
        }
    }
}

export const clearHistory = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        try {
            const { _id } = req.user;

            await User.updateOne({ _id }, { history: [] });
    
            res.json({ ok: true });
        } catch (err){
            res.json({ ok: false });
        }
    }
}

export const getAvgRating = async (req, res) => {
    let userId;
    let total = 0;
    let count = 0;

    if(req.params.uid){
        userId = req.params.uid;
    } else{
        userId = req.user._id;
    }

    const products = await Product.find({ userId });

    for(let i=0;i<products.length;i++){
        const product = products[i];
        const { _id } = product;

        const reviews = await Review.find({ productId: _id });
   
        for(let j=0;j<reviews.length;j++){
            const review = reviews[j];
            const { rating } = review;

            total += rating;
        }

        count += reviews.length;
    }
    
    let avgRating;
    
    if(count !== 0){
        avgRating = (total/count).toFixed(1);
    } else{
        count = 'N/A';
    }

    res.json({ avgRating });
}

export const userInfo = async (req, res) => {
    if (!req.user && !req.params.uid) {
        res.json({msg: 'User is not authenticated'});
    } else {
        let user;

        if(req.params.uid){
            user = await User.findOne({_id: req.params.uid});
        } else {
            user = await User.findOne({ _id: req.user._id });
        }

        if(!user){
            user = { username: 'E-Commerce User' };
        }
        
        user.password = '';
        res.json(user);
    }
}

export const deleteUser = async (req, res) => {
    const cb = (err) => {
        if(err) console.log(err);
    }

    try {
        const user = await User.findOne({ _id : req.user._id });
        const { _id: userId, profilePic } = user;

        if(profilePic){
            fs.unlink(path.join(__dirname, '../', `images/profile/${profilePic}`), cb);
        } 

        const products = await Product.find({ userId });
    
        for(let i=0;i<products.length;i++){
            const product = products[i];
            const { _id, image } = product;
    
            if(image){
                fs.unlink(path.join(__dirname, '../', `images/product/${image}`), cb);
            }

            await Product.deleteOne({ _id });
        }
    
        await Review.deleteMany({ userId });
        await Message.deleteMany({ receiver: userId });
        await Message.deleteMany({ sender: userId });
        await User.deleteOne({ _id: userId });

        res.json({ msg: 'Success' });   
    } catch (err) {
        res.json({ msg: 'Failure' });
    }  
}