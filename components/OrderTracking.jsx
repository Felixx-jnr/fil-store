"use client";

import { motion } from "framer-motion";
import { FaBoxOpen, FaTruckMoving, FaCheckCircle } from "react-icons/fa";

const steps = [
  { label: "Processing", icon: FaBoxOpen },
  { label: "Shipped", icon: FaTruckMoving },
  { label: "Delivered", icon: FaCheckCircle },
];

export default function OrderProgressBar({ currentStatus }) {
  const currentIndex = steps.findIndex((step) => step.label === currentStatus);

  return (
    <div className="relative flex justify-between items-center mt-8 px-2">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index <= currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.label}
            className="relative flex flex-col items-center w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isCompleted ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 z-10
                ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}
            >
              <Icon className="text-lg" />
            </motion.div>

            <span className="text-sm text-center">{step.label}</span>

            {/* Progress Line */}
            {!isLast && (
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: currentIndex > index ? "100%" : "0%",
                }}
                transition={{ duration: 0.5 }}
                className="top-5 left-1/2 absolute bg-green-600 h-1"
                style={{ right: "-50%", zIndex: -1 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
