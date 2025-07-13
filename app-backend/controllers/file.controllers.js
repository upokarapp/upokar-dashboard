import Product from '../models/product.model.js';
import { uploadToImageKit } from '../middlewares/file.middleware.js';
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, seller, contact } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Process each image: compress and upload to ImageKit.
    const imageObjects = await Promise.all(
      req.files.map((file) => uploadToImageKit(file))
    );

    // Create the product. Here, the images field is expected to be an array of objects { fileId, url }.
    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      seller: seller || 'Admin',
      contact: contact || '01600-190821',
      images: imageObjects,
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred',
    });
  }
};

