import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema({
    name: String,
    contact: String,
    price: Number,
    imageUrl: String,
    imageId: String,
    disc: String,
    category: String
});

const Gifts = mongoose.model('gift', giftSchema);

export default Gifts;