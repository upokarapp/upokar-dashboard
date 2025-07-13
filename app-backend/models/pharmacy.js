import mongoose from 'mongoose';

const pharmacySchema = new mongoose.Schema({
    name: String,
    number: {
        type: String,
        unique: true
    },
    location: String,
    time: String
});

const Pharmacy = mongoose.model('pharmacy', pharmacySchema);

export default Pharmacy;