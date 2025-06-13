"use client";

import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";

export default function Rating({
  productId,
  className = "",
  readOnly = false,
}) {
  const [hovered, setHovered] = useState(0);
  const [average, setAverage] = useState(0);
  const [userHasRated, setUserHasRated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}/rate`);
        setAverage(res.data.averageRating ?? 0);
        setUserHasRated(res.data.userHasRated);
      } catch (err) {
        console.error("Error fetching rating:", err);
      }
    };

    fetchRating();
  }, [productId]);

  const handleRate = async (value) => {
    if (loading || userHasRated) return;
    try {
      setLoading(true);
      const res = await axios.post(`/api/products/${productId}/rate`, {
        value,
      });
      setAverage(Number(res.data.averageRating) || 0);
      setUserHasRated(true);
    } catch (err) {
      console.error(err);
      alert("You must be logged in to rate.");
    } finally {
      setLoading(false);
    }
  };

  const renderStar = (index) => {
    const effectiveRating = hovered || average;
    const rounded = Math.round(effectiveRating * 2) / 2;

    if (rounded >= index) {
      return (
        <FaStar
          key={index}
          className="text-yellow-500"
        />
      );
    } else if (rounded + 0.5 === index) {
      return (
        <FaStarHalfAlt
          key={index}
          className="text-yellow-500"
        />
      );
    } else {
      const clickable = !readOnly && !userHasRated;
      return (
        <FaRegStar
          key={index}
          className={` ${
            clickable ? "cursor-pointer hover:text-yellow-400" : "text-gray-300"
          }`}
          onMouseEnter={clickable ? () => setHovered(index) : undefined}
          onMouseLeave={clickable ? () => setHovered(0) : undefined}
          onClick={clickable ? () => handleRate(index) : undefined}
        />
      );
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => renderStar(i))}
      {/* <span className="text-gray-600 text-sm">
        ({average.toFixed(1)} / 5)
      </span> */}
      {!readOnly && userHasRated && (
        <span className="ml-2 text-green-600 text-xs">
          You’ve rated this product
        </span>
      )}
    </div>
  );
}
