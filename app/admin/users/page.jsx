"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatAmount } from "lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState(null); // "spent" | "orders" | null
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

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOption === "spent") {
      return b.totalSpent - a.totalSpent;
    } else if (sortOption === "orders") {
      return b.totalOrders - a.totalOrders;
    }
    return 0; // default order
  });

  if (loading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="flex justify-center mt-[50px] xs:p-10 px-3 py-10 form-background">
      <div className="bg-white shadow-2xl p-5 rounded-2xl w-full">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          SEE ALL USERS
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          As an admin, you can see all users and their total orders and total
          spent amount.
        </p>
        {/* Sort Buttons */}
        <div className="mb-4">
          <label
            htmlFor="sort"
            className="mr-2 font-semibold "
          >
            Sort Users By:
          </label>
          <select
            id="sort"
            value={sortOption || ""}
            onChange={(e) => setSortOption(e.target.value || null)}
            className="px-2 py-1 border-2 border-moss outline-0 rounded"
          >
            <option value="">-- No Sort --</option>
            <option value="spent">Total Spent</option>
            <option value="orders">Total Orders</option>
          </select>
        </div>

        {/* User Cards */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedUsers.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl"
            >
              <div className="bg-light shadow-md p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-moss" />
                  <h2 className="font-semibold text-xl">
                    {user.username || "Unnamed"}
                  </h2>
                </div>
                <p className="font-semibold text-gren">Email: {user.email}</p>
                <p className="font-semibold text-gren">Phone: {user.phone}</p>
                <p className="font-semibold text-gren">
                  Total Orders: {user.totalOrders}
                </p>
                <p className="font-semibold text-gren">
                  Total Spent: {formatAmount(user.totalSpent)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
