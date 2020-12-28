import express from 'express';
import { createPayment } from '../controllers/payments';

const router = express.Router();

router.post('/send_payment', createPayment);

export default router;