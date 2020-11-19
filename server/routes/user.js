import express from 'express';
import { login,  register, logout } from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

export default router;