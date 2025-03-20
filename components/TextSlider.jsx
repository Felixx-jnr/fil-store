import React from "react";

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
    <div className="mt-20 ">
      <div className="mx-5"></div>

      <div className="reviews relative flex mt-2 mb-14 ">
        <div className="reviews-slide flex py-4">
          {sliderText.map((slide, index) => {
            return (
              <div key={index} className=" mx-2 px-2 py-4 w-64 flex flex-col ">
                <p className=" text-smokeWhite font-semibold text-xl">
                  {slide.title}
                </p>
                <p className="  ">{slide.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
