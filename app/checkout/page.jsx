"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GoPerson } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { formatAmount } from "lib/utils";
import Loading from "@/components/Loading";

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const [userData, setUserData] = useState({
    username: "",
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
          username: user.username || "",
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

          const { username, email, address, phone } = res.data.user;
          setUserData({ username, email, address, phone });
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

    if (
      !userData.username ||
      !userData.email ||
      !userData.address ||
      !userData.phone
    ) {
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

  if (loading)
    return (
      <p className="p-4">
        {" "}
        <Loading />{" "}
      </p>
    );

  return (
    <div className="flex justify-center mt-[50px] py-10 form-background">
      <div className="bg-white shadow-2xl xs:p-5 px-2 py-5 rounded-2xl w-[95%] sm:w-[85%] md:w-[700px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          CHECKOUT
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          Review your items before proceeding to make payment
        </p>

        {/* Cart Items */}
        <div className="bg-light shadow mb-6 p-4 rounded">
          <h3 className="mb-2 font-semibold text-gren text-2xl">Cart Items</h3>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between py-1 border-b text-sm"
            >
              <span className="font-semibold">
                {item.name} × {item.quantity || 1}
              </span>
              <span className="font-semibold text-gren text-sm">
                {formatAmount(item.price * (item.quantity || 1))}
              </span>
            </div>
          ))}
          <div className="flex justify-between mt-3 font-bold text-gren text-lg">
            <span>Total:</span>
            <span>{formatAmount(total)}</span>
          </div>
        </div>

        {/* User Info Form */}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label
              className="font-semibold text-gren"
              htmlFor="username"
            >
              Username
            </label>

            <div className="flex items-center gap-2 px-2 py-2 border-filgrey border-b">
              <span>
                <GoPerson className="text-gren text-2xl" />
              </span>
              <input
                name="username"
                type="text"
                placeholder="Full Name"
                value={userData.username}
                onChange={handleChange}
                className="block outline-0 w-full placeholder-filgrey"
                required
              />
            </div>
          </div>

          <div className="my-4">
            <label
              className="font-semibold text-gren"
              htmlFor="email"
            >
              Email
            </label>

            <div className="flex items-center gap-2 px-2 py-2 border-filgrey border-b">
              <span>
                <MdOutlineEmail className="text-gren text-2xl" />
              </span>

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                className="block outline-0 w-full placeholder-filgrey"
                required
              />
            </div>
          </div>

          <div className="my-4">
            <label
              className="font-semibold text-gren"
              htmlFor="phone"
            >
              Phone
            </label>

            <div className="flex items-center gap-2 px-2 py-2 border-filgrey border-b">
              <span>
                <FiPhone className="text-gren text-2xl" />
              </span>

              <input
                name="phone"
                type="phone"
                placeholder="Phone"
                value={userData.phone}
                onChange={handleChange}
                className="block outline-0 w-full placeholder-filgrey"
                required
              />
            </div>
          </div>

          <div className="my-4">
            <label
              className="font-semibold text-gren"
              htmlFor="address"
            >
              Delivery Address
            </label>

            <div className="flex items-center gap-2 px-2 py-2 border-filgrey border-b">
              <span>
                <MdOutlineLocationOn className="text-gren text-2xl" />
              </span>
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={userData.address}
                onChange={handleChange}
                className="block outline-0 w-full placeholder-filgrey"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="buttons"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}
