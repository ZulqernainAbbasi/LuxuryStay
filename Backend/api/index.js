import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "dns";

import clerkWebhooks from "../controllers/clerkWebhooks.js";
import userRouter from "../routes/userRoutes.js";
import hotelRouter from "../routes/hotelRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// CORS
app.use(cors({
    origin: "*",
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("API is Working");
});
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)

// CLERK WEBHOOK ROUTE
app.post(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    clerkWebhooks
);

// NORMAL JSON ROUTES
app.use(express.json());

export default app;