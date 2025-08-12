import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createFeedback } from './controller/feedback.controller'; 
import { googleSignIn } from './controller/auth.controller';
import './config/db'

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());


// --- ROUTES ---
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the FeedbackApp Backend!');
});

// Auth Route
app.post('/api/auth/google', googleSignIn);

// Feedback Route
app.post('/api/feedback', createFeedback);

// Add the new route for submitting feedback
app.post('/api/feedback', createFeedback);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});