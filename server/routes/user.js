import express from 'express';
import { 
    login,  
    register, 
    logout, 
    changeUsername,
    forgotPassword, 
    changePassword,
    deleteUser,
    changeProfilePic
} from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/change_username', changeUsername);
router.get('/logout', logout);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', changePassword);
router.post('/profile_pic', changeProfilePic);
router.delete('/', deleteUser);

export default router;