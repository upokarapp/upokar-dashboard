import mongoose from 'mongoose';

const skillAndITSchema = new mongoose.Schema({
    name: String,
    disc: String,
    contact: String,
    imageUrl: String,
    imageId: String,
});

const SkillAndIT = mongoose.model('skillAndIT', skillAndITSchema);

export default SkillAndIT;