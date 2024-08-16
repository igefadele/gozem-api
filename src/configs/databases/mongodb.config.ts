/* 
================
MONGODB CONNECTION 
*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URL: string = process.env.MONGODB_URL as string;


// Function to connect to MongoDB using Mongoose
export const connectDB = async () => {
  try {
      await mongoose.connect(MONGODB_URL);
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1); // Exit the process if the connection fails
  }
};

