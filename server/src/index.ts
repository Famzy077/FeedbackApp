import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import feedbackRouter  from './routes/feedback';
import morgan from 'morgan'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['POST'],
}));
app.use(express.json());

// Logger
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the FeedbackApp Backend!');
});

app.use('/api/v1', feedbackRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});