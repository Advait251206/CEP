import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentStatus: 'Initiated' | 'Success' | 'Failed' | 'Cancelled';
  paymentId?: string;
  razorpayOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['Initiated', 'Success', 'Failed', 'Cancelled'],
      default: 'Initiated',
    },
    paymentId: { type: String }, // Razorpay payment ID
    razorpayOrderId: { type: String }, // Razorpay order ID
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
