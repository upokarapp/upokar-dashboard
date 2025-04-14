import multer from 'multer';
import sharp from 'sharp';
import ImageKit from 'imagekit';


// Configure ImageKit using environment variables or defaults.
const imagekit = new ImageKit({
    publicKey: 'public_TywKEZWUMlw2g9J6VWpfE4YMHfU=',
    privateKey: 'private_w3YXm1flFh4Svchfcc98Nxf4Fl0=',
    urlEndpoint: 'https://ik.imagekit.io/mdshahid',
});

// Multer configuration using memory storage (accept any file size).
const upload = multer({
    storage: multer.memoryStorage(),
});

// Compress an image buffer to at most 100kb using sharp.
// This function iteratively adjusts quality and dimensions.
export async function compressTo100kb(buffer) {
    const metadata = await sharp(buffer).metadata();
    let quality = 80;
    let scale = 1.0;
    let outputBuffer = buffer;

    for (let i = 0; i < 10; i++) {
        const resizedWidth = metadata.width ? Math.round(metadata.width * scale) : undefined;
        outputBuffer = await sharp(buffer)
            .resize({ width: resizedWidth })
            .jpeg({ quality })
            .toBuffer();

        if (outputBuffer.length <= 100 * 1024) {
            return outputBuffer;
        }
        quality -= 10;
        if (quality < 20) {
            scale *= 0.9;
            quality = 80;
        }
    }
    // Return the best attempt even if slightly over 100kb.
    return outputBuffer;
}

// Compress and upload a file to ImageKit.
export async function uploadToImageKit(file) {
    try {
        const compressedBuffer = await compressTo100kb(file.buffer);
        const response = await imagekit.upload({
            file: compressedBuffer.toString('base64'),
            fileName: file.originalname,
            folder: '/hospitals',
        });
        // Return both fileId and URL so we can later delete the file.
        return { fileId: response.fileId, url: response.url };
    } catch (error) {
        console.error('ImageKit Upload Error:', error);
        throw new Error(`Image upload failed: ${error.message}`);
    }
}

export { upload, imagekit };



export const deleteToImageKit = async (fileId) => {
    try {
        await imagekit.deleteFile(fileId);
    } catch (error) {
        console.error('ImageKit delete error:', error);
        throw error;
    }
};