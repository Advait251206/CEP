import express from 'express';
import { getMyOrders, getOrders } from '../controllers/orderController';
import { verifyJWT, requireAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', verifyJWT, getMyOrders);
router.get('/all', verifyJWT, requireAdmin, getOrders);

export default router;
