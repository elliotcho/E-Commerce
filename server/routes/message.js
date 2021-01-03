import express from 'express';
import{
    createMessage,
    getMessages,
    getUserChats,
    loadMessagePic,
    readMessages
} from '../controllers/message';

const router = express.Router();

router.get('/', getUserChats);
router.post('/', createMessage);
router.post('/messages', getMessages);
router.get('/image/:messageId', loadMessagePic);
router.put('/', readMessages);

export default router;