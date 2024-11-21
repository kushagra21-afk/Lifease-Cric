import React from "react";

const PlayerScorecard = ({ batsmanStats, bowlerStats }) => {
  return (
    <div className="max-w-lg mt-6 mx-auto bg-[#c4e5c3] shadow-sm rounded-md p-4">
      <h2 className="text-xl font-semibold text-indigo-600 text-center mb-4">
        Player Scorecard
      </h2>

      {/* Batsman Details */}
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-800 mb-3">
          Batsman Details
        </h3>
        <div className="grid grid-cols-3 gap-2 text-left font-medium">
          <span>Name</span>
          <span>Runs</span>
          <span>Balls</span>
        </div>
        {batsmanStats.length === 0 ? (
          <p className="text-left text-sm text-gray-600 mt-2">
            No batsman data available
          </p>
        ) : (
          batsmanStats.map((batsman, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-2 text-left text-gray-700 text-sm py-1 border-b"
            >
              <span>{batsman.name}</span>
              <span>{batsman.runs}</span>
              <span>{batsman.balls}</span>
            </div>
          ))
        )}
      </div>

      {/* Bowler Details */}
      <div>
        <h3 className="text-base font-medium text-gray-800 mb-3">
          Bowler Details
        </h3>
        <div className="grid grid-cols-5 gap-2 text-left font-medium">
          <span>Name</span>
          <span>Runs</span>
          <span>Overs</span>
          <span>Maidens</span>
          <span>Wickets</span>
        </div>
        {bowlerStats.length === 0 ? (
          <p className="text-left text-sm text-gray-600 mt-2">
            No bowler data available
          </p>
        ) : (
          bowlerStats.map((bowler, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 text-left text-gray-700 text-sm py-1 border-b"
            >
              <span>{bowler.name}</span>
              <span>{bowler.runsConceded}</span>
              <span>{Math.floor(bowler.balls / 6)}.{bowler.balls % 6}</span>
              <span>{bowler.maidens}</span>
              <span>{bowler.wickets}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlayerScorecard;
