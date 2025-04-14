import mongoose from 'mongoose';

// Define a schema for storing company data
const companySchema = new mongoose.Schema({
  Omera: {
    type: String,
    required: true
  },
  Total: {
    type: String,
    required: true
  },
  Beximco: {
    type: String,
    required: true
  },
  Jamuna: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const GasPrice = mongoose.model('gasPrice', companySchema);

export default GasPrice;
