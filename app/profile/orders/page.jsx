"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import {formatAmount} from "lib/utils"

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

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center mt-[50px] p-10 form-background">
      <div className="bg-white shadow-2xl p-5 rounded-2xl w-[95%] xs:w-[80%] md:w-[600px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          Your Orders
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          Here you can view all your past orders and their statuses.
        </p>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="shadow-lg p-4 rounded"
              >
                <h3 className="font-semibold text-gren text-lg mb-3">
                  Order ID - {order._id}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  Status:{" "}
                  <span className="font-semibold text-filblue">
                    {order.status }
                  </span>
                </p>
                 <h3 className = "text-gren uppercase font-semibold  ">ITEMS PURCHASED</h3>
    
                <ul className="text-sm list-disc list-inside my-1">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity} — {formatAmount(item.price)}
                    </li>
                  ))}
                </ul>

                <p className = "text-gren text-lg font-semibold" >Total: { formatAmount(order.total)}</p>
                <p className="text-filgrey text-xs">
                  Ordered On: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
