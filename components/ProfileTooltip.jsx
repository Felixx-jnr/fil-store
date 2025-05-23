"use client";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";

const ProfileTooltip = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href="/profile"
        className="font-extrabold hover:text-mustard text-xl"
      >
        <BsPerson />
      </Link>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="top-full left-1/2 z-50 absolute bg-white shadow-xl mt-2 p-3 border border-gray-200 rounded-md w-[200px] -translate-x-1/2"
          >
            {isAuthenticated ? (
              <div className="space-y-3 text-lg">
                <p className="font-semibold text-dark text-xl">
                  Hello, {user?.username || "User"}
                </p>
                <Link
                  href="/profile"
                  className="block text-filgreen hover:text-mustard hover:underline"
                >
                  View Profile
                </Link>
                <Link
                  href="/profile/orders"
                  className="block text-filgreen hover:text-mustard hover:underline"
                >
                  My Orders
                </Link>
                <Link
                  href="/track"
                  className="block text-filgreen hover:text-mustard hover:underline"
                >
                  Track Orders
                </Link>
                

                <div className="w-full text-red-500 text-left hover:underline">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-lg">
                <p className="text-dark">Welcome! 👋</p>
                <Link
                  href="/login"
                  className="block text-filgreen hover:text-mustard hover:underline"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-filgreen hover:text-mustard hover:underline"
                >
                  Create Account
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default ProfileTooltip;
