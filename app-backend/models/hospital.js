import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name: String,
    contact: String,
    location: String,
    imageUrl: String,
    imageId: String,
    services: [String],
});

const Hospital = mongoose.model('hospital', hospitalSchema);

export default Hospital;