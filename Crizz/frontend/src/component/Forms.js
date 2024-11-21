import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CommentaryButton = () => {
  const [currentStriker, setCurrentStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [deliveryType, setDeliveryType] = useState(null);
  const [runScored, setRunScored] = useState(null);

  // Handles the submission of a new ball
  const handleNewBall = async () => {
    try {
      const matchId = uuidv4();

      const deliveryData = {
        matchId,
        type: deliveryType || "normal",
        runs: runScored ?? 0, // Default runs to 0 if none selected
        extras: {}, // Placeholder for extras data
        bowler: "bowlerName", // Replace with actual bowler input if needed
        batsman: currentStriker,
      };

      console.log("Payload sent to server:", deliveryData);

      const response = await axios.post(
        "https://lifease-cric-1.onrender.com/api/scoring/delivery",
        deliveryData
      );

      if (response.data.success) {
        console.log("Delivery added successfully:", response.data.match);
        setCurrentStriker("");
        setNonStriker("");
        setDeliveryType(null);
        setRunScored(null);
      } else {
        console.error("Failed to add delivery:", response.data);
      }
    } catch (err) {
      console.error("Error occurred while adding delivery:", err.response?.data || err.message);
    }
  };

  // Handles run button clicks
  const handleRunClick = (run) => {
    setRunScored(run);
    if (!deliveryType) setDeliveryType("normal"); // Default to "normal" if no type selected
  };

  // Handles delivery type button clicks
  const handleDeliveryTypeClick = (type) => {
    setDeliveryType(type.toLowerCase());
    if (runScored === null) setRunScored(0); // Default runs to 0 if not selected
  };

  return (
    <div className="max-w-lg mx-auto bg-[#c4e5c3] shadow-xl rounded-lg p-8 max-h-[60rem]">
      <div className="mb-8">
        {/* Striker Input */}
        <div className="mb-6">
          <label
            htmlFor="striker"
            className="block text-lg font-medium text-gray-700 mb-3"
          >
            Current Striker
          </label>
          <input
            type="text"
            id="striker"
            value={currentStriker}
            onChange={(e) => setCurrentStriker(e.target.value)}
            placeholder="Enter Striker's Name"
            className="w-full p-4 text-lg border border-gray-300 bg-[#f0f0f0] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Non-Striker Input */}
        <div>
          <label
            htmlFor="nonStriker"
            className="block text-lg font-medium text-gray-700 mb-3"
          >
            Non-Striker
          </label>
          <input
            type="text"
            id="nonStriker"
            value={nonStriker}
            onChange={(e) => setNonStriker(e.target.value)}
            placeholder="Enter Non-Striker's Name"
            className="w-full p-4 text-lg border border-gray-300 bg-[#f0f0f0] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Run Buttons */}
      <div className="grid grid-cols-6 gap-3 mb-8">
        {[0, 1, 2, 3, 4, 6].map((run) => (
          <button
            key={run}
            onClick={() => handleRunClick(run)}
            className={`py-3 text-lg font-semibold rounded-lg border transition-colors duration-200 ${runScored === run
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-indigo-400"
              }`}
          >
            {run}
          </button>
        ))}
      </div>

      {/* Extra Delivery Buttons */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {["Wicket", "Wide", "No Ball", "Leg Bye", "Bye"].map((type) => (
          <button
            key={type}
            onClick={() => handleDeliveryTypeClick(type)}
            className={`py-3 text-md font-semibold rounded-lg border transition-colors duration-200 ${deliveryType === type.toLowerCase()
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-indigo-400"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* New Ball Button */}
      <div>
        <button
          onClick={handleNewBall}
          disabled={!currentStriker || !nonStriker || !deliveryType}
          className="w-full py-4 text-xl font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          New Ball
        </button>
      </div>
    </div>
  );
};

export default CommentaryButton;
