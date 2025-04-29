import mongoose from 'mongoose';

const coachingoSchema = new mongoose.Schema({
    name: String,
    disc: String,
    contact: String,
    imageUrl: String,
    imageId: String,
});

const Coaching = mongoose.model('coaching', coachingoSchema);

export default Coaching;