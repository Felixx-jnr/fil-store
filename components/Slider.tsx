"use client";

import { useEffect, useState } from "react";
import { homeImages } from "../constants/homeCarousel";
import Description from "./Description";
import { motion } from "framer-motion";

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    setActiveImage((prev) => (prev === homeImages.length - 1 ? 0 : prev + 1));
  };

  const clickPrev = () => {
    setActiveImage((prev) => (prev === 0 ? homeImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 10000); // Change every 10 seconds
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);

  return (
    <main className="relative overflow-hidden">
      <div className=" w-full h-[656px] ">
        {homeImages.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: idx === activeImage ? 1 : 0,
            }}
            transition={{
              duration: 1, // Adjust for smoothness
              ease: "easeOut",
            }}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <motion.img
              key={activeImage}
              src={item.src}
              alt=""
              width={400}
              height={400}
              className="w-full h-full object-cover overflow-hidden"
              initial={{ scale: 1 }} // Start at normal scale
              animate={idx === activeImage ? { scale: 1.1 } : {}} // Only scale the active image
              transition={{
                duration: 30,
              }}
            ></motion.img>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full">
        <Description
          activeImage={activeImage}
          clickNext={clickNext}
          clickPrev={clickPrev}
        />
      </div>
    </main>
  );
};

export default Slider;
