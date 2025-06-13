"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setMessage({ text: "Please select a star rating.", type: "error" });
      return;
    }

    try {
      await axios.post("/api/feedback", { rating, comment });
      setMessage({
        text: "Thank you for your anonymous feedback!",
        type: "success",
      });
      setRating(0);
      setHover(0);
      setComment("");
      router.push("/profile/orders");
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Failed to send feedback. Try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center mt-[50px] py-5 form-background">
      <div className="bg-white shadow-2xl p-3 rounded-2xl w-[95%] sm:w-[85%] md:w-[700px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          RATE YOUR EXPERIENCE
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          Your feedback is important to us! Please rate your experience and
          leave a comment if you wish.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4"
        >
          <h3 className="font-semibold text-lg text-center">
            {" "}
            How was your experience shopping with us?{" "}
          </h3>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={i}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                className={`text-4xl text-center cursor-pointer ${
                  (hover || rating) >= i ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <div>
            <label
              className="font-semibold"
              htmlFor="comment"
            >
              Comment
            </label>

            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment (optional)"
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
          </div>
          <button
            type="submit"
            className="buttons"
          >
            Submit Feedback
          </button>
          {message.text && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
