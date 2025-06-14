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
import { MdOutlineDelete } from "react-icons/md";

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
    <div className="flex justify-center mt-[50px] py-10 form-background">
      <div className="bg-white shadow-2xl xs:p-5 px-2 py-5 rounded-2xl w-[95%] sm:w-[85%] md:w-[700px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          YOUR CART
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          Review your items before proceeding to checkout.
        </p>

        {cartItems.length === 0 ? (
          <p className="mb-5 text-filred text-xl xs:text-2xl text-center f==">
            Your cart is empty. Start adding items to your cart{" "}
            <Link
              className="font-semiblod text-gren hover:underline"
              href="/products"
            >
              {" "}
              Here!{" "}
            </Link>
          </p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mt-2 pb-2 border-b"
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded w-24 sm:w-32 h-24 sm:h-32 object-cover"
                  />
                  <div>
                    <h2 className="text-sm sm:text-xl">{item.name}</h2>
                    <p className="my-1 text-gren text-xs sm:text-lg">
                      {formatAmount(item.price)}
                    </p>

                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="bg-gren hover:bg-filgreen px-1 py-1 rounded-tl-2xl rounded-bl-2xl h-5 sm:h-8 text-white text-xs sm:text-base"
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
                        className="border-t border-t-gren border-b border-b-gren outline-0 w-5 h-5 sm:h-8 text-center no-spinner"
                      />

                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        className="bg-gren hover:bg-filgreen px-1 py-1 rounded-tr-2xl rounded-br-2xl h-5 sm:h-8 text-white text-xs sm:text-base"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700 text-2xl"
                >
                  <MdOutlineDelete />
                </button>
              </div>
            ))}

            <button
              onClick={() => dispatch(clearCart())}
              className="mt-2 text-red-600 hover:text-red-700 text-sm hover:underline"
            >
              Clear Cart
            </button>

            <div className="flex justify-between items-center mt-2">
              <div className="font-bold text-gren text-xl">
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
