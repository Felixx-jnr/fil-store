import React from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import ProductSection from "./../components/ProductSection";
import StickOne from "../components/StickOne";

const page = () => {
  return (
    <div className="bg-light h-[5000px] overflow-x-hidden">
      <Hero />
      <About />
      <ProductSection />
      {/* <StickOne /> */}
    </div>
  );
};

export default page;
