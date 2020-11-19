import express from 'express';
import { 
    login,  
    register, 
    logout, 
    forgotPassword, 
    changePassword 
} from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', changePassword);

export default router;