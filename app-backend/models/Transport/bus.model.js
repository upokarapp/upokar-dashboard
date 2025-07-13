//bus.model.js
import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    busType: { type: String, required: true },
    passengers: { type: String, required: true },
    specialRequest: { type: String, default: '' },
});

const BusOrder = mongoose.model('busOrder', busSchema);
export default BusOrder;