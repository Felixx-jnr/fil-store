"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Access denied or error fetching users", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">All Users</h1>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="shadow p-4 rounded-2xl">
              
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-blue-500" />
                <h2 className="font-semibold text-lg">
                  {user.username || "Unnamed"}
                </h2>
              </div>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Total Orders: {user.totalOrders}</p>
              <p>Total Spent: ${user.totalSpent}</p>
              
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
