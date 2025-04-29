import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: String,
    contact: String,
    location: String,
    imageUrl: String,
    imageId: String,
    disc: String,
});

const Community = mongoose.model('communityCenter', communitySchema);

export default Community;