"use client";

import React, { useEffect, useState } from "react";
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

const MemberSection = () => {
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
    <section className="bg-fixed mt-16 py-10 home-stick">
      <div className="px-6 py-10">
        <h2 className="text-light text-4xl md:text-5xl tracking-tighter">
          Become a Member Today
        </h2>
        <p className="py-4 text-mustard tracking-wider">
          Gain early access to new products, exclusive deals, and opportunities
          to try our products for free.
        </p>
        <div className="flex gap-6 pb-10">
          <button className="hover:bg-mustard px-1 xs:px-3 py-1 xs:py-3 border-2 border-green-800 hover:border-mustard font-poppins text-light hover:text-dark text-xs xs:text-sm">
            Login
          </button>
          <button className="buttons">Join Now</button>
        </div>
      </div>

      <div className="mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
        <div className="inline-flex gap-4 px-10">
          {products.map((product, index) => (
            // PRODUCT CARDS
            <div key={index}>
              {isLargeScreen && (
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  className="relative flex flex-col justify-between bg-dark shadow-lg px-4 w-[250px] md:w-[350px] h-[400px]"
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
                      width={170}
                      height={170}
                      className="mt-4 object-contain"
                    />
                  </motion.div>

                  <p className="top-0 left-0 absolute bg-mustard p-1 font-poppins font-semibold text-moss text-xs">
                    40% Off
                  </p>

                  {/* PRODUCT DETAILS */}
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -20 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="max-lg:mb-4"
                  >
                    <p className="text-mustard text-sm"> HOT</p>

                    <h3 className="text-light text-xl text-wrap tracking-wide">
                      Anker Prime Charger (250W, 6 Ports, GaNPrime)
                    </h3>
                    <p className="py-1 font-poppins text-mustard text-sm text-wrap">
                      250W High-Efficiency Charger
                    </p>
                    <span className="flex gap-3 mb-2 py-1">
                      <p className="font-poppins text-gray-400 line-through">
                        $30
                      </p>{" "}
                      <p className="font-poppins text-light">$18</p>
                    </span>

                    <motion.button
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="buttons"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {!isLargeScreen && (
                <motion.a
                  href="/"
                  initial="initial"
                  whileHover="hover"
                  className="relative flex flex-col justify-between bg-dark shadow-lg px-4 w-[250px] md:w-[300px] h-[350px]"
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
                      width={170}
                      height={170}
                      className="mt-4 object-contain"
                    />
                  </motion.div>

                  <p className="top-0 left-0 absolute bg-mustard p-1 font-poppins font-semibold text-moss text-xs">
                    40% Off
                  </p>

                  {/* PRODUCT DETAILS */}
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -20 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="max-lg:mb-4"
                  >
                    <p className="text-mustard text-sm"> HOT</p>
                    <h3 className="text-light text-xl text-wrap tracking-wide">
                      Anker Prime Charger (250W, 6 Ports, GaNPrime)
                    </h3>
                    <p className="py-1 font-poppins text-mustard text-sm text-wrap">
                      250W High-Efficiency Charger
                    </p>
                    <span className="flex gap-3 mb-2 py-1">
                      <p className="font-poppins text-gray-400 line-through">
                        $30
                      </p>{" "}
                      <p className="font-poppins text-light">$18</p>
                    </span>
                  </motion.div>
                </motion.a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberSection;
