"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatAmount } from "@/lib/utils";
import AddToCartButton from "./AddToCart";

const ProductCard = ({
  productName,
  productImage,
  productPrice,
  productDesc,
}) => {
  const [hasMouse, setHasMouse] = useState(true);

  useEffect(() => {
    // Detects if the device has a fine pointer (mouse-like)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasMouse(mediaQuery.matches);

    const handleChange = (e) => setHasMouse(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const imageVariants = hasMouse
    ? { initial: { scale: 1 }, hover: { scale: 1.1 } }
    : {};

  const detailsVariants = hasMouse
    ? { initial: { y: 0 }, hover: { y: -20 } }
    : {};

  const buttonVariants = hasMouse
    ? { initial: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } }
    : {};

  return (
    <motion.div
      initial="initial"
      whileHover={hasMouse ? "hover" : undefined}
      className="relative flex flex-col justify-between bg-dark shadow-lg px-4 w-[250px] md:w-[350px] h-[400px]"
    >
      {/* PRODUCT IMAGE */}
      <motion.div
        variants={imageVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="self-center"
      >
        <Image
          src={productImage}
          alt={productName}
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
        variants={detailsVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="my-4 max-lg:mb-4"
      >
        <p className="text-mustard text-sm">HOT</p>

        <h3 className="text-light text-xl text-wrap tracking-wide">
          {productName}
        </h3>
        <p className="py-1 font-poppins text-mustard text-sm text-wrap">
          {productDesc}
        </p>
        <span className="flex gap-3 mb-2 py-1">
          <p className="font-poppins text-gray-400 line-through">$30</p>
          <p className="font-poppins text-light">
            {formatAmount(productPrice)}
          </p>
        </span>

        {/* <motion.div
          variants={buttonVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AddToCartButton productName={productName} />
        </motion.div> */}

        <AddToCartButton productName={productName} />
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
