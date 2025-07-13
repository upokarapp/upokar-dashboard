import mongoose from 'mongoose';

const homioSchema = new mongoose.Schema({
    name: String,
    number: {
        type: String,
        unique: true
    },
    location: String,
    time: String
});

const Homio = mongoose.model('homio', homioSchema);

export default Homio;