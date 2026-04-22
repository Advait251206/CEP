import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { User } from '../models/User';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cart' });
  }
};

export const syncCart = async (req: AuthRequest, res: Response) => {
  try {
    const { cart } = req.body;
    
    if (!Array.isArray(cart)) {
      return res.status(400).json({ message: 'Invalid cart format' });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = cart;
    await user.save();
    
    res.json({ message: 'Cart synchronized success', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error during cart synchronization' });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = [];
    await user.save();
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while clearing cart' });
  }
};
