import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dns from 'dns';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from '../controllers/clerkWebhooks.js';

// Fix DNS for cloud environments
dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();

// --------------------
// SAFE MIDDLEWARES
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// ROUTES THAT DON'T CRASH SERVERLESS
// --------------------
app.get('/', (req, res) => {
    res.send('API is Working');
});

// Clerk webhook route (kept but protected)
app.use('/api/clerk', clerkWebhooks);

// --------------------
// IMPORTANT: LAZY DB CONNECTION
// --------------------
// DO NOT connect DB at top-level in Vercel
// connectDB() should be called inside functions OR removed from here

export default app;