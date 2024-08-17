/* 
================
MONGODB CONNECTION 
*/

import mongoose from 'mongoose';
import { MONGODB_URL } from '../env.config';


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

