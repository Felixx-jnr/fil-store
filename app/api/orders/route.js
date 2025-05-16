import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = verifyToken(token); // You should get user.id here
    const orders = await Order.find({ userId: user.id });

    return new Response(JSON.stringify({ orders }), { status: 200 });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
