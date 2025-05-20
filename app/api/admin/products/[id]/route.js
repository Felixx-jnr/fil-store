import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/middlewares/authMiddleware";

//admin update product
export const PUT = requireAdmin(async (req, context, user) => {
  await connectDB();
  const { id } = context.params;
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  return updated
    ? Response.json(updated)
    : new Response("Not Found", { status: 404 });
});

//admin delete product
export const DELETE = requireAdmin(async (req, context, user) => {
  await connectDB();

  const { id } = context.params;
  await Product.findByIdAndDelete(id);

  return new Response("Product deleted", { status: 200 });
});
