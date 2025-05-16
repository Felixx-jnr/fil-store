"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/features/productSlice";
import Link from "next/link";
import Loading from "@/components/Loading";
import AddToCartButton from "@/components/AddToCart";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="mt-[50px]">
        <Loading />
      </div>
    );

  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mt-[50px] p-4 form-bacground">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-[#188672]/40 shadow-2xl backdrop-blur-2xl p-4 rounded"
        >
          <Link href={`/products/${product._id}`}>
            <div>
              <img
                src={product.image}
                alt={product.name}
                
              />
            </div>

            <h3 className="text-light text-xl text-wrap tracking-wide">
              {product.name}
            </h3>
            <p className="py-1 font-poppins text-mustard text-sm text-wrap">
              {product.description}
            </p>
            <span className="flex gap-3 mb-2 py-1">
              <p className="font-poppins text-gray-400 line-through"> $18</p>{" "}
              <p className="font-poppins text-light">{product.price}</p>
            </span>
            
          </Link>
          <AddToCartButton product={product} />
        </div>
      ))}
    </div>
  );
}
