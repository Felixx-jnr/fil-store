// app/api/products/route.js
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

//GET ALL PRODUCTS
export async function GET() {
  await connectDB();
  const products = await Product.find();
  return Response.json(products);
}
