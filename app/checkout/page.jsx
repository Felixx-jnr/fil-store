"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  useEffect(() => {
    const initUserData = async () => {
      if (user && user.email) {
        setUserData({
          name: user.name || "",
          email: user.email || "",
          address: user.address || "",
          phone: user.phone || "",
        });
        setLoading(false);
      } else {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        try {
          const res = await axios.get("/api/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { name, email, address, phone } = res.data.user;
          setUserData({ name, email, address, phone });
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    initUserData();
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.address || !userData.phone) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("/api/checkout/start", {
        ...userData,
        cartItems,
      });

      router.push(res.data.authorization_url);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="p-4">Loading user info...</p>;

  return (
    <div className="mx-auto p-4 max-w-2xl">
      <h2 className="mb-4 font-bold text-2xl">Checkout</h2>

      {/* Cart Items */}
      <div className="bg-gray-50 shadow mb-6 p-4 rounded">
        <h3 className="mb-2 font-semibold text-lg">Cart Items</h3>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between py-1 border-b text-sm"
          >
            <span>
              {item.name} × {item.quantity || 1}
            </span>
            <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between mt-3 font-bold text-base">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* User Info Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={userData.name}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <input
          name="phone"
          type="phone"
          placeholder="Phone"
          value={userData.phone}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={userData.address}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 px-4 py-2 rounded w-full text-white"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
