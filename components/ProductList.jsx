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
    <div className = "form-background mt-[50px]">
      {/* <div>

        <ProductFilter /> 
      </div> */}
      <div className="gap-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto mt- p-4 max-w-[1350px]">
      
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-light rounded p-2"
        >
          <Link href={`/products/${product._id}`}>
            <div className=" w-[100%] h-64 p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

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
          </Link>

          <div className = "mt-1 mb-2">
            <Rating
              productId={product._id}
              readOnly={true}
            />
          </div>
          <div className = "w-full block  ">
            <AddToCartButton  className = "w-full block" product={product} />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
