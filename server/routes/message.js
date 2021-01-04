import express from 'express';
import{
    createMessage,
    getMessages,
    getUnreadChats,
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
router.get('/unread', getUnreadChats);

export default router;