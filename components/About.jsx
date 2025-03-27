import React from "react";
import TextSlider from "./TextSlider";
import Image from "next/image";

const About = () => {
  return (
    <div className="mt-8">
      <h2 className="mx-5 sm:mx-10 md:mx-20 w-[80%] sm:w-[60%] lg:w-[40%] font-play font-semibold text-moss text-2xl sm:text-3xl md:text-4xl">
        THE WORLD'S BEST ELECTRONIC STORE*
      </h2>

      <TextSlider />

      <div className="flex max-sm:flex-col gap-4 mx-auto w-[90%] sm:w-[85%] md:w-[80%]">
        <div>
          <Image
            src="/photo_2025-03-21_15-47-29.jpg"
            alt=""
            width={1080}
            height={1080}
          />
        </div>
        <div>
          <Image
            src="/photo_2025-03-21_15-47-43.jpg"
            alt=""
            width={1080}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
