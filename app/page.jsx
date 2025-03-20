import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";

const page = () => {
  return (
    <div className=" bg-gray-200 h-[3000px] overflow-x-hidden ">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
};

export default page;
