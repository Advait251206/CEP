import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/User';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        const result = await User.findOneAndUpdate(
            { email: 'advaitkawale@gmail.com' },
            { role: 'admin' },
            { new: true }
        );
        if (result) {
            console.log("Successfully seeded admin:", result.email);
        } else {
            console.log("User not found!");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
