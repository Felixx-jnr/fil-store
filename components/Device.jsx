"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const devs = [
  {
    img: "/FIL Rebrand new_page-0001.jpg",
    title: "Workspace Power",
    desc: "Power Your Productivity Right at Your Desk",
  },
  {
    img: "/FIL Rebrand new_page-0002.jpg",
    title: "Workspace Power",
    desc: "Power Your Productivity Right at Your Desk",
  },
  {
    img: "/FIL Rebrand new_page-0009.jpg",
    title: "Workspace Power",
    desc: "Power Your Productivity Right at Your Desk",
  },
  {
    img: "/FIL Rebrand new_page-0013.jpg",
    title: "Workspace Power",
    desc: "Power Your Productivity Right at Your Desk",
  },
];

const Device = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 800);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="mx-5 sm:mx-10 md:mx-20 my-8 w-[80%] sm:w-[60%] lg:w-[40%] font-play font-semibold text-moss text-2xl sm:text-3xl md:text-4xl">
        DEVICE FOR EVERY MOMENT
      </h2>

      <div>
        {isLargeScreen && (
          <div className="justify-center items-center gap-2 grid grid-cols-2 mx-auto w-[95%] lg:w-[85%]">
            {devs.map((dev, index) => (
              <motion.div
                initial="initial"
                whileHover="hover"
                className="relative"
                key={index}
              >
                <div className="overflow-hidden">
                  <motion.div
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.1 },
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Image
                      src={dev.img}
                      alt=""
                      width={1920}
                      height={1080}
                    />
                  </motion.div>
                </div>

                <div className="bottom-0 left-0 absolute px-2 py-2 text-light">
                  <h3 className="font-archivo font-semibold text-3xl">
                    {dev.title}
                  </h3>
                  <p className="font-poppins">{dev.desc}</p>
                  <button className="buttons">Learn More</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLargeScreen && (
          <div className="px-4 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
            {devs.map((dev, index) => (
              <div
                className="inline-flex relative px-1"
                key={index}
              >
                <div className="">
                  <Image
                    src={dev.img}
                    alt=""
                    width={600}
                    height={800}
                    className="w-full"
                  />
                </div>
                <div className="bottom-0 left-0 absolute px-3 py-1 text-light">
                  <h3 className="font-archivo font-semibold text-xl sm:text-3xl">
                    {dev.title}
                  </h3>
                  <p className="font-poppins max-sm:text-xs max-sm:tracking-tighter">
                    {dev.desc}
                  </p>
                  <button className="buttons">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Device;
