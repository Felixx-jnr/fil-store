"use client";

import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";

export default function Rating({ productId, initialAverage, userRating }) {
  const [rating, setRating] = useState(userRating || 0);
  const [hovered, setHovered] = useState(0);
  const [average, setAverage] = useState(initialAverage || 0);

  const handleRate = async (value) => {
    try {
      const res = await axios.post(`/api/products/${productId}/rate`, {
        value,
      });
      setRating(value);
      setAverage(res.data.averageRating);
    } catch (err) {
      console.error(err);
      alert("Please log in to rate.");
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <AiFillStar
          key={star}
          className={`cursor-pointer text-2xl ${
            (hovered || rating) >= star ? "text-yellow-500" : "text-gray-300"
          }`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleRate(star)}
        />
      ))}
      <span className="text-gray-600 text-sm">({average.toFixed(1)} / 5)</span>
    </div>
  );
}
