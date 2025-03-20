import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TextSlider from "./../components/TextSlider";

const page = () => {
  return (
    <div className=" bg-gray-200 h-[3000px] ">
      <Navbar />
      <Hero />
      <TextSlider />
    </div>
  );
};

export default page;
