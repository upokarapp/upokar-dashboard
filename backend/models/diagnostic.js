import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor name is required'],
        trim: true,
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
        trim: true,
    },
    qualifications: {
        type: String,
        required: [true, 'Qualifications are required'],
        trim: true,
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: {
            values: ['Male', 'Female'],
            message: 'Gender must be either Male or Female'
        }
    }
});

const diagnosticSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Diagnostic name is required'],
        trim: true,
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    doctors: {
        type: [doctorSchema],
        required: [true, 'At least one doctor is required'],
        validate: {
            validator: function (arr) {
                return arr.length > 0 && arr.length <= 10;
            },
            message: 'Doctors array must contain 1 to 10 doctors'
        }
    },
    imageUrl: String,
    imageId: String
});


const Diagnostic = mongoose.model('Diagnostic', diagnosticSchema);

export default Diagnostic;