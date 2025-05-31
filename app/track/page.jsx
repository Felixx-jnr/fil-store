"use client";

import { useState } from "react";
import axios from "axios";
import OrderProgressBar from "@/components/OrderTracking";
import Loading from "@/components/Loading";
import { MdDeliveryDining } from "react-icons/md";
import {formatAmount} from "lib/utils";

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
    <div className="flex justify-center mt-[50px] p-10 form-background">
      <div className="bg-white shadow-2xl p-5 rounded-2xl w-[95%] xs:w-[80%] md:w-[600px]">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          TRACK YOUR ORDER
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          Enter your order ID to track the status of your order.
        </p>

        <div className="flex gap-5 w-full">
          <div className="w-full">
            <label
              className="font-semibold"
              htmlFor="track"
            >
              Order ID
            </label>
            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <span>
                <MdDeliveryDining className="text-gren text-2xl" />
              </span>
              <input
                type="text"
                name="track"
                id="track"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={fetchOrder}
              className={
                loading
                  ? ""
                  : " bg-green-800 hover:bg-mustard px-2 xs:px-3 py-2 text-light hover:text-dark text-xs xs:text-sm "
              }
            >
              {loading ? <Loading /> : "Track"}
            </button>
          </div>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {order && (
          <div className="space-y-2 rounded-2xl shadow-lg mt-4 p-4">
            <h3 className="font-semibold text-gren text-lg">
              Order ID - {order._id}
            </h3>
            <OrderProgressBar currentStatus={order.status} />

            <h3 className = "text-gren uppercase mt-10 font-semibold  ">ITEMS PURCHASED</h3>
            <ul className="text-sm list-disc list-inside">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity} — {formatAmount(item.price)}
                </li>
              ))}
            </ul>
            <p className = "text-gren text-lg font-semibold" >Total: { formatAmount(order.total)}</p>
            <p className = "text-xs text-filgrey">Ordered On: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
