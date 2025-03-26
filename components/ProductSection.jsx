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
      <div className="mt-20 ml-20 w-[40%] font-play font-semibold text-moss text-4xl">
        EXPLORE FIL TOP PRODUCTS BY CATEGORY
      </div>

      {/* <div className="justify-center gap-4 grid grid-cols-5 grid-rows-[200px_200px_200px] mx-20 mt-10">
        <div className="row-span-2 bg-amber-100">
          <div>
            <Image
              src="/charger.webp"
              alt=""
              height={200}
              width={200}
              className="object-cover"
            />
          </div>
        </div>

        {products.map((product, index) => (
          <div
            key={index}
            className="row-span-[1.5] bg-amber-100"
          >
            <div className="w-[60%] h-[60%]">
              <Image
                src={product.img}
                alt=""
                width={100}
                height={100}
                className="bg-amber-200 w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div> */}

      <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto w-[80%]">
        {/* Power Banks */}
        <div className="flex flex-col items-center row-span-2 bg-gray-100 p-4 rounded-lg text-center">
          <Image
            src="/charger.webp"
            alt="Power Banks"
            width={200}
            height={200}
            className="object-contain"
          />
          {/* <div>
            <h3 className="mt-2 font-semibold">Power Banks</h3>
            <p className="text-gray-500 text-sm">35 Products</p>
          </div> */}
        </div>

        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-100 px-4 rounded-lg"
          >
            <div>
              <h3 className="mt-2 font-semibold">Chargers</h3>
              <p className="text-gray-500 text-sm">33 Products</p>
            </div>
            <Image
              src={product.img}
              alt="Chargers"
              width={100}
              height={100}
              className="self-end object-contain"
            />
            <div>
              {/* <h3 className="mt-2 font-semibold">Chargers</h3>
              <p className="text-gray-500 text-sm">33 Products</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
