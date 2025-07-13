import mongoose from 'mongoose';

// Define the schema for the data
const cylinderOrderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  cname: {
    type: String,
    required: true
  },
  date: {
    type: String, // You may consider using Date type if it's a date
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  specialRequest: {
    type: String,
    required: false
  }
});

// Create a model based on the schema
const CylinderOrder = mongoose.model('CylinderOrder', cylinderOrderSchema);

export default CylinderOrder;
