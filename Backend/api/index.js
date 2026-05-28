import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "dns";

import clerkWebhooks from "../controllers/clerkWebhooks.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// CORS
app.use(cors({
    origin: "*",
    credentials: true
}));

// IMPORTANT:
// DO NOT use express.json() before webhook route

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API is Working");
});

// CLERK WEBHOOK ROUTE
app.post(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    clerkWebhooks
);

// NORMAL JSON ROUTES
app.use(express.json());

export default app;