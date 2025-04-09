<div className="relative flex flex-col justify-between bg-gray-300 shadow-lg px-4 w-[250px] md:w-[350px] h-[400px]">
  {/* PRODUCT IMAGE */}
  <div className="self-center">
    <Image
      src={product.img}
      alt="Chargers"
      width={170}
      height={170}
      className="mt-4 object-contain"
    />
  </div>

  <p className="top-0 left-0 absolute bg-mustard p-1 font-poppins font-semibold text-moss text-xs">
    40% Off
  </p>

  {/* PRODUCT DETAILS */}
  <div className="max-lg:mb-4">
    <h3 className="font-archivo text-dark text-xl text-wrap tracking-wide">
      Anker Prime Charger (250W, 6 Ports, GaNPrime)
    </h3>
    <p className="py-1 font-poppins text-gren text-sm text-wrap">
      250W High-Efficiency Charger
    </p>
    <span className="flex gap-3 mb-2 py-1">
      <p className="font-poppins text-gray-500 line-through">$30</p>{" "}
      <p className="font-poppins text-dark">$18</p>
    </span>
  </div>
</div>;
