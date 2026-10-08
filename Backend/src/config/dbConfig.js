import "dotenv/config";
import mongoose from 'mongoose';

export default async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch(error) {
        console.log('Something went wrong while connecting to MongoDB:');
        console.error(error);
    }
}