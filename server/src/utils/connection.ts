import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
      throw new Error('MongoDB URI is not defined in environment variables.');
    }

    const options = {
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;

    const conn = await mongoose.connect(mongodbUri, options);

    console.log('MongoDB connected:', conn.connection.host);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
