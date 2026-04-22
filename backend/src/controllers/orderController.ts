import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { AuthRequest } from '../middlewares/authMiddleware';

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user?._id });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders/all
// @access  Private/Admin
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name email');
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
