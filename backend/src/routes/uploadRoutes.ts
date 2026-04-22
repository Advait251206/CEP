import express, { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { verifyJWT, requireAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// Setup Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', verifyJWT, requireAdmin, upload.single('image'), async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No image uploaded' });
            return;
        }

        // Convert buffer to Base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        // Upload base64 string to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'cep_products',
        });

        res.json({ message: 'Image uploaded successfully', imageUrl: result.secure_url });
    } catch (error: any) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ message: error.message || 'Image upload failed' });
    }
});

export default router;
