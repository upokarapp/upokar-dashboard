//car.model.js
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    carType: { type: String, required: true },
    passengers: { type: String, required: true },
    specialRequest: { type: String, default: '' },
});

const CarOrder = mongoose.model('carOrder', carSchema);
export default CarOrder;