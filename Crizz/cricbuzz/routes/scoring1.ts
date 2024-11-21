import express from 'express';
import scoringQueue from '../queue/scoringQueue';
import { getMatchStats } from '../controllers/scoringController';

const router = express.Router();

// POST: Add delivery task to the queue
router.post('/delivery', async (req, res) => {
  try {
    await scoringQueue.add({
      taskType: 'addDelivery',
      data: req.body,
    });
    res.status(200).json({ message: 'Delivery task added to queue' });
  } catch (err) {
    console.error('Error adding delivery task to queue:', err);
    res.status(500).json({ error: 'Failed to add delivery task to queue' });
  }
});

// GET: Fetch match stats
router.get('/match/:id', getMatchStats);

export default router;
