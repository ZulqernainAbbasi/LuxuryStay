import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from '../configs/db.js';
import dns from 'dns';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from '../controllers/clerkWebhooks.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use('/api/clerk', clerkWebhooks);

app.get('/', (req, res) => {
    res.send('API is Working');
});

// IMPORTANT FOR VERCEL
export default app;