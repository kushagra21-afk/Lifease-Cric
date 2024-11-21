import express from 'express';
import { addDelivery, getMatchStats } from '../controllers/scoringController';

const router = express.Router();

router.post('/delivery', addDelivery);

router.get('/match/:id', getMatchStats);

export default router;
