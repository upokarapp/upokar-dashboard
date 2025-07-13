import mongoose from 'mongoose';


const sliderGrocaryImgSchema = new mongoose.Schema({
    id: { type: String, required: true },
    url: { type: String, required: true, }
});



const SliderGrocaryImgSchema = mongoose.model('sliderGrocaryImg', sliderGrocaryImgSchema);

export default SliderGrocaryImgSchema;
