import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import scoringRoutes from './routes/scoring1';
import './queue/scoringProcessor';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// MongoDB Connection
console.log('MongoDB URL:', process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL as string, {
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
  });

// Or:

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


// Register Routes
app.use('/api/scoring', scoringRoutes);

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Cricket Scoring Admin Panel API');
});

// Start Server
const PORT = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


