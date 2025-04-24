"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/features/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-4 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="shadow p-4 border rounded"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
          <h2 className="font-bold text-lg">{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
