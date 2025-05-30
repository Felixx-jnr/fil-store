"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const DiscountedSection = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const res = await fetch("/api/products/"); // Replace with your actual backend URL
        const data = await res.json();

        // Filter products where isDiscounted is true
        const discounted = data.filter((product) => product.isDiscounted);
        setDiscountedProducts(discounted);
      } catch (error) {
        console.error("Failed to fetch discounted products:", error);
      }
    };

    fetchDiscountedProducts();
  }, []);

  return (
    <section className="bg-fixed mt-16 pb-10 home-stick">
      <div className="px-6 pt-5 pb-8">
        <h2 className="font-semibold text-light text-4xl md:text-5xl">
          DISCOUNTED PRODUCTS
        </h2>
        <p className="text-mustard">Get the best products at the best prices</p>
      </div>

      <div className="mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
        <div className="inline-flex gap-4 px-10">
          {discountedProducts.map((product, index) => (
            
            <ProductCard
              key={index}
              product={product}
              productName={product.name}
              productImage={product.image}
              originalPrice={product.originalPrice}
              productPrice={product.price}
              productDesc={product.description}
              className="bg-dark"
            />
           
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountedSection;
