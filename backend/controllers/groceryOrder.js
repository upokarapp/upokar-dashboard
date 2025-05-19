import GroceryOrder from "../models/groceryOrder.js";
import Product from "../models/product.model.js";


export const createOrder = async (req, res) => {

    try {
        const { customer, orderItems, totalAmount } = req.body;

        // Validate products exist and get current prices
        const productIds = orderItems.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== orderItems.length) {
            return res.status(400).json({
                success: false,
                message: 'One or more products not found'
            });
        }

        // Create order items with verified prices
        const verifiedItems = orderItems.map(item => {
            const product = products.find(p => p._id.equals(item.product));
            return {
                product: item.product,
                quantity: item.quantity,
                price: product.price
            };
        });

        const verifiedTotalAmount = verifiedItems.reduce((total, item) => total + item.price * item.quantity, 0);

        if (verifiedTotalAmount !== totalAmount) {
            return res.status(400).json({
                success: false,
                message: 'Total amount does not match'
            });
        }

        const order = new GroceryOrder({
            customer: {
                name: customer.name,
                phone: customer.phone,
                address: customer.address
            },
            orderItems: verifiedItems,
            totalAmount
        });

        await order.save();


        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const totalOrders = await GroceryOrder.countDocuments();
        const orders = await GroceryOrder.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
        // .populate('orderItems.product', 'name price images');
        const totalPages = Math.ceil(totalOrders / limit);

        res.json({
            success: true,
            count: orders.length,
            totalOrders,
            totalPages,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const searchGroceryOrder = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const searchConditions = [];
        const numericValue = Number(query);
        const isNumeric = !isNaN(numericValue);

        if (isNumeric) {
            // Numeric search conditions
            const cleanPhoneQuery = query.replace(/\D/g, '');

            searchConditions.push(
                { totalAmount: numericValue },
                {
                    'customer.phone': {
                        $regex: `^${cleanPhoneQuery}`,
                        $options: 'i'
                    }
                },
                {
                    $expr: {
                        $eq: [
                            { $size: "$orderItems" },
                            numericValue
                        ]
                    }
                }
            );
        } else {
            // Text search conditions
            const textRegex = new RegExp(query, 'i');

            searchConditions.push(
                { 'customer.name': textRegex },
                { 'customer.phone': textRegex },
                { 'status': textRegex },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$totalAmount" },
                            regex: query,
                            options: 'i'
                        }
                    }
                }
            );
        }

        const results = await GroceryOrder.find({
            $or: searchConditions
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: results.length,
            totalOrders: results.length,
            orders: results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// export const searchKutirOrders = async (req, res) => {
//     try {
//         const { query } = req.body;

//         let filter = {};
//         if (query) {
//             const numericValue = parseFloat(query);
//             const isQueryNumeric = !isNaN(numericValue) && query === numericValue.toString();

//             // Conditions for string fields (using regex)
//             const stringConditions = [
//                 { name: { $regex: query, $options: 'i' } },
//                 { number: { $regex: query, $options: 'i' } },
//                 { address: { $regex: query, $options: 'i' } },
//                 { pname: { $regex: query, $options: 'i' } },
//             ];

//             // Conditions for numeric fields (exact match)
//             const numericConditions = isQueryNumeric
//                 ? [
//                     { quantity: numericValue },
//                     { pprice: numericValue },
//                     { totalPrice: numericValue }
//                 ]
//                 : [];

//             // Combine all conditions using $or
//             filter.$or = [...stringConditions, ...numericConditions];
//         }

//         const products = await KutirOrder.find(filter);
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json(error.message);
//     }
// };
export const getOrderById = async (req, res) => {
    console.log(req.params.id);
    try {
        const order = await GroceryOrder.findById(req.params.id)
            .populate('orderItems.product', 'name price images');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'confirmed', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const order = await GroceryOrder.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};