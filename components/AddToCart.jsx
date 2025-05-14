"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";

const AddToCartButton = ({ product }) => {
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
      className="bg-gren hover:bg-gren-dark px-4 py-2 rounded font-bold text-white"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
