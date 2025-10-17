// @ts-nocheck
import mongoose from 'mongoose';
import 'dotenv/config'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error, 'Error connecting to MongoDB')
    process.exit(1)
  }
}

export default connectDB;