import express from 'express';
import { getCart, syncCart, clearCart } from '../controllers/cartController';
import { verifyJWT } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(verifyJWT); // Secure all cart endpoints completely

router.get('/', getCart);
router.post('/sync', syncCart);
router.delete('/clear', clearCart);

export default router;
