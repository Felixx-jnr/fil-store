"use client";

import { useState } from "react";
import axios from "axios";
import OrderProgressBar from "@/components/OrderTracking";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await axios.get(`/api/orders/${orderId}`);
      setOrder(res.data.order);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to fetch order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-xl">
      <h2 className="mb-4 font-bold text-2xl">Track Your Order</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={fetchOrder}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {order && (
        <div className="space-y-2 shadow p-4 border rounded">
          <h3 className="font-semibold text-lg">Order #{order._id}</h3>
          <OrderProgressBar currentStatus={order.status} />
          <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Total: ${order.total}</p>
          <ul className="text-sm list-disc list-inside">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} × {item.quantity} — ${item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
