import React from "react";
import "../styles/textslider.css";

const sliderText = [
  {
    title: "12 Years of Innovation",
    text: "Pioneering in Charging Technology for 12 Years",
  },
  {
    title: "100 Million",
    text: "100 Million Global Customers",
  },
  {
    title: "146 Countries",
    text: "Available in 146 Countries",
  },
  {
    title: "46%",
    text: "47% R&D Employees",
  },
  {
    title: " 200+ Million",
    text: "Over 200 Million Products Sold Worldwide",
  },
];

const TextSlider = () => {
  return (
    <div className="mt-20">
      <div className="mx-5"></div>

      <div className="relative flex mt-2 mb-14 reviews">
        <div className="flex py-4 reviews-slide">
          {sliderText.map((slide, index) => {
            return (
              <div
                key={index}
                className="flex flex-col mx-2 my-button px-2 py-4 w-64 font-"
              >
                <p className="font-play font-semibold text-greenish text-xl">
                  {slide.title}
                </p>
                <p className="">{slide.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
