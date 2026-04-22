import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  ingredients?: string;
  howToUse?: string;
  stock?: string;
  stockCount?: number;
  price: number;
  originalPrice?: number;
  image: string; // Cloudinary URL
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String },
    howToUse: { type: String },
    stock: { type: String },
    stockCount: { type: Number, min: 0, default: 0 },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
