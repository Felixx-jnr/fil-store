"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/store/features/productSlice";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import AddToCartButton from "@/components/AddToCart";

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

  if (loading)
    return (
      <div className="mt-[50px] py-4">
        {" "}
        <Loading />{" "}
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="mt-[50px] py-5">
      <img
        src={product.image}
        alt={product.name}
        className="rounded w-full h-80 object-cover"
      />
      <h1 className="mt-4 font-bold text-2xl">{product.name}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-4 font-semibold text-xl">${product.price}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
