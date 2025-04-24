// app/api/products/route.js
import {connectDB} from "@/lib/db";
import Product from "@/models/Product";

//GET ALL PRODUCTS
export async function GET() {
  await connectDB();
  const products = await Product.find();
  return Response.json(products);
}

//CREATE PRODUCT
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const product = await Product.create(data);
  return Response.json(product, { status: 201 });
}
