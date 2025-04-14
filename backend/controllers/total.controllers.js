
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import Admin from '../models/admin.model.js';

export const getTotalCounts = async (req, res) => {
    try {
        // Get counts for each model
        const userCount = await User.countDocuments({});
        const productCount = await Product.countDocuments({});
        const orderCount = await Order.countDocuments({});
        const adminCount = await Admin.countDocuments({});

        // Send the counts in a response
        res.status(200).json({
            totalUsers: userCount,
            totalProducts: productCount,
            totalOrders: orderCount,
            totalAdmins: adminCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
