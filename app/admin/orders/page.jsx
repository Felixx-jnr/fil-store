"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaUser, FaBox } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/admin/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Access denied or error fetching orders", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`/api/admin/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`/api/admin/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("Failed to delete order");
    }
  };

  if (loading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">All Orders</h1>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="shadow p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <FaBox className="text-green-500" />
                <h2 className="font-semibold text-lg">Order #{order._id}</h2>
              </div>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
              <p>Total: ${order.total}</p>
              <div className="mt-2">
                <FaUser className="inline mr-1 text-blue-500" />
                <span className="font-medium">
                  {order.username || "Guest User"}
                </span>
              </div>
              <p>Email: {order.email || "-"}</p>
              <p>Phone: {order.phone || "-"}</p>
              <p>Phone: {order.address || "-"}</p>
              <ul className="text-sm list-disc list-inside">
              {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — ${item.price}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <label
                  htmlFor="status"
                  className="text-sm"
                >
                  Change Status:
                </label>
                <select
                  id="status"
                  className="block mt-1 p-1 border rounded"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 hover:bg-red-600 mt-4 px-3 py-1 rounded text-white text-sm"
              >
                Delete Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
