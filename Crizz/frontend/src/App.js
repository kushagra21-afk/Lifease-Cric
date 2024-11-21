import React, { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Forms from "./component/Forms";
import ShowScorecard from "./component/Scorecard";
import BallByBallCommentary from "./component/Commentry";
import PlayerScorecard from "./component/Player";
import axios from "axios";

const CricketScoringAdminPanel = () => {
  const [scorecard, setScorecard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMainSectionOpen, setIsMainSectionOpen] = useState(true);
  const [isCommentaryOpen, setIsCommentaryOpen] = useState(true);

  useEffect(() => {
    const fetchScorecard = async () => {
      try {
        const response = await axios.get(
          "https://lifease-cric-1.onrender.com/api/scoring/match/match123"
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

  const toggleMainSection = () => setIsMainSectionOpen(!isMainSectionOpen);
  const toggleCommentarySection = () => setIsCommentaryOpen(!isCommentaryOpen);

  return (
    <div className="flex flex-col h-full scrollbar-hidden">
      {/* Main Section Toggle */}
      <button
        onClick={toggleMainSection}
        className="w-full p-2 mb-4 flex items-center justify-between bg-gray-100 shadow-md transition-all duration-300"
      >
        <span className="text-lg font-semibold">Main Section</span>
        {isMainSectionOpen ? (
          <FaChevronUp size={20} />
        ) : (
          <FaChevronDown size={20} />
        )}
      </button>

      {/* Main Section */}
      <div
        className={`flex flex-row overflow-hidden transition-[max-height] duration-500 ${isMainSectionOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
      >
        <div className="flex-1 p-4">
          <Forms />
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col h-full space-y-4">
            <div className="flex-1">
              <ShowScorecard />
            </div>
            <div className="flex-1">
              <PlayerScorecard
                batsmanStats={scorecard.batsmanStats}
                bowlerStats={scorecard.bowlerStats}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Commentary Section */}
      <div className="w-full">
        <button
          onClick={toggleCommentarySection}
          className="w-full p-2 mb-4 flex items-center justify-between bg-gray-100 shadow-md transition-all duration-300"
        >
          <span className="text-lg font-semibold">Commentary</span>
          {isCommentaryOpen ? (
            <FaChevronUp size={20} />
          ) : (
            <FaChevronDown size={20} />
          )}
        </button>
        <div
          className={`overflow-hidden  transition-[max-height] duration-500 ${isCommentaryOpen ? "max-h-[300px]" : "max-h-0"
            }`}
        >
          <BallByBallCommentary deliveries={scorecard.deliveries} />
        </div>
      </div>
    </div>
  );
};

export default CricketScoringAdminPanel;
