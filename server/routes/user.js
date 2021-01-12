import express from 'express';
import { 
    login,  
    register,  
    changeUsername,
    forgotPassword, 
    changePassword,
    userInfo,
    changeProfilePic,
    loadProfilePic,
    removeProfilePic,
    deleteUser,
    addToCart,
    deleteFromCart,
    loadCart,
    passwordSettings,
    getAvgRating
} from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/change_username', changeUsername);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', changePassword);
router.post('/password_settings', passwordSettings);
router.delete('/', deleteUser);
router.get('/profile/:uid?', userInfo);
router.get('/profile_pic/:uid?', loadProfilePic);
router.post('/profile_pic', changeProfilePic);
router.delete('/profile_pic', removeProfilePic);
router.get('/avg_rating/:uid?', getAvgRating);
router.post('/cart', addToCart);
router.delete('/cart/:productId', deleteFromCart);
router.get('/cart', loadCart);

export default router;