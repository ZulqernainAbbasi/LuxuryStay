import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log('Database Connected');
        });

        await mongoose.connect(process.env.MONGODB_URI + "/LuxuryStay");

        console.log("MongoDB Connected Successfully");

    } catch (error) {

        console.log("MongoDB Error:", error);

    }
}

export default connectDB;