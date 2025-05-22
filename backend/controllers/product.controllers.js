import Product from '../models/product.model.js';

const getAllProducts = async (req, res) => {
    const { category } = req.query;  // Get the category from the query params
    const query = category ? { category } : {};
    try {
        const products = await Product.find(query).sort({ _id: -1 });

        res.json(products);  // Return the products as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const getProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const searchProduct = async (req, res) => {
  try {
    const { query } = req.body;
    let filter = {};

    if (query) {
      // Build an $or array for the text fields only
      const orClauses = [
        { name:     { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { seller:   { $regex: query, $options: 'i' } },
        { contact: { $regex: query, $options: 'i' } }, // note renamed field
      ];

      // If the query is purely numeric, also match price exactly
      if (!isNaN(query)) {
        orClauses.push({ price: Number(query) });
      }

      filter.$or = orClauses;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
try {
    const id = req.params.id;

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
      }
    }

    // Remove the product from the database.
    await product.deleteOne();

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

export { getAllProducts, getProduct, searchProduct, deleteProduct };

