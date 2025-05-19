import Product from '../models/product.model.js';
import { uploadToImageKit, imagekit } from '../middlewares/file.middleware.js';
import { addLinkToSlider } from '../controllers/SliderImg.js';
// Controller to add a product with images.
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

export const addProductLink = async (req, res) => {
  try {
    const { name, description, price, category, carouselImageLink } = req.body;
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
      sellerId: req.body.sellerId || 'admin',
      images: imageObjects,
    });
    const response = await product.save();
    if (response) {
      const resdata = await addLinkToSlider(carouselImageLink, response._id)
      if (resdata) {
        return res.status(201).json({
          success: true,
          message: 'Product linked successfully',
          product,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Product created but failed to add link',
        });
      }
    }
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred',
    });
  }
};
// Controller to delete an entire product along with its images.
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the product by its ID.
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete each image from ImageKit using its fileId.
    for (const image of product.images) {
      try {
        await imagekit.deleteFile(image.fileId);
      } catch (err) {
        console.error(`Failed to delete image ${image.fileId} from ImageKit:`, err);
        // Optionally, decide whether to continue or return an error.
      }
    }

    // Remove the product from the database.
    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product and its images deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred',
    });
  }
};

// Controller to delete a single image from a product.
export const deleteProductImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;
    // Find the product by its ID.
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the specific image in the product's images array.
    const imageToDelete = product.images.find((img) => img.fileId === imageId);
    if (!imageToDelete) {
      return res.status(404).json({ message: 'Image not found in this product' });
    }

    // Delete the image from ImageKit.
    await imagekit.deleteFile(imageId);

    // Remove the image from the product's images array.
    product.images = product.images.filter((img) => img.fileId !== imageId);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product image deleted successfully',
      product,
    });
  } catch (error) {
    console.error('Error deleting product image:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred',
    });
  }
};
