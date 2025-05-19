import SliderImgSchema from "../models/sliderGrocaryimg.js";
import { uploadToImageKit, deleteToImageKit } from "../middlewares/sliderGrocaryImg.js"

export const getAllSliderImages = async (req, res) => {
    try {
        const response = await SliderImgSchema.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const uploadSliderImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);


        const newImage = new SliderImgSchema({
            id: uploadResponse.fileId,
            url: uploadResponse.url
        });

        await newImage.save();

        res.status(201).json({
            success: true,
            data: newImage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateSliderImage = async (req, res) => {
    console.log(req.body.id);
    console.log(req.body._id);

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const updatedImage = await SliderImgSchema.findByIdAndUpdate(req.body._id, {
            id: uploadResponse.fileId,
            url: uploadResponse.url
        }, { new: true });

        if (!updatedImage) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }
        try {
            await deleteToImageKit(req.body.id);
        } catch (error) {
            console.error('ImageKit delete error:', error);
        }
        res.status(200).json({
            success: true,
            data: updatedImage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteSliderImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await SliderImgSchema.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



