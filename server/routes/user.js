import express from 'express';
import { 
    login,  
    register, 
    logout, 
    change_username,
    forgotPassword, 
    changePassword,
    deleteAccount 
} from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/change_username', change_username);
router.get('/logout', logout);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', changePassword);
router.delete('/deleteAccount', deleteAccount);

export default router;