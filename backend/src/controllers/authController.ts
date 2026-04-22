import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await bcrypt.compare(password, user.password as string))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        age: user.age,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
      // @ts-ignore (since user is attached via verifyJWT)
      const user = await User.findById(req.user._id);

      if (user) {
          res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              phone: user.phone,
              address: user.address,
              age: user.age,
          });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
      // @ts-ignore
      const user = await User.findById(req.user._id).select('+password');

      if (user) {
          user.name = req.body.name || user.name;
          user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
          user.address = req.body.address !== undefined ? req.body.address : user.address;
          user.age = req.body.age !== undefined ? req.body.age : user.age;

          if (req.body.password) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(req.body.password, salt);
          }

          const updatedUser = await user.save();

          res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
              phone: updatedUser.phone,
              address: updatedUser.address,
              age: updatedUser.age,
              token: generateToken(updatedUser._id.toString()),
          });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
};

// @desc    Make user an admin (Requires admin role & password verification)
// @route   POST /api/auth/make-admin
// @access  Private/Admin
export const makeAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
      const { targetEmail, adminPassword } = req.body;
      
      // @ts-ignore
      const adminId = req.user._id;

      // 1. Verify current admin password
      const currentAdmin = await User.findById(adminId).select('+password');
      if (!currentAdmin || !(await bcrypt.compare(adminPassword, currentAdmin.password as string))) {
          res.status(401).json({ message: 'Invalid admin password verification' });
          return;
      }

      // 2. Find target user by email
      const targetUser = await User.findOne({ email: targetEmail });
      if (!targetUser) {
          res.status(404).json({ message: 'Target user not found with that email' });
          return;
      }

      // 3. Update role
      targetUser.role = 'admin';
      await targetUser.save();

      res.status(200).json({ message: `Successfully granted admin privileges to ${targetEmail}` });
  } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
};
