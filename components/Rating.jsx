"use client";

import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";

export default function Rating({ productId, initialAverage, userRating }) {
  const [userHasRated, setUserHasRated] = useState(!!userRating);
  const [hovered, setHovered] = useState(0);
  const [average, setAverage] = useState(initialAverage || 0);

  const handleRate = async (value) => {
    try {
      const res = await axios.post(`/api/products/${productId}/rate`, { value });
      setAverage(res.data.averageRating);
      setUserHasRated(true);
    } catch (err) {
      console.error(err);
      alert("Please log in to rate.");
    }
  };

  const renderStar = (index) => {
    if (userHasRated) {
      const rounded = Math.round(average * 2) / 2; // e.g. 3.5
      if (rounded >= index) {
        return <FaStar key={index} className="text-yellow-500 text-xl" />;
      } else if (rounded + 0.5 === index) {
        return <FaStarHalfAlt key={index} className="text-yellow-500 text-xl" />;
      } else {
        return <FaRegStar key={index} className="text-gray-300 text-xl" />;
      }
    } else {
      const isFilled = (hovered || userRating) >= index;
      return (
        <FaStar
          key={index}
          className={`text-xl ${
            isFilled ? "text-yellow-500" : "text-gray-300"
          } cursor-pointer`}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleRate(index)}
        />
      );
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      {[1, 2, 3, 4, 5].map((i) => renderStar(i))}
      <span className="text-gray-600 text-sm">({average.toFixed(1)} / 5)</span>
      {userHasRated && (
        <span className="ml-2 text-green-600 text-xs">You’ve rated this product</span>
      )}
    </div>
  );
}
