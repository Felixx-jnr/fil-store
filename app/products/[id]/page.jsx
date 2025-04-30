"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/store/features/productSlice";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { id } = useParams(); // fetches dynamic segment like /products/:id
  const dispatch = useDispatch();
  const {
    single: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6">
      <img
        src={product.image}
        alt={product.name}
        className="rounded w-full h-80 object-cover"
      />
      <h1 className="mt-4 font-bold text-2xl">{product.name}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-4 font-semibold text-xl">${product.price}</p>
    </div>
  );
}
