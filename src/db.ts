require("dotenv").config();

import mongoose from "mongoose";

const uri =
    "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_CLUSTER +
    ".mongodb.net/" +
    process.env.DB_NAME +
    "?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

export default connectDB;
