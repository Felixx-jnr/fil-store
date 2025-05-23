"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import { getProduct } from "@/store/features/productSlice";
import AddToCartButton from "@/components/AddToCart";
import Loading from "@/components/Loading";
import Rating from "@/components/Rating";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    single: product,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch product
  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [dispatch, id]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/products/${id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    if (id) fetchComments();
  }, [id]);

  // Handle comment submission
  const handleSubmitComment = async (e) => {
  e.preventDefault();
  if (!commentText.trim()) return;

  try {
    setSubmitting(true);
    const res = await axios.post(`/api/products/${id}/comments`, {
      text: commentText,
    });

    // Inject full user info manually (so UI doesn’t need to wait for refresh)
    const fullComment = {
      ...res.data,
      user: {
        _id: user._id,
        username: user.username, // or use user.name
      },
    };

    setComments((prev) => [...prev, fullComment]);
    setCommentText("");
  } catch (err) {
    console.error(err);
    alert("Failed to post comment. Please log in.");
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return (
      <div className="mt-[50px] py-4">
        <Loading />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="mx-auto mt-[50px] px-4 py-5 max-w-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="rounded w-full h-80 object-cover"
      />
      <h1 className="mt-4 font-bold text-2xl">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-4 font-semibold text-xl">${product.price}</p>
      <AddToCartButton product={product} />

      <Rating
        productId={product._id}
       
      />

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="mb-3 font-bold text-xl">Comments</h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="py-3 border-b"
            >
              <p className="font-semibold">
                {comment.user?.username || comment.user?.name || comment.user || "Anonymous"}
              </p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-gray-400 text-xs">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}

        {user ? (
          <form
            onSubmit={handleSubmitComment}
            className="mt-4"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              placeholder="Write a comment..."
              className="p-2 border rounded w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 mt-2 px-4 py-2 rounded text-white"
              disabled={submitting}
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        ) : (
          <p className="mt-4 text-gray-600 text-sm">
            <a
              href="/login"
              className="text-blue-500 underline"
            >
              Log in
            </a>{" "}
            or{" "}
            <a
              href="/register"
              className="text-blue-500 underline"
            >
              register
            </a>{" "}
            to post a comment.
          </p>
        )}
      </div>
    </div>
  );
}
