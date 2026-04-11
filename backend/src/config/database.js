import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("✅ MonogDb Disconnected");
  } catch (error) {
    console.error("❌ MongoDB Disconnection Error:", error.message);
    process.exit(1);
  }
};

export { connectDB, disconnectDB };
