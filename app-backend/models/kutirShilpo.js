import mongoose from 'mongoose';

const kutirshilpoSchema = new mongoose.Schema({
    name: String,
    contact: String,
    price: Number,
    imageUrl: String,
    imageId: String,
    disc: String,
});

const KutirShilpo = mongoose.model('kutirShilpo', kutirshilpoSchema);

export default KutirShilpo;