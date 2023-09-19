import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.CONNECTION!);
  } catch (err) {
    console.error("Error ->", err);
    process.exit(1);
  }
};

export default connectDb;
