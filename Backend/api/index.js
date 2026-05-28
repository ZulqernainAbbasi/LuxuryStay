import express from "express";
import "dotenv/config";
import cors from "cors";
import dns from "dns";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "../configs/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());

// Clerk middleware (auth)
app.use(clerkMiddleware());

// ---------- DATABASE (IMPORTANT FIX) ----------
let isConnected = false;

const connectDBSafe = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

// ---------- ROUTES ----------

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API is Working");
});

// SAMPLE POST ROUTE (SAVE DATA TO MONGODB)
app.post("/api/data", async (req, res) => {
    try {
        await connectDBSafe();

        console.log("BODY:", req.body);

        res.status(200).json({
            success: true,
            message: "Data received",
            data: req.body
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

export default app;