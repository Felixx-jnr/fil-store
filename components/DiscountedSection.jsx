"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { original } from "@reduxjs/toolkit";

const products = [
  {
    name: "Power Banks",
    img: "/pow.webp",
    price: "13000",
    originalPrice: "20000",
    desc: "250W High-Efficiency Charger",
  },
  {
    name: "Wireless Earbuds",
    img: "/charger.webp",
    price: "9000",
    originalPrice: "12000",
    desc: "Best Sound Quality",
  },
  {
    name: "PlayerStations",
    img: "/exte.webp",
    price: "26000",
    originalPrice: "30000",
    desc: "High-Performance Gaming Console",
  },
  {
    name: "Game Controllers",
    img: "/pow.webp",
    price: "30000",
    originalPrice: "35000",
    desc: "Ergonomic Design for Comfort",
  },
];

const DiscountedSection = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
          {products.map((product, index) => (
            // PRODUCT CARDS
            <div key={index}>
              <ProductCard
                productName={product.name}
                productImage={product.img}
                originalPrice={product.originalPrice}
                productPrice={product.price}
                productDesc={product.desc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountedSection;
