import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
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
  type: {
    type: String,
    required: true
  }
});

const LaborModel = mongoose.model('Labor', schema);

export default LaborModel;
