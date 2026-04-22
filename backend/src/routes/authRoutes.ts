import express from 'express';
import { registerUser, authUser, getUserProfile, updateUserProfile, makeAdmin } from '../controllers/authController';
import { verifyJWT, requireAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);

router.route('/profile')
  .get(verifyJWT, getUserProfile)
  .put(verifyJWT, updateUserProfile);

router.post('/make-admin', verifyJWT, requireAdmin, makeAdmin);

export default router;
