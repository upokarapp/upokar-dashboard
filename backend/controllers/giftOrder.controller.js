
import GiftOrder from '../models/giftOrder.model.js';


export const createGiftOrder = async (req, res) => {
    try {
        const order = new GiftOrder(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }

};

export const getAllGiftOrders = async (req, res) => {
    try {
        const orders = await GiftOrder.aggregate([
            // Lookup to join with the products collection based on order.pid
            {
                $lookup: {
                    from: 'gifts', // ensure this matches your actual collection name
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
            {
                $sort: { _id: -1 }
            },
            // Project to format the final output as desired
            {
                $project: {
                    _id: 1,
                    pname: '$pname',
                    productImage: '$product.imageUrl',
                    pprice: '$pprice',
                    quantity: 1,
                    totalPrice: 1,
                    name: '$name',
                    number: '$number',
                    address: '$address',
                    specialRequest:'$specialRequest'
                }
            }
        ]);        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchGiftOrders = async (req, res) => {
    try {
        const { query } = req.body;        
        let filter = {};
        if (query) {
            const numericValue = parseFloat(query);
            const isQueryNumeric = !isNaN(numericValue) && query === numericValue.toString();

            // Conditions for string fields (using regex)
            const stringConditions = [
                { name: { $regex: query, $options: 'i' } },
                { number: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } },
                { pname: { $regex: query, $options: 'i' } },
            ];

            // Conditions for numeric fields (exact match)
            const numericConditions = isQueryNumeric
                ? [
                    { quantity: numericValue },
                    { pprice: numericValue },
                    { totalPrice: numericValue }
                ]
                : [];

            // Combine all conditions using $or
            filter.$or = [...stringConditions, ...numericConditions];
        }

        const products = await GiftOrder.find(filter);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json(error.message);
    }
};

export const deleteGiftOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await GiftOrder.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
