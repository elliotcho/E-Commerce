import express from 'express';
import{
    createMessage,
    getMessages,
    getUserChats
} from '../controllers/message';

const router = express.Router();

router.get('/', getUserChats);
router.post('/', createMessage);
router.post('/messages', getMessages);

export default router;