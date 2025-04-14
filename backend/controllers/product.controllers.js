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
        // Extract search parameter from query string
        const { query } = req.body;

        
        // Build the filter query.
        // If "search" is provided, use a case-insensitive regex match on the name field.
        let filter = {};
        if (query) {
            filter.name = { $regex: query, $options: 'i' };
        }

        // Query the database for products matching the filter
        const products = await Product.find(filter);

        // Send back the products data
        res.status(200).json(products);
    } catch (error) {
        // Handle any errors that occur during the query
        console.error("Error fetching products:", error);
        res.status(500).json(error.message);
    }
};
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { getAllProducts, getProduct, searchProduct, deleteProduct };

