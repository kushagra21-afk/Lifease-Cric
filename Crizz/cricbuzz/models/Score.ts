import mongoose, { Document, Schema } from 'mongoose';

interface BatsmanStats {
  name: string;
  runs: number;
  balls: number;
}

interface BowlerStats {
  name: string;
  balls: number;
  overs: number;
  runsConceded: number;
  wickets: number;
}

interface TeamExtras {
  wides: number;
  noBalls: number;
  byes: number;
  legByes: number;
}

interface TeamStats {
  totalRuns: number;
  totalWickets: number;
  legalBalls: number;
  extras: TeamExtras;
}

interface Delivery {
  type: string;
  runs: number;
  extras?: string;
  bowler: string;
  batsman: string;
}

export interface ScoreDocument extends Document {
  matchId: string;
  batsmanStats: BatsmanStats[];
  bowlerStats: BowlerStats[];
  teamStats: TeamStats;
  deliveries: Delivery[];
}

const scoreSchema = new Schema<ScoreDocument>({
  matchId: { type: String, required: true, unique: true },
  batsmanStats: {
    type: [{ name: { type: String, required: true }, runs: { type: Number, default: 0 }, balls: { type: Number, default: 0 } }],
    default: [],
  },
  bowlerStats: {
    type: [{ name: { type: String, required: true }, balls: { type: Number, default: 0 }, overs: { type: Number, default: 0 }, runsConceded: { type: Number, default: 0 }, wickets: { type: Number, default: 0 } }],
    default: [],
  },
  teamStats: {
    totalRuns: { type: Number, default: 0 },
    totalWickets: { type: Number, default: 0 },
    legalBalls: { type: Number, default: 0 },
    extras: {
      wides: { type: Number, default: 0 },
      noBalls: { type: Number, default: 0 },
      byes: { type: Number, default: 0 },
      legByes: { type: Number, default: 0 },
    },
  },
  deliveries: [
    {
      type: { type: String, enum: ['normal', 'wide', 'noball', 'bye', 'leg bye', 'overthrow', 'wicket'], required: true },
      runs: { type: Number, required: true },
      extras: { type: String },
      bowler: { type: String, required: true },
      batsman: { type: String, required: true },
    },
  ],
}, { timestamps: true });

export default mongoose.model<ScoreDocument>('Score', scoreSchema);
