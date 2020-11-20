import express from 'express';
import { login,  register, change_username } from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/change_username', change_username);
export default router;