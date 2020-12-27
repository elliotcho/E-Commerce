import express from 'express';
import{
    createMessage,
    getUserChats
} from '../controllers/message';

const router = express.Router();

router.get('/', getUserChats);
router.post('/', createMessage);

export default router;