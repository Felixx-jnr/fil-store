// app/cart/page.jsx
"use client";

import {useState, useEffect} from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/features/cartSlice";

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
    <div className="mx-auto p-4 max-w-4xl">
      <h1 className="mb-4 font-bold text-2xl">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4 pb-2 border-b"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded w-20 h-20 object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500 text-sm">${item.price}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, e.target.value)
                    }
                    className="mt-1 px-2 py-1 border w-16"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => dispatch(clearCart())}
              className="text-red-600 text-sm hover:underline"
            >
              Clear Cart
            </button>
            <div className="font-semibold text-lg">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
