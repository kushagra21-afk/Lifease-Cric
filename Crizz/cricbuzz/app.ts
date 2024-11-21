import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import scoringRoutes from './routes/scoring';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,  // Limit each IP to 100 requests per windowMs
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
