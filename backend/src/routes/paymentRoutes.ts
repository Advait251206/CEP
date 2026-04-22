import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController';
import { verifyJWT } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-order', verifyJWT, createOrder);
router.post('/verify', verifyJWT, verifyPayment);

export default router;
