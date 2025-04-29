import SliderImgSchema from "../models/sliderImg.js";
import { uploadToImageKit, deleteToImageKit } from "../middlewares/sliderImg.js"

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
        // const updatedImage = await SliderImgSchema.findOneAndUpdate({ _id: req.params.id }, {
        //     id: uploadResponse.fileId,
        //     url: uploadResponse.url
        // }, { new: true });

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

export const addLinkToSlider = async (sliderImageId, linkUrl) => {
    try {
        const updated = await SliderImgSchema.findByIdAndUpdate(
            sliderImageId,
            { link: linkUrl },        // set the link field
            { new: true, runValidators: true }
        );
        if (!updated) {
            console.log(`No slider found with _id=${sliderImageId}`);
            return null;
        }
        console.log('Updated slider:', updated);
        return updated;
    } catch (err) {
        console.error('Error updating link:', err);
        throw err;
    }
};


// // Upload image handler
// const uploadImage = async (req, res) => {
//     try {
//         const { buffer, originalname } = req.file;

//         // Upload the image to ImageKit
//         const result = await imageKit.upload({
//             file: buffer,
//             fileName: originalname,
//         });

//         // Save image metadata into MongoDB
//         const newImage = new SliderImg({
//             id: result.fileId,
//             url: result.url,
//         });

//         await newImage.save();  // Save to MongoDB

//         res.status(200).json(newImage);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error uploading image' });
//     }
// };

// // Update image handler
// const updateImage = async (req, res) => {
//     const imageId = req.params.id;
//     const updatedFile = req.file;

//     try {
//         // Find the image to update from MongoDB
//         const image = await SliderImg.findOne({ id: imageId });
//         if (!image) return res.status(404).json({ message: 'Image not found' });

//         // Upload the new file to ImageKit
//         const updateResult = await imageKit.upload({
//             file: updatedFile.buffer,
//             fileName: updatedFile.originalname,
//         });

//         // Update the image in MongoDB
//         image.url = updateResult.url;
//         image.filename = updatedFile.originalname;
//         await image.save();

//         res.status(200).json(image);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error updating image' });
//     }
// };

// // Delete image handler
// const deleteImage = async (req, res) => {
//     const imageId = req.params.id;

//     try {
//         // Find the image to delete from MongoDB
//         const image = await SliderImg.findOne({ id: imageId });
//         if (!image) return res.status(404).json({ message: 'Image not found' });

//         // Delete image from ImageKit
//         await imageKit.deleteFile(imageId);

//         // Delete the image from MongoDB
//         await SliderImg.deleteOne({ id: imageId });

//         res.status(200).json({ message: 'Image deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error deleting image' });
//     }
// };

// // Get all images handler (for fetching all images)
// const getImages = async (req, res) => {
//     try {
//         const images = await SliderImg.find();
//         res.status(200).json(images);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching images' });
//     }
// };

// export {
//     uploadImage,
//     updateImage,
//     deleteImage,
//     getImages,
// };