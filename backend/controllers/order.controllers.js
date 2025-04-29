
import Order from '../models/order.model.js';


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            // Lookup to join with the products collection based on order.pid
            {
                $lookup: {
                    from: 'products', // ensure this matches your actual collection name
                    let: { productId: { $toObjectId: '$pid' } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$productId'] }
                            }
                        }
                    ],
                    as: 'product'
                }
            },
            // Unwind the product array
            {
                $unwind: {
                    path: '$product',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Lookup to join with the users collection using product.sellerId
            {
                $lookup: {
                    from: 'users', // ensure this matches your actual collection name
                    let: { sellerId: '$product.sellerId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: [{ $toString: '$_id' }, '$$sellerId'] }
                            }
                        }
                    ],
                    as: 'seller'
                }
            },
            // Unwind the seller array
            {
                $unwind: {
                    path: '$seller',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: { _id: -1 }
            },
            // Project to format the final output as desired
            {
                $project: {
                    _id: 1,
                    quantity: 1,
                    totalPrice: 1,
                    customerName: '$name',
                    customerNumber: '$number',
                    deliveryAddress: '$address',
                    productName: '$pname',
                    productPrice: '$pprice',
                    sellerName: { $ifNull: ['$seller.name', 'Unknown Seller'] },
                    sellerNumber: { $ifNull: ['$seller.number', '01XXX-XXXXXX'] }
                }
            }
        ]);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// export const searchOrders = async (req, res) => {
//     try {
//         const { query } = req.body;

//         let filter = {};
//         if (query) {
//             const numericValue = parseFloat(query);
//             // Check if the query is a valid numeric string (e.g., "123", "45.67")
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

//         const products = await Order.find(filter);
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json(error.message);
//     }
// };

export const deleteOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Order.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const searchOrders = async (req, res) => {
    try {
        // Get the search query from the request
        const { q } = req.body;
        const searchQuery = q ? q.trim() : "";

        // Base aggregation pipeline to join product and seller data and shape the output
        const pipeline = [
            // Join with products collection using order.pid
            {
                $lookup: {
                    from: 'products', // ensure this matches your actual collection name
                    let: { productId: { $toObjectId: '$pid' } },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$productId'] } } }
                    ],
                    as: 'product'
                }
            },
            {
                $unwind: {
                    path: '$product',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Join with users collection using product.sellerId
            {
                $lookup: {
                    from: 'users', // ensure this matches your actual collection name
                    let: { sellerId: '$product.sellerId' },
                    pipeline: [
                        { $match: { $expr: { $eq: [{ $toString: '$_id' }, '$$sellerId'] } } }
                    ],
                    as: 'seller'
                }
            },
            {
                $unwind: {
                    path: '$seller',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Project to shape the final output as desired
            {
                $project: {
                    _id: 1,
                    quantity: 1,
                    totalPrice: 1,
                    customerName: '$name',
                    customerNumber: '$number',
                    deliveryAddress: '$address',
                    productName: '$pname',
                    productPrice: '$pprice',
                    orderDate: '$createdAt', // ensure your Order schema uses timestamps
                    sellerName: { $ifNull: ['$seller.name', 'Unknown Seller'] },
                    sellerNumber: { $ifNull: ['$seller.number', 'no-email@domain.com'] }
                }
            }
        ];

        // If a search query is provided, add a match stage that filters results by any field.
        if (searchQuery) {
            pipeline.push({
                $match: {
                    $or: [
                        { customerName: { $regex: searchQuery, $options: 'i' } },
                        { customerNumber: { $regex: searchQuery, $options: 'i' } },
                        { deliveryAddress: { $regex: searchQuery, $options: 'i' } },
                        { productName: { $regex: searchQuery, $options: 'i' } },
                        { sellerName: { $regex: searchQuery, $options: 'i' } },
                        { sellerNumber: { $regex: searchQuery, $options: 'i' } },
                        // For numeric fields, convert to string before applying the regex match.
                        { $expr: { $regexMatch: { input: { $toString: "$quantity" }, regex: searchQuery, options: "i" } } },
                        { $expr: { $regexMatch: { input: { $toString: "$totalPrice" }, regex: searchQuery, options: "i" } } },
                        { $expr: { $regexMatch: { input: { $toString: "$productPrice" }, regex: searchQuery, options: "i" } } }
                    ]
                }
            });
        }

        const orders = await Order.aggregate(pipeline);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const order = async (req, res) => {
    console.log(req.body);

    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }

};



const aggregateOrders = async (req, res) => {
    const data = await Order.aggregate([
        {
            //   $lookup: {
            //     from: 'products',
            //     localField: 'pid',
            //     foreignField: '_id',
            //     as: 'productDetails'
            //   },


            $lookup: {
                from: 'products', // ensure this matches your actual collection name
                let: { productId: { $toObjectId: '$pid' } },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$productId'] }
                        }
                    }
                ],
                as: 'product'
            }
        },

    ]);
    // console.log(data[0]);

}

aggregateOrders()