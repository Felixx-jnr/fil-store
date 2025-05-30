import React from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import ProductSection from "./../components/ProductSection";
import DiscountedSection from "../components/DiscountedSection";
import Device from "../components/Device";
import MustHaveSection from "./../components/MustHaveSection";
import { ImageCarousel } from "./../components/ImageCarousel";
import MemberSection from "./../components/MemberSection";
import FansSection from "./../components/FansSections";

const page = () => {
  return (
    <div className="bg-light overflow-x-hidden">
      <Hero />
      <About />
      <ProductSection />
      <DiscountedSection />
      <Device />
      <MustHaveSection />
      <ImageCarousel />
      {/* <MemberSection /> */}
      <FansSection />
    </div>
  );
};

export default page;
