import { requireAdmin } from "@/middlewares/authMiddleware";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

//update order status
export const PUT = requireAdmin(async (req, context) => {
  await connectDB();

  const { id } = await context.params;
  const { status } = await req.json();

  if (!status) {
    return new Response("Status is required", { status: 400 });
  }

  const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });

  if (!updated) {
    return new Response("Order not found", { status: 404 });
  }

  return Response.json(updated);
});

//delete order
export const DELETE = requireAdmin(async (_, { params }) => {
  await connectDB();

  const { id } = params;
  await Order.findByIdAndDelete(id);

  return new Response("Order deleted", { status: 200 });
});
