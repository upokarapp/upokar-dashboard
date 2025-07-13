import mongoose from 'mongoose';

const bikeOrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    bikeType: { type: String, required: true },
    passengers: { type: Number, required: true },
    specialRequest: { type: String, default: '' },
});

const BikeOrder = mongoose.model('BikeOrder', bikeOrderSchema);
export default BikeOrder;
