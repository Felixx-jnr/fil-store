"use client";

import { useState } from "react";
import axios from "axios";

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
        err.response?.data?.message || "Unable to fetch order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={fetchOrder}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {order && (
        <div className="border p-4 rounded shadow space-y-2">
          <h3 className="font-semibold text-lg">Order #{order._id}</h3>
          <p>Status: <span className="text-blue-600 font-medium">{order.status}</span></p>
          <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Total: ${order.total}</p>
          <ul className="list-disc list-inside text-sm">
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
