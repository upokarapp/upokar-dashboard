import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        enum: ['main', 'sub'], 
    }
});


const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
