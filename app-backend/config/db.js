import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGODB_URI;

const connection = async () => {
    try {
        await mongoose.connect(URL);
        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 60000  // 60,000 milliseconds = 1 minute
        });
        console.log("database connected");
    } catch (error) {
        console.log(error.message);
    }
}
export default connection;

