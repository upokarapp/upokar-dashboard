import mongoose from 'mongoose';

const cngOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  passengers: { type: Number, required: true },
  specialRequest: { type: String, default: '' },
});

const CNGOrder = mongoose.model('CNGOrder', cngOrderSchema);
export default CNGOrder;
