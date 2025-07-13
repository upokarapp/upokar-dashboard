import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
    name: String,
    disc: String,
    contact: String,
    imageUrl: String,
    imageId: String,
});

const Volunteer = mongoose.model('volunteer', volunteerSchema);

export default Volunteer;