import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { verifyJWT, requireAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(verifyJWT, requireAdmin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(verifyJWT, requireAdmin, updateProduct)
  .delete(verifyJWT, requireAdmin, deleteProduct);

export default router;
