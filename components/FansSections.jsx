"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Felix Udoh",
    init: "Fu",
    rating: " ★★★★☆",
    productImg: "/pow.webp",
    productName: "Anker Prime Charger (250W, 6 Ports, GaNPrime)",
    comment:
      "I have taken enough with this item and its brilliant design to have ordered for every member of my family",
  },
  {
    name: "Felix Udoh",
    init: "Fu",
    rating: " ★★★★☆",
    productImg: "/pow.webp",
    productName: "Anker Prime Charger (250W, 6 Ports, GaNPrime)",
    comment:
      "I have taken enough with this item and its brilliant design to have ordered for every member of my family",
  },
  {
    name: "Felix Udoh",
    init: "Fu",
    rating: " ★★★★☆",
    productImg: "/pow.webp",
    productName: "Anker Prime Charger (250W, 6 Ports, GaNPrime)",
    comment:
      "I have taken enough with this item and its brilliant design to have ordered for every member of my family",
  },
  {
    name: "Felix Udoh",
    init: "Fu",
    rating: " ★★★★☆",
    productImg: "/pow.webp",
    productName: "Anker Prime Charger (250W, 6 Ports, GaNPrime)",
    comment:
      "I have taken enough with this item and its brilliant design to have ordered for every member of my family",
  },
  {
    name: "Felix Udoh",
    init: "Fu",
    rating: " ★★★★☆",
    productImg: "/pow.webp",
    productName: "Anker Prime Charger (250W, 6 Ports, GaNPrime)",
    comment:
      "I have taken enough with this item and its brilliant design to have ordered for every member of my family",
  },
];

const FansSection = () => {
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
          STRAIGHT FROM OUR FANS
        </h2>
      </div>

      <div className="mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
        <div className="inline-flex gap-4 px-10">
          {reviews.map((review, index) => (
            // PRODUCT CARDS
            <div key={index}>
              <div className="relative flex flex-col justify-between bg-gray-300 shadow-sm py-2 w-[250px] md:w-[350px]">
                <div className="flex items-center gap-4 px-2">
                  <div className="flex justify-center items-center bg-moss rounded-full w-15 h-15 text-white">
                    {review.init}
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p>{review.rating}</p>
                  </div>
                </div>

                <p className="px-4 pt-8 pb-10 text-wrap">{review.comment}</p>

                <div className="flex items-center gap-1 mx-2 pt-2 border-gray-600 border-t">
                  <div>
                    <Image
                      width={50}
                      height={60}
                      src={review.productImg}
                      alt={review.productName}
                    />
                  </div>
                  <p className="text-moss text-sm text-wrap">
                    {" "}
                    {review.productName}{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FansSection;
