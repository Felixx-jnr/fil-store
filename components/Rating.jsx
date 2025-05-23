"use client";

import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";

export default function Rating({ productId }) {
  const [userHasRated, setUserHasRated] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [average, setAverage] = useState(0);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}/rate`);
        setAverage(res.data.averageRating || 0);
        setUserRating(res.data.userRating);
        setUserHasRated(!!res.data.userRating);
      } catch (err) {
        console.error("Error fetching rating:", err);
      }
    };

    fetchRating();
  }, [productId]);

  const handleRate = async (value) => {
    try {
      const res = await axios.post(`/api/products/${productId}/rate`, { value });
      setAverage(res.data.averageRating);
      setUserHasRated(true);
      setUserRating(value);
    } catch (err) {
      console.error(err);
      alert("Please log in to rate.");
    }
  };

  const renderStar = (index) => {
    const effectiveRating = userHasRated ? average : hovered || userRating || 0;
    const rounded = Math.round(effectiveRating * 2) / 2;

    if (userHasRated) {
      if (rounded >= index) {
        return <FaStar key={index} className="text-yellow-500 text-xl" />;
      } else if (rounded + 0.5 === index) {
        return <FaStarHalfAlt key={index} className="text-yellow-500 text-xl" />;
      } else {
        return <FaRegStar key={index} className="text-gray-300 text-xl" />;
      }
    } else {
      const isFilled = effectiveRating >= index;
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
      <span className="text-gray-600 text-sm">({Number(average).toFixed(1)} / 5)</span>
      {userHasRated && (
        <span className="ml-2 text-green-600 text-xs">You’ve rated this product</span>
      )}
    </div>
  );
}
