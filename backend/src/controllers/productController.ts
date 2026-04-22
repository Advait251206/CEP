import { Request, Response } from 'express';
import { Product } from '../models/Product';
import mongoose from 'mongoose';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword as string,
            $options: 'i',
          },
        }
      : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, image, category, ingredients, howToUse, stock, stockCount, originalPrice } = req.body;

    const product = new Product({
      title,
      price,
      description,
      image,
      category,
      ingredients,
      howToUse,
      stock,
      stockCount,
      originalPrice,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, image, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.image = image || product.image;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // 1. Delete image from Cloudinary if it exists and looks like a Cloudinary URL
      if (product.image && product.image.includes('cloudinary.com')) {
          const match = product.image.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
          if (match && match[1]) {
             const { v2: cloudinary } = require('cloudinary');
             try {
                await cloudinary.uploader.destroy(match[1]);
             } catch (err) {
                console.error('Failed to delete image from Cloudinary:', err);
             }
          }
      }

      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
