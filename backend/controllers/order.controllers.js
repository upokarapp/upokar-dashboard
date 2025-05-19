
import Order from '../models/order.model.js';


// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.aggregate([
//             // Lookup to join with the products collection based on order.pid
//             {
//                 $lookup: {
//                     from: 'products', // ensure this matches your actual collection name
//                     let: { productId: { $toObjectId: '$pid' } },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: { $eq: ['$_id', '$$productId'] }
//                             }
//                         }
//                     ],
//                     as: 'product'
//                 }
//             },
//             // Unwind the product array
//             {
//                 $unwind: {
//                     path: '$product',
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             // Lookup to join with the users collection using product.sellerId
//             {
//                 $lookup: {
//                     from: 'users', // ensure this matches your actual collection name
//                     let: { sellerId: '$product.sellerId' },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: { $eq: [{ $toString: '$_id' }, '$$sellerId'] }
//                             }
//                         }
//                     ],
//                     as: 'seller'
//                 }
//             },
//             // Unwind the seller array
//             {
//                 $unwind: {
//                     path: '$seller',
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             {
//                 $sort: { _id: -1 }
//             },
//             // Project to format the final output as desired
//             {
//                 $project: {
//                     _id: 1,
//                     quantity: 1,
//                     totalPrice: 1,
//                     customerName: '$name',
//                     customerNumber: '$number',
//                     deliveryAddress: '$address',
//                     productName: '$pname',
//                     productPrice: '$pprice',
//                     sellerName: { $ifNull: ['$seller.name', 'Unknown Seller'] },
//                     sellerNumber: { $ifNull: ['$seller.number', '01XXX-XXXXXX'] }
//                 }
//             }
//         ]);

//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

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


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $addFields: {
                    pidObj: { $toObjectId: '$pid' }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'pidObj',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            // 3) (optional) remove the helper field
            {
                $project: {
                    pidObj: 0,       // drop the temp field
                    /* keep everything else */
                }
            },
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
                    sellerName: { $ifNull: ['$product.seller', 'Unknown Seller'] },
                    sellerNumber: { $ifNull: ['$product.contact', '01XXX-XXXXXX'] }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
      const { q } = req.body;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: 'Please provide a search term.' });
      }
  
      // Build a case‑insensitive regex for string fields
      const regex = new RegExp(q, 'i');
  
      // If q is numeric, capture it as a Number for exact matches
      const maybeNumber = isNaN(q) ? null : Number(q);
  
      const orders = await Order.aggregate([
        // Convert string pid to ObjectId for lookup
        {
          $addFields: {
            pidObj: { $toObjectId: '$pid' }
          }
        },
        // Lookup product document
        {
          $lookup: {
            from: 'products',
            localField: 'pidObj',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' },
        // Match search term across order and product fields
        {
          $match: {
            $or: [
              { name:             { $regex: regex } },
              { number:           { $regex: regex } },
              { address:          { $regex: regex } },
              { pname:            { $regex: regex } },
              { 'product.seller': { $regex: regex } },
              { 'product.contact':{ $regex: regex } },
              // numeric regex matches
              { $expr: { $regexMatch: { input: { $toString: '$quantity' }, regex } } },
              { $expr: { $regexMatch: { input: { $toString: '$pprice'   }, regex } } },
              { $expr: { $regexMatch: { input: { $toString: '$totalPrice' }, regex } } },
              // exact numeric matches
              ...(maybeNumber !== null
                ? [
                    { quantity:   maybeNumber },
                    { pprice:     maybeNumber },
                    { totalPrice: maybeNumber }
                  ]
                : [])
            ]
          }
        },
        // Remove helper field
        { $project: { pidObj: 0 } },
        // Format output fields
        {
          $project: {
            _id:               1,
            quantity:          1,
            totalPrice:        1,
            customerName:      '$name',
            customerNumber:    '$number',
            deliveryAddress:   '$address',
            productName:       '$pname',
            productPrice:      '$pprice',
            sellerName:        { $ifNull: ['$product.seller',  'Unknown Seller'] },
            sellerNumber:      { $ifNull: ['$product.contact', '01XXX-XXXXXX'] }
          }
        },
        // Sort by newest
        { $sort: { _id: -1 } }
      ]);
  
      return res.status(200).json(orders);
    } catch (error) {
      console.error('searchOrders error:', error);
      return res.status(500).json({ message: error.message });
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


// const aggregateOrders = async (req, res) => {
//     const data = await Order.aggregate([
//         {
//             //   $lookup: {
//             //     from: 'products',
//             //     localField: 'pid',
//             //     foreignField: '_id',
//             //     as: 'productDetails'
//             //   },


//             $lookup: {
//                 from: 'products', // ensure this matches your actual collection name
//                 let: { productId: { $toObjectId: '$pid' } },
//                 pipeline: [
//                     {
//                         $match: {
//                             $expr: { $eq: ['$_id', '$$productId'] }
//                         }
//                     }
//                 ],
//                 as: 'product'
//             }
//         },

//     ]);
//     // console.log(data[0]);

// }

// aggregateOrders()