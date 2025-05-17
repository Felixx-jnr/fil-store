import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { verifyPayment } from "@/lib/paystack"; // You should have this helper to verify Paystack transaction
import { verifyToken } from "@/lib/auth";
import { sendEmail } from "@/lib/mailer";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return new Response(JSON.stringify({ message: "Missing reference" }), {
        status: 400,
      });
    }

    // Get token from cookies
    const cookie = req.cookies.get("token")?.value;

    let user = null;
    if (cookie) {
      try {
        user = verifyToken(cookie); // contains id, email, etc.
      } catch (err) {
        console.error("Token verification error:", err);
      }
    }

    // Step 1: Verify payment with Paystack
    const paymentData = await verifyPayment(reference); // Your utility should call Paystack and return status + metadata

    if (paymentData.status !== "success") {
      return new Response(
        JSON.stringify({ message: "Payment not successful" }),
        {
          status: 400,
        }
      );
    }

    // Extract metadata from the payment (where you stored userData & cartItems)
    const { cartItems, address, email, total } = paymentData.metadata;

    // Step 2: Save order to DB
    const order = await Order.create({
      userId: user?.id || null,
      email,
      address,
      items: cartItems,
      total,
      status: "Processing",
    });

    // You may optionally send confirmation emails here
    const itemList = cartItems
      .map((item) => `- ${item.name} × ${item.quantity} — $${item.price}`)
      .join("\n");

    const emailText = `
      Thank you for your purchase!

      Order ID: ${order._id}
      Status: ${order.status}
      Address: ${address}
      Total: $${total}

      Items:${itemList}`.trim();

    const adminEmail = process.env.ADMIN_EMAIL;

    await Promise.all([
      sendEmail(email, "Your Order Confirmation - Fil Store", emailText),
      sendEmail(adminEmail, `New Order from ${email}`, emailText),
    ]);


    return new Response(JSON.stringify({ message: "Order saved", order }), {
      status: 200,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      {
        status: 500,
      }
    );
  }
}
