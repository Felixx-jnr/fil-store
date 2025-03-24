import React, { useEffect, useState } from "react";
import { homeImages } from "../constants/homeCarousel";

import { easeInOut, motion } from "framer-motion";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const Description = ({ activeImage, clickNext, clickPrev }) => {
  const [showContent, setShowContent] = useState(true);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5, // Initial 1s delay
      },
    },
    fadeOut: {
      opacity: 0,
      transition: { duration: 1 },
    },
  };

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.4, // Initial 1s delay
        easeInOut,
      },
    },
    fadeOut: {
      opacity: 0,
      transition: { duration: 2 },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1, // Initial 1s delay
        easeInOut,
      },
    },
    fadeOut: {
      opacity: 0,
      transition: { duration: 10 },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.2, // Initial 1s delay
        easeInOut,
      },
    },
    fadeOut: {
      opacity: 0,
      transition: { duration: 2 },
    },
  };

  useEffect(() => {
    setShowContent(true); // Reset to show content on slide change
    const fadeOutTimer = setTimeout(() => {
      setShowContent(false);
    }, 9000); // Fade out after 9 seconds

    return () => clearTimeout(fadeOutTimer);
  }, [activeImage]);

  return (
    <div>
      {homeImages.map((item, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "home block w-full h-full md:px-20 px-10 text-left"
              : "hidden"
          }`}
        >
          <motion.div
            key={activeImage}
            variants={containerVariants}
            initial="hidden"
            animate={showContent ? "visible" : "fadeOut"}
            className="top-1/2 left-1/2 absolute w-[90%] md:w-[70%] lg:w-[60%] mid:w-[45%] text-white text-center -translate-x-1/2 -translate-y-1/2"
          >
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
              className={` font-poppins font-bold text-7xl ${item.titleStyle}`}
            >
              {item.title}
            </motion.p>

            <motion.h3
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className={` font-poppins text-2xl mx-auto mb-5 mt-3 md:mt-5 ${item.descStyle}`}
            >
              {item.desc}
            </motion.h3>

            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="bg-green-800 bg-secondary px-3 py-3 rounded-full font-poppins text-md tracking-wide"
            >
              Shop Now
            </motion.button>
          </motion.div>

          {/* BUTTONS */}
          <div className="max-md:hidden">
            <div
              className="top-1/2 left-10 absolute -translate-y-1/2 translate-x-1/2 cursor-pointer"
              onClick={clickPrev}
            >
              <FaArrowLeftLong className="bg-black/40 hover:bg-black p-2 rounded-full text-green-800 text-smokeWhite text-4xl transition-all duration-300" />
            </div>

            <div
              className="top-1/2 right-10 absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={clickNext}
            >
              <FaArrowRightLong className="bg-black/40 hover:bg-black p-2 rounded-full text-green-800 text-smokeWhite text-4xl transition-all duration-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Description;
