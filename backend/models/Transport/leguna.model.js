import mongoose from 'mongoose';

const legunaOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  truckType: { type: String, required: true },
  loadWeight: { type: String, required: true },
  specialRequest: { type: String, default: '' },
});

const LegunaOrder = mongoose.model('LegunaOrder', legunaOrderSchema);
export default LegunaOrder;
