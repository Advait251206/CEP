import { Request, Response } from 'express';
import { getRazorpayInstance, verifyRazorpaySignature } from '../utils/razorpay';
import { Order } from '../models/Order';
import { AuthRequest } from '../middlewares/authMiddleware';

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items, totalAmount } = req.body; // Items should come from req for building full Order if needed, or just totalAmount

    // Initialize razorpay instance
    const rzp = getRazorpayInstance();

    const options = {
      amount: totalAmount * 100, // Razorpay amount in paise
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
    };

    const razorpayOrder = await rzp.orders.create(options);

    // Save order as Initiated
    const order = new Order({
      userId: req.user?._id,
      products: items || [],
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'Initiated',
    });

    const createdOrder = await order.save();

    res.status(200).json({
      orderId: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      dbOrderId: createdOrder._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    const order = await Order.findById(dbOrderId);

    if (isValid) {
      if (order) {
        order.paymentStatus = 'Success';
        order.paymentId = razorpay_payment_id;
        await order.save();
      }
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      if (order) {
        order.paymentStatus = 'Failed';
        await order.save();
      }
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
