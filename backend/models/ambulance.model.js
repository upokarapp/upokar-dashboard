import mongoose from 'mongoose';

const ambulanceSchema = new mongoose.Schema({
    name: String,
    number: {
        type: String,
        unique: true
    },
    location: String,
});

const Ambulance = mongoose.model('ambulance', ambulanceSchema);

export default Ambulance;