import React from "react";
import { FaEdit } from "react-icons/fa";

const BallByBallCommentary = ({ deliveries }) => {
  return (
    <div className="w-[88%] mt-10 mx-auto bg-[#c4e5c3] shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-600 text-center mb-6">
        Ball by Ball Commentary
      </h2>

      <div className="max-h-[180px] overflow-y-auto scrollbar-hidden">
        {/* Display only 3 elements, with scrolling for more */}
        {deliveries.map((delivery, index) => (
          <div
            key={delivery._id || index}
            className="flex items-center justify-between border-b py-2"
          >
            <div>
              <p className="text-gray-800">
                <strong>Ball {index + 1}:</strong>{" "}
                {delivery.type === "normal"
                  ? `${delivery.runs} runs`
                  : `${delivery.type.charAt(0).toUpperCase() +
                  delivery.type.slice(1)
                  } (${delivery.runs} runs)`}{" "}
                by {delivery.batsman}.
              </p>
              <p className="text-sm text-gray-500">Bowler: {delivery.bowler}</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800">
              <FaEdit size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BallByBallCommentary;
