import React from "react";
import Image from "next/image";

const products = [
  {
    name: "Power Banks",
    img: "/exte.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/charger.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/exte.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/pow.webp",
    amount: "35 Products",
  },
  {
    name: "Power Banks",
    img: "/charger.webp",
    amount: "35 Products",
  },
];

const ProductSection = () => {
  return (
    <div>
      <div className="mx-5 sm:mx-10 md:mx-20 my-10 w-[90%] sm:w-[60%] lg:w-[40%] font-play font-semibold text-moss text-2xl sm:text-3xl md:text-4xl">
        EXPLORE FIL TOP PRODUCTS BY CATEGORY
      </div>

      <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mx-auto px-4 w-[90%] sm:w-[600px] md:w-[750px] lg:w-[1000px]">
        {/* Power Banks */}
        <div className="flex flex-col justify-center gap-6 row-span-2 max-sm:row-span-1 bg-gray-100 px-4 rounded-lg">
          <div className="self-start">
            <h3 className="mt-2 font-semibold">Power Banks</h3>
            <p className="text-gray-500 text-sm">35 Products</p>
          </div>
          <img
            src="/charger.webp"
            alt="Power Banks"
            className="self-end sm:self-center w-[100px] sm:w-[250px] h-[100px] sm:h-[200px] object-contain"
          />
        </div>

        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-100 px-4 rounded-lg"
          >
            <div>
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.amount}</p>
            </div>
            <Image
              src={product.img}
              alt="Chargers"
              width={100}
              height={100}
              className="self-end object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
