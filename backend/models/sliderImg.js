import mongoose from 'mongoose';


const sliderImgSchema = new mongoose.Schema({
    id: { type: String, required: true },
    url: { type: String, required: true, },
});



const SliderImgSchema = mongoose.model('sliderImg', sliderImgSchema);

export default SliderImgSchema;
