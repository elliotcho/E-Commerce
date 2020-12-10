import express from 'express';
import { 
    login,  
    register,  
    changeUsername,
    forgotPassword, 
    changePassword,
    deleteUser,
    changeProfilePic,
    loadProfilePic,
    addToCart,
    deleteFromCart,
    loadCart,
    removeProfilePic
} from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/change_username', changeUsername);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', changePassword);
router.get('/profile_pic', loadProfilePic);
router.post('/profile_pic', changeProfilePic);
router.delete('/profile_pic', removeProfilePic);
// router.delete('/', deleteUser);
 router.post('/cart', addToCart);
// router.post('/cart', deleteFromCart);
 router.get('/cart', loadCart);

export default router;