import { requireAdmin } from "@/middlewares/authMiddleware";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export const GET = requireAdmin(async () => {
  await connectDB();

  const orders = await Order.find({})
    .populate("userId", "username email phone") // 👈 populate user info
    .lean();

  const enrichedOrders = orders.map((order) => ({
    ...order,
    username: order.userId?.username || "Guest User",
    email: order.userId?.email || order.email,
    phone: order.userId?.phone || order.phone,
  }));

  return Response.json(enrichedOrders);
});
