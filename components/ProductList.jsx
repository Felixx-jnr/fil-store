"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/features/productSlice";
import Link from "next/link";
import Loading from "@/components/Loading";
import ProductFilter from "@/components/ProductFilter";
import { formatAmount } from "lib/utils";
import AddToCartButton from "@/components/AddToCart";
import Rating from "@/components/Rating";

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
    <div className="flex justify-center mt-[50px] px-1 sm:px-10 py-5 form-background">
      <div className="bg-white shadow-2xl px-3 py-5 rounded-2xl w-[98%]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          SHOP
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          Get All Our Products Here
        </p>

        <div className="gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto p-1 s:p-2 max-w-[1350px]">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-light p-2 rounded"
            >
              <Link href={`/products/${product._id}`}>
                <div className="p-2 w-[100%] h-32">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="font-medium text-dark text-sm s:text-lg line-clamp-1">
                  {product.name}
                </h3>

                <p className="font-medium text-gren text-xs text-wrap">
                  {product.category}
                </p>
                <span className="flex gap-3">
                  <p className="text-gray-500 text-xs s:text-sm line-through">
                    {" "}
                    {formatAmount(18)}{" "}
                  </p>{" "}
                  <p className="font-medium text-dark text-xs s:text-sm">
                    {formatAmount(product.price)}
                  </p>
                </span>
              </Link>

              <div className="mb-2">
                <Rating
                  productId={product._id}
                  readOnly={true}
                  className="text-sm sm:text-lg"
                />
              </div>

              <div className="">
                <AddToCartButton
                  className="w-full"
                  product={product}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
