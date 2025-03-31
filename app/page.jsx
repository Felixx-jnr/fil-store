import React from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import ProductSection from "./../components/ProductSection";
import DiscountedSection from "../components/DiscountedSection";
import Device from "../components/Device";

const page = () => {
  return (
    <div className="bg-light h-[5000px] overflow-x-hidden">
      <Hero />
      <About />
      <ProductSection />
      <DiscountedSection />
      <Device />
    </div>
  );
};

export default page;
