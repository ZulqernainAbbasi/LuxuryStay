import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "dns";

import clerkWebhooks from "../controllers/clerkWebhooks.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// MIDDLEWARES
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API is Working");
});

// WEBHOOK ROUTE
app.post(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    clerkWebhooks
);

export default app;