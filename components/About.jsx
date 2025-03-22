import React from "react";
import TextSlider from "./TextSlider";
import Image from "next/image";

const About = () => {
  return (
    <div className="mt-8">
      <div className="ml-20 w-[40%] font-play font-semibold text-moss text-4xl">
        THE WORLD'S BEST ELECTRONIC STORE*
      </div>

      <div className="">
        <TextSlider />
      </div>

      <div className="flex gap-4 mx-auto w-[80%]">
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
