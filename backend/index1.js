import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import ImageKit from 'imagekit';
import connection from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
connection();

// ImageKit Configuration
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});



 
// File Upload Middleware
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload to ImageKit
const uploadToImageKit = async (file) => {
    try {
        const response = await imagekit.upload({
            file: file.buffer.toString('base64'),
            fileName: file.originalname,
            folder: '/products'
        });
        return response.url;
    } catch (error) {
        throw new Error('Image upload failed');
    }
};

// Routes
app.post('/api/products', upload.array('images', 3), async (req, res) => {
    try {
        // Validate input
        if (!req.body.name || !req.body.description || !req.body.price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        // Upload images to ImageKit
        const imageUrls = await Promise.all(
            req.files.map(file => uploadToImageKit(file))
        );

        // Create product
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            images: imageUrls
        });

        // Save to database
        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error occurred'
        });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: err.code === 'LIMIT_FILE_SIZE'
                ? 'File size too large'
                : 'File upload error'
        });
    }
    res.status(500).json({ success: false, message: 'Server error occurred' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));