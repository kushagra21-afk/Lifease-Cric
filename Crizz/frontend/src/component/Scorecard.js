import React, { useState, useEffect } from "react";
import PlayerScorecard from "./Player";
import axios from "axios";

const ShowScorecard = () => {
  const [scorecard, setScorecard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScorecard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/scoring/match/match123"
        );
        setScorecard(response.data.match);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch match stats");
        setLoading(false);
      }
    };

    fetchScorecard();
  }, []);

  if (loading) {
    return <p>Loading scorecard...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!scorecard) {
    return <p>No scorecard data available!</p>;
  }

  const overs = Math.floor(scorecard.teamStats.legalBalls / 6);
  const ballsInCurrentOver = scorecard.teamStats.legalBalls % 6;

  return (
    <>
      <div className="max-w-lg mx-auto text-left bg-[#c4e5c3] shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-indigo-600 text-left mb-3">
          Scorecard
        </h2>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <h3 className="text-base font-medium">Team Name:</h3>
            <p className="text-gray-700 text-sm">{scorecard.teamName}</p>
          </div>
          <div>
            <h3 className="text-base font-medium">Runs:</h3>
            <p className="text-gray-700 text-sm">
              {scorecard.teamStats.totalRuns}
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Wickets:</h3>
            <p className="text-gray-700 text-sm">
              {scorecard.teamStats.totalWickets}
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Overs:</h3>
            <p className="text-gray-700 text-sm">
              {overs}.{ballsInCurrentOver}
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Wides:</h3>
            <p className="text-gray-700 text-sm">
              {scorecard.teamStats.extras.wides}
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">No Balls:</h3>
            <p className="text-gray-700 text-sm">
              {scorecard.teamStats.extras.noBalls}
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Leg Byes:</h3>
            <p className="text-gray-700 text-sm">
              {scorecard.teamStats.extras.legByes}
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Byes:</h3>
            <p className="text-gray-700 text-sm">
              {scorecard.teamStats.extras.byes}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowScorecard;
