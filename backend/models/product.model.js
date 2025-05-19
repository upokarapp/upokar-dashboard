import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    seller: { type: String, required: true, default: "admin" },  // Default value set to 'admin'
    contact: { type: String, required: true, default: "01600-190821" },  // Default value set to 'admin'
    images: [
        {
            fileId: { type: String, required: true }, // Store fileId for deletion
            url: { type: String, required: true }    // Store the image URL
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
