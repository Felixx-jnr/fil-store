// app/api/products/[id]/rate/route.js
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
    existingRating.value = value;
  } else {
    product.ratings.push({ user: decoded.id, value });
  }

  await product.save();

  const updatedProduct = await Product.findById(id);
  const sum = updatedProduct.ratings.reduce(
    (acc, r) => acc + Number(r.value),
    0
  );
  const averageRating = sum / updatedProduct.ratings.length;

  const userRating = updatedProduct.ratings.find(
    (r) => r.user.toString() === decoded.id
  )?.value;

  return NextResponse.json({
    message: "Rating submitted successfully",
    averageRating,
    userRating,
  });
}

export async function GET(req, context) {
  await connectDB();
  const { id } = await context.params;

  const token = req.cookies.get("token")?.value;
  let userId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (error) {
      console.error(error);
      // token invalid — ignore and continue anonymously
    }
  }

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const averageRating =
    product.ratings.length === 0
      ? 0
      : product.ratings.reduce((acc, r) => acc + r.value, 0) /
        product.ratings.length;

  const userRating = userId
    ? product.ratings.find((r) => r.user.toString() === userId)?.value || null
    : null;

  return NextResponse.json({ averageRating, userRating });
}
