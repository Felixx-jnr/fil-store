"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reference = searchParams.get("reference");

  const { items: cartItems } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (!reference || !cartItems.length) return;

    // Fallbacks in case user isn't logged in
    const email = user?.email || localStorage.getItem("checkoutEmail");
    const address = user?.address || localStorage.getItem("checkoutAddress");
    const userId = user?._id || null;

    const verify = async () => {
      try {
        await axios.post("/api/checkout/verify", {
          reference,
          userId,
          email,
          address,
          items: cartItems,
          total,
        });

        alert("Payment successful and order saved!");
        router.push("/profile/orders");
      } catch (err) {
        console.error("Payment verification failed:", err.response?.data || err.message);
        alert("Payment verification failed.");
        router.push("/");
      }
    };

    verify();
  }, [reference, cartItems, user]);

  return <p className="p-4">Verifying payment...</p>;
}
