// app/cart/page.jsx
"use client";

import { useState, useEffect } from "react";
import { formatAmount } from "lib/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/features/cartSlice";
import Link from "next/link";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Don't render anything until mounted

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value);
    if (qty >= 1) {
      dispatch(updateQuantity({ _id: id, quantity: qty }));
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex justify-center mt-[50px] p-10 form-background">
      <div className="bg-white shadow-2xl p-5 rounded-2xl w-[985%] xs:w-[80%] md:w-[600px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          YOUR CART
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          Review your items before proceeding to checkout.
        </p>

        {cartItems.length === 0 ? (
          <p className="mb-5 font-semibold text-filred text-xl xs:text-2xl text-center">
            Your cart is empty. Start adding items to your cart!
          </p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mt-2 pb-2 border-b"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded w-32 h-32 object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>

                    <div className="flex items-center my-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="bg-gren hover:bg-filgreen px-2 py-1 rounded-tl-xl rounded-bl-xl h-8 text-white"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            Math.max(1, Number(e.target.value))
                          )
                        }
                        className="border-t-2 border-t-gren border-b-2 border-b-gren outline-0 w-12 h-8 text-center"
                      />

                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        className="bg-gren hover:bg-filgreen px-2 py-1 rounded-tr-2xl rounded-br-2xl h-8 text-white"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold text-green text-lg">
                      {formatAmount(item.price)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="danger-btn"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-600 text-sm danger-btn"
              >
                Clear Cart
              </button>
              <div className="font-semibold text-xl">
                Total: {formatAmount(total)}
              </div>
              <Link
                href="/checkout"
                className="buttons"
              >
                {" "}
                Proceed
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
