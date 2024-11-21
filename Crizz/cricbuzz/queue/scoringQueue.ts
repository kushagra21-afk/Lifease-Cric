import Queue from 'bull';

// Create a Bull queue instance
const scoringQueue = new Queue('scoring-tasks', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

export default scoringQueue;
