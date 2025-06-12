"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import { getProduct } from "@/store/features/productSlice";
import AddToCartButton from "@/components/AddToCart";
import Loading from "@/components/Loading";
import Rating from "@/components/Rating";
import { formatAmount } from "@/lib/utils";

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
    <div className="mx-auto mt-[50px] px-10 pt-5">
      <div className="place-items-center grid grid-cols-[0.4fr_0.6fr]">
        <div className="mx-auto w-[100%] h-80">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center mx-auto w-[100%]">
          <h3 className="font-medium text-dark text-xl text-wrap">
            {product.name}
          </h3>
          <p className="mb-1 font-poppins text-gren text-sm text-wrap">
            {product.category}
          </p>
          <span className="flex gap-3">
            <p className="font-poppins text-gray-400 line-through"> $18</p>{" "}
            <p className="font-poppins font-medium text-dark">
              {formatAmount(product.price)}
            </p>
          </span>

          <div className="mt-1 mb-2">
            <Rating productId={product._id} />
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      <h3 className="mt-8 mb-1 font-semibold text-lg">PRODUCT DESCRIPTION</h3>
      <p>
        {" "}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos
        rerum velit ducimus facere natus! Incidunt est repudiandae laboriosam
        qui, expedita nemo. Incidunt facilis animi sunt illum quod minus quam
        tempora quaerat earum, saepe et. Doloremque nulla delectus commodi
        maiores velit iste ullam nisi numquam incidunt? Minima, impedit vel
        quaerat eligendi ex quod minus molestias sed aliquid temporibus animi
        dolorem optio qui ipsam natus quo voluptatem voluptatibus. Cumque
        molestiae blanditiis aliquid natus dolorum, expedita iste reiciendis
        architecto neque veritatis eos doloremque inventore quam quos quae fuga
        praesentium vero ut at debitis vitae. Dignissimos tenetur excepturi
        laudantium explicabo itaque quo accusamus. Neque quibusdam est illum
        reiciendis cupiditate velit qui assumenda nemo in voluptate vitae
        architecto repellendus eligendi sapiente laudantium veniam earum dolorum
        porro, repellat nostrum hic rerum error! Illo maiores vero eaque ratione
        qui, illum dolorem atque non sit quam cupiditate, nesciunt pariatur
        saepe officiis esse autem quidem, harum nisi magni dolores!{" "}
      </p>

      {/* Comments Section */}
      <div className="mt-8 w-[85%] mx-auto">
        <h2 className="font-bold text-xl">Comments</h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="py-3 border-b"
            >
              <p className="font-semibold">
                {comment.user && typeof comment.user === "object"
                  ? comment.user.username || comment.user.name || "User"
                  : "User"}
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
