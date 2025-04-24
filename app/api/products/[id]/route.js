import {connectDB} from "@/lib/db";
import Product from "@/models/Product";

// GET SINGLE PRODUCT
export async function GET(req, { params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(product);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

// UPDATE PRODUCT
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(updatedProduct);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

// DELETE PRODUCT
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    if (!deletedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
