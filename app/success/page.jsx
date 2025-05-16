"use client";
import { useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const finalizeOrder = async () => {
      const storedOrder = JSON.parse(localStorage.getItem("pendingOrder"));
      if (!storedOrder) return;

      await axios.post("/api/orders", storedOrder);
      localStorage.removeItem("pendingOrder");

      alert("Order placed successfully!");
      router.push("/orders");
    };

    if (searchParams.get("reference")) {
      finalizeOrder();
    }
  }, [searchParams]);

  return <div className="p-4">Processing your order...</div>;
}
