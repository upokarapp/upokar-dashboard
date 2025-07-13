import mongoose from 'mongoose';

const bloodDonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Name is a required field
    },
    address: {
        type: String,
        required: true,  // Address is a required field
    },
    number: {
        type: String,
        required: true,  // Phone number is required and should be a string (store it as a string for leading zeroes)
        unique: true,  // Phone number should be unique
        match: [/^\+?\d{10,15}$/, 'Please enter a valid phone number'],  // Valid phone number regex
    },
    lastDonation: {
        type: String,
        required: true,  // Last donation date is required
    },
    details: {
        type: String,
        required: true,  // Additional comments/details are required
    },
    bloodGroup: {
        type: String,
        required: true,  // Blood group is required
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Blood group can only be one of these values
    },
}, {
    timestamps: true,  // Automatically create 'createdAt' and 'updatedAt' fields
});

// Create and export the BloodDonor model
const BloodDonor = mongoose.model('BloodDonor', bloodDonorSchema);

export default BloodDonor;


