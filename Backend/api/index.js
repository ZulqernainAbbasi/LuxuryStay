import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "dns";

import { clerkMiddleware } from "@clerk/express";

import clerkWebhooks from "../controllers/clerkWebhooks.js";
import connectCloudinary from "../configs/cloudinary.js";
import connectDB from "../configs/db.js";

import userRouter from "../routes/userRoutes.js";
import hotelRouter from "../routes/hotelRoutes.js";
import roomRouter from "../routes/roomRoutes.js";
import bookingRouter from "../routes/bookingRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.FRONTEND_URL
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

/*
|--------------------------------------------------------------------------
| IMPORTANT: Capture raw body
|--------------------------------------------------------------------------
*/

app.use(
    express.json({
        verify: (req, res, buf) => {
            if (req.originalUrl === "/api/clerk") {
                req.rawBody = buf;
            }
        }
    })
);

/*
|--------------------------------------------------------------------------
| Clerk Webhook
|--------------------------------------------------------------------------
*/

app.post(
    "/api/clerk",
    clerkWebhooks
);

/*
|--------------------------------------------------------------------------
| Clerk Middleware
|--------------------------------------------------------------------------
*/

app.use(clerkMiddleware());

/*
|--------------------------------------------------------------------------
| Test Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.send("API is Working 🚀");
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

/*
|--------------------------------------------------------------------------
| Connections
|--------------------------------------------------------------------------
*/

connectCloudinary();
connectDB();

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;