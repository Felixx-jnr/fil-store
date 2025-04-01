"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const devs = [
  {
    img: "/FIL Rebrand new_page-0001.jpg",
    title: "Workspace Power",
    desc: "Power Your Productivity Right at Your Desk",
  },
  {
    img: "/FIL Rebrand new_page-0002.jpg",
    title: "Workspace Power",
    desc: "Powe Your Productivity Right at Your Desk",
  },
  {
    img: "/FIL Rebrand new_page-0009.jpg",
    title: "Workspace Power",
    desc: "Powe Your Productivity Right at Your Desk",
  },
  {
    img: "/FIL Rebrand new_page-0013.jpg",
    title: "Workspace Power",
    desc: "Powe Your Productivity Right at Your Desk",
  },
];

const Device = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 600);
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

      {/* {isLargeScreen && (
        <div className="justify-center items-center gap-4 grid grid-cols-2 mx-auto w-[90%] lg:w-[85%]">
          {devs.map((dev, index) => (
            <div key={index}>
              <Image
                src={dev.img}
                alt=""
                width={1920}
                height={1080}
              />
            </div>
          ))}
        </div>
      )} */}

      {!isLargeScreen && (
        <div className="mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          {devs.map((dev, index) => (
            <div
              className="inline-flex gap-4 px-[6px]"
              key={index}
            >
              <Image
                src={dev.img}
                alt=""
                width={600}
                height={800}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Device;
