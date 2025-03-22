import React from "react";
import Image from "next/image";

const ProductSection = () => {
  return (
    <div>
      <div className="mt-20 ml-20 w-[40%] font-play font-semibold text-moss text-4xl">
        EXPLORE FIL TOP PRODUCTS BY CATEGORY
      </div>

      <div className="grid grid-cols-3 mx-auto">
        <div>
          <Image src="/EXTENSION.jpg" alt="" width={200} height={200} />
        </div>
        <div>
          <Image src="/Fan.jpg" alt="" width={200} height={200} />
        </div>
        <div>
          <Image src="/power.jpg" alt="" width={200} height={200} />
        </div>
        <div>
          <Image src="/projector-1.jpg" alt="" width={200} height={200} />
        </div>
        <div>
          <Image src="/Wearables.jpg" alt="" width={200} height={200} />
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
