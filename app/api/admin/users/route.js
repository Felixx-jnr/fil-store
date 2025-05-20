// File: app/api/admin/users/route.js
import { requireAdmin } from "@/middlewares/authMiddleware";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";

export const GET = requireAdmin(async (req) => {
  await connectDB();

  // Fetch all users
  const users = await User.find();

  // Fetch and aggregate each user's order data
  const userSummaries = await Promise.all(
    users.map(async (user) => {
      const orders = await Order.find({ email: user.email });
      const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        totalOrders: orders.length,
        totalSpent,
      };
    })
  );

  return Response.json(userSummaries);
});
