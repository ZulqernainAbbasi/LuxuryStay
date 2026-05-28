import mongoose from "mongoose";

const connectDB = async () => {

    try {

        // PREVENT MULTIPLE CONNECTIONS
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log("MongoDB Connected");

    } catch (error) {

        console.log(
            "MongoDB Error:",
            error.message
        );
    }
};

export default connectDB;