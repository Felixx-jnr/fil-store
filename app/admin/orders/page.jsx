"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaUser, FaBox } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatAmount } from "lib/utils";

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
    <div className="flex justify-center mt-[50px] xs:p-10 px-3 py-10 form-background">
      <div className="bg-white shadow-2xl p-5 rounded-2xl w-full">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          ALL ORDERS
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          As an admin, you can manage all orders here. You can cansel and change
          delivery status of all orders
        </p>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-light shadow-md p-4 rounded-2xl">
                <div>
                  <h2 className="font-semibold text-gren text-xl">
                    USER DETAILS
                  </h2>
                  <p>
                    {" "}
                    Name: <span>{order.username || "Guest User"}</span>{" "}
                  </p>
                  <p>Email: {order.email || "-"}</p>
                  <p>Phone: {order.phone || "-"}</p>
                  <p>Address: {order.address || "-"}</p>
                </div>

                <div className="mt-2">
                  <h2 className="font-semibold text-gren text-xl">
                    ORDER DETAILS
                  </h2>
                  <h2 className="">Order ID - {order._id}</h2>

                  <p>
                    Status:{" "}
                    <span className="font-medium text-gren">
                      {order.status}
                    </span>
                  </p>

                  <p className="mt-2 font-semibold text-gren text-sm">
                    Items Purchased
                  </p>
                  <ul className="text-sm list-disc list-inside">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity} —{" "}
                        {formatAmount(item.price)}
                      </li>
                    ))}
                  </ul>
                  <p className="">
                    Total:
                    <span className="font-medium text-gren">
                      {formatAmount(order.total)}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <label
                    htmlFor="status"
                    className="text-sm"
                  >
                    Change Status:
                  </label>

                  <select
                    id="status"
                    className="block mt-1 border rounded"
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
                  className="mt-4 px-3 py-1 rounded text-white text-sm danger-btn"
                >
                  Delete Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
