import { Request, Response } from 'express';
import Score from '../models/Score';

// Add a delivery to the match
export const addDelivery = async (req: Request, res: Response): Promise<void> => {
  const { matchId, type, runs, extras, bowler, batsman } = req.body;

  try {
    // Find or initialize the match
    let match = await Score.findOne({ matchId });
    if (!match) {
      match = new Score({
        matchId,
        bowlerStats: [],
        batsmanStats: [],
        deliveries: [],
        teamStats: {
          totalRuns: 0,
          totalWickets: 0,
          legalBalls: 0,
          extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0 },
        },
      });
    }

    // Find or initialize bowler stats
    let bowlerStats = match.bowlerStats.find((b) => b.name === bowler);
    if (!bowlerStats) {
      bowlerStats = {
        name: bowler,
        balls: 0,
        overs: 0,
        runsConceded: 0,
        wickets: 0,
      };
      match.bowlerStats.push(bowlerStats);
    }

    // Find or initialize batsman stats
    let batsmanStats = match.batsmanStats.find((b) => b.name === batsman);
    if (!batsmanStats) {
      batsmanStats = { name: batsman, runs: 0, balls: 0 };
      match.batsmanStats.push(batsmanStats);
    }

    // Update stats based on delivery type
    switch (type) {
      case 'wide':
        bowlerStats.runsConceded += runs+1;
        match.teamStats.extras.wides += runs+1;
        match.teamStats.totalRuns += runs+1;
        break;

      case 'noball+bye':
        bowlerStats.runsConceded += 1;
        batsmanStats.balls += 1;
        match.teamStats.extras.noBalls += 1;
        match.teamStats.extras.byes += runs;
        match.teamStats.totalRuns += runs+1;
        break;

      case 'noball':
        bowlerStats.runsConceded += runs+1;
        batsmanStats.balls += 1;
        batsmanStats.runs += runs;
        match.teamStats.extras.noBalls += 1;
        match.teamStats.totalRuns += runs+1;
        break;

      case 'noball+legbye':
        bowlerStats.runsConceded += 1;
        batsmanStats.balls += 1;
        match.teamStats.extras.noBalls += 1;
        match.teamStats.extras.legByes += runs;
        match.teamStats.totalRuns += runs+1;
        break;

      // case 'legbye+overthrow':
      // case 'bye+overthrow':
      //   const extraType = type === 'legbye+overthrow' ? 'legByes' : 'byes';
      //   match.teamStats.extras[extraType] += runs;
      //   match.teamStats.totalRuns += runs;
      //   break;
      case 'leg bye':
        match.teamStats.extras.legByes += runs; 
        match.teamStats.totalRuns += runs; 
        batsmanStats.balls += 1;
        match.teamStats.legalBalls += 1;
        bowlerStats.balls += 1;
        break;
      case 'bye':
        match.teamStats.extras.legByes += runs; 
        match.teamStats.totalRuns += runs;
        batsmanStats.balls += 1;
        match.teamStats.legalBalls += 1;
        bowlerStats.balls += 1;
        break;


      case 'runs+overthrow':
        batsmanStats.runs += runs;
        bowlerStats.runsConceded += runs;
        match.teamStats.totalRuns += runs;
        batsmanStats.balls += 1;
        bowlerStats.balls += 1;
        break;

      case 'wicket':
        bowlerStats.balls += 1;
        bowlerStats.wickets += 1;
        batsmanStats.balls += 1;
        match.teamStats.legalBalls += 1;
        match.teamStats.totalWickets += 1;
        break;

      default: // 'normal'
        batsmanStats.runs += runs;
        batsmanStats.balls += 1;
        bowlerStats.runsConceded += runs;
        match.teamStats.legalBalls += 1;
        match.teamStats.totalRuns += runs;
        bowlerStats.balls += 1;
        break;
    }

    // Log the delivery
    match.deliveries.push({ type, runs, extras, bowler, batsman });

    // Save updated match data
    await match.save();

    // Respond with success
    res.status(201).json({ success: true, match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Fetch match stats
export const getMatchStats = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Fetch match data by matchId
    const match = await Score.findOne({ matchId: id });

    // Handle match not found
    if (!match) {
      res.status(404).json({ success: false, error: 'Match not found' });
      return;
    }

    // Return match stats
    res.status(200).json({ success: true, match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
