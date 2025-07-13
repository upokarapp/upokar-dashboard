import mongoose from 'mongoose';

const animalCareSchema = new mongoose.Schema({
    name: String,
    number: {
        type: String,
        unique: true
    },
    location: String,
    time: String
});

const AnimalCare = mongoose.model('animalCare', animalCareSchema);

export default AnimalCare;