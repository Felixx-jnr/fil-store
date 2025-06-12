"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";

const AddToCartButton = ({ product, className = "" }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-green-800 hover:bg-mustard px-2 xs:px-3 py-2 xs:py-3 font-poppins text-light hover:text-dark text-xs xs:text-sm w-full"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
