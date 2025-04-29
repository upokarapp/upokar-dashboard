import mongoose from 'mongoose';


const kutirOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    specialRequest: {
        type: String,
        required: false
    },
    pid: {
        type: String,
        required: true
    },
    pprice: {
        type: Number,
        required: true
    },
    pname: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

// Create the model
const KutirOrder = mongoose.model('kutirOrder', kutirOrderSchema);

export default KutirOrder;