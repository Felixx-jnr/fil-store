import { requireAdmin } from "@/middlewares/authMiddleware";
import {connectDB} from "@/lib/db";
import Order from "@/models/Order";



export const GET = requireAdmin(async () => {

  await connectDB();
  const orders = await Order.find({})
  return Response.json(orders);
});
