import express, { Request, Response } from 'express';
// Triggering nodemon restart for database fix
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import cartRoutes from './routes/cartRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.get('/api/debug', (req: Request, res: Response) => {
  const mongoose = require('mongoose');
  res.json({
     cwd: process.cwd(),
     envDb: process.env.MONGO_URI,
     activeDb: mongoose.connection.db?.databaseName,
     collections: mongoose.connection.collections ? Object.keys(mongoose.connection.collections) : [],
  });
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
