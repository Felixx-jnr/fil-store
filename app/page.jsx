import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Link from "next/link";
import ProductSection from "./../components/ProductSection";

const page = () => {
  return (
    <div className="bg-light h-[3000px] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <ProductSection />
    </div>
  );
};

export default page;
