"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setMessage({ text: "Please select a star rating.", type: "error" });
      return;
    }

    try {
      await axios.post("/api/feedback", { rating, comment });
      setMessage({ text: "Thank you for your anonymous feedback!", type: "success" });
      setRating(0);
      setHover(0);
      setComment("");
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to send feedback. Try again.", type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">
      <h3 className="text-lg font-bold">Rate Your Experience</h3>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar
            key={i}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className={`text-2xl cursor-pointer ${
              (hover || rating) >= i ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment (optional)"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Feedback
      </button>
      {message.text && (
        <p className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}
