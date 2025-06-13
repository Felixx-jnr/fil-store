import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req, context) {
  await connectDB();
  const { id } = await context.params;
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { value } = await req.json();

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const existingRating = product.ratings.find(
    (r) => r.user.toString() === decoded.id
  );

  if (existingRating) {
    return NextResponse.json({ error: "Already rated" }, { status: 400 });
  }

  product.ratings.push({ user: decoded.id, value });
  await product.save();

  const updatedProduct = await Product.findById(id);
  const sum = updatedProduct.ratings.reduce((acc, r) => acc + r.value, 0);
  const averageRating = sum / updatedProduct.ratings.length;

  return NextResponse.json({
    message: "Rating submitted successfully",
    averageRating,
  });
}

export async function GET(req, context) {
  await connectDB();
  const { id } = context.params;

  const token = req.cookies.get("token")?.value;
  let userId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (error) {
      console.error(error);
      // invalid token – allow anonymous
    }
  }

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const sum = product.ratings.reduce((acc, r) => acc + r.value, 0);
  const averageRating =
    product.ratings.length > 0 ? sum / product.ratings.length : 0;

  const userHasRated = userId
    ? product.ratings.some((r) => r.user.toString() === userId)
    : false;

  return NextResponse.json({
    averageRating,
    userHasRated,
  });
}
