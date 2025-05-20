import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/middlewares/authMiddleware";

//admin get product
export const GET = requireAdmin(async () => {
  await connectDB();
  const products = await Product.find({});
  return Response.json(products);
});

//admin create product
export const POST = requireAdmin(async (req) => {
  await connectDB();
  const data = await req.json();
  const product = await Product.create(data);
  return Response.json(product, { status: 201 });
});
