"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    

    axios
      .get("/api/orders", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="mx-auto p-4 max-w-3xl">
      <h2 className="mb-4 font-bold text-2xl">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="shadow p-4 border rounded">
              <h3 className="font-semibold text-lg">Order #{order._id}</h3>
              <p className="text-gray-500 text-sm">
                Status:{" "}
                <span className="font-semibold text-blue-600">
                  {order.status}
                </span>
              </p>
              <ul className="mt-2 text-sm list-disc list-inside">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — ${item.price}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-gray-700 text-sm">
                Total: $
                {order.items.reduce(
                  (sum, i) => sum + i.price * i.quantity,
                  0
                )}
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
