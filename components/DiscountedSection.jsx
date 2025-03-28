"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
];

const DiscountedSection = () => {
  return (
    <section className="bg-fixed mt-16 pb-10 home-stick">
      <div className="px-6 pt-5 pb-10">
        <h2 className="font-poppins text-mustard text-4xl md:text-5xl tracking-tighter">
          DISCOUNTED FIL PRODUCTS
        </h2>
        <p className="text-light">Get the best products at the best prices</p>
      </div>

      <div className="mx-auto w-[1300px] overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
        <div className="inline-flex gap-4">
          {products.map((product, index) => (
            // PRODUCT CARDS
            <motion.div
              key={index}
              initial="initial"
              whileHover="hover"
              className="relative flex flex-col justify-between bg-dark shadow-lg px-4 w-[350px] h-[400px]"
            >
              {/* PRODUCT IMAGE */}
              <motion.div
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.1 },
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="self-center"
              >
                <Image
                  src={product.img}
                  alt="Chargers"
                  width={200}
                  height={200}
                  className="mt-4 object-contain"
                />
              </motion.div>

              <p className="top-0 left-0 absolute bg-mustard p-1 font-poppins font-semibold text-moss text-xs skew-1">
                40% Off
              </p>

              {/* PRODUCT DETAILS */}
              <motion.div
                variants={{
                  initial: { y: 0 },
                  hover: { y: -20 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className=""
              >
                <p className="font-archivo text-mustard text-sm"> HOT</p>
                <h3 className="font-archivo text-light text-xl text-wrap tracking-wide">
                  Anker Prime Charger (250W, 6 Ports, GaNPrime)
                </h3>
                <p className="py- font-poppins text-gray-400 text-sm">
                  250W High-Efficiency Charger
                </p>
                <span className="flex gap-3 mb-2 py-1">
                  <p className="font-poppins text-gray-400 line-through">$30</p>{" "}
                  <p className="font-poppins text-light">$18</p>
                </span>

                <motion.button
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-green-800 hover:bg-mustard px-3 py-3 font-poppins text-light hover:text-dark text-xs xs:text-sm"
                >
                  Shop Now
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountedSection;
