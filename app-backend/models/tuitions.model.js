import mongoose from 'mongoose';

// Function to generate random unique code
const generateCode = () => {
  const prefix = 'T-'; // Fixed prefix for the code
  const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase(); // Random alphanumeric string
  return `${prefix}${randomStr}`; // Combine prefix with random string
};

// Define the schema for the teacher
const teacherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    default: generateCode // Automatically generate a unique code
  },
  gender: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  students: {
    type: Number,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  subjects: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  daysPerWeek: {
    type: Number,
    required: true
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);



export default Teacher;
