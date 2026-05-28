import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    role: {
        type: String,
        enum: ["user", "admin", "staff"],
        default: "user"
    },

    recentSearchCities: [
        {
            type: String
        }
    ]

}, { timestamps: true });

// IMPORTANT FIX
const User =
    mongoose.models.User ||
    mongoose.model("User", userSchema);

export default User;