"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { formatAmount } from "@/lib/utils";

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

const MustHaveSection = () => {
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
    <section className="mt-16 pb-10">
      <div className="px-6 pt-5 pb-8">
        <h2 className="text-dark text-4xl md:text-5xl tracking-tighter">
          MUST HAVE FIL SELECTION
        </h2>
      </div>

      <div className="mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
        <div className="inline-flex gap-4 px-10">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              productName={product.name}
              productImage={product.img}
              originalPrice={product.originalPrice}
              productPrice={product.price}
              productDesc={product.desc}
              className="bg-gray-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MustHaveSection;
