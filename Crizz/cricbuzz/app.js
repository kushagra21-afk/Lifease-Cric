const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
// install redis
//const Queue = require('bull'); 
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);
// Redis Implementation (Pull Image From Docker Hub) demo nginx file attached at the end
// const scoringQueue = new Queue('scoring-tasks', {
//   redis: {
//     host: '127.0.0.1',
//     port: 6379,
//   },
// });

// app.post('/api/queue-task', async (req, res) => {
//   const task = req.body;
//   await scoringQueue.add(task);
//   res.status(200).json({ message: 'Task added to queue', task });
// });

// scoringQueue.process(async (job) => {
//   console.log('Processing job:', job.data);
// });


app.use('/api/scoring', scoringRoutes);   //remove this line while using job sceduling

app.get('/', (req, res) => {
  res.send('Cricket Scoring Admin Panel API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
