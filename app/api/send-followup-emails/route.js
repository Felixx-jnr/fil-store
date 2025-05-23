import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { sendEmail } from "@/lib/mailer";

export const config = {
  schedule: "* 10 * * *", // runs every day at 10 AM UTC
};

export async function GET() {
  await connectDB();

  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    //const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const orders = await Order.find({
      createdAt: { $lte: sevenDaysAgo },
      followUpSent: false,
    });

    // const orders = await Order.find({
    //   createdAt: { $lte: fiveMinutesAgo },
    //   followUpSent: false,
    // });

    for (const order of orders) {
      const emailText = `
Hi ${order.email.split("@")[0]},

It's been a week since you placed your order at FIL Store, and we'd love to know how it's going!

If you have any feedback or questions, reply to this email or leave a review.

Your order:
${order.items.map((i) => `- ${i.name} × ${i.quantity}`).join("\n")}

Thanks again for shopping with us!
F
– The FIL Store Team
`.trim();

      await sendEmail(order.email, "How’s your FIL Store order?", emailText);

      order.followUpSent = true;
      await order.save();
    }

    return new Response(
      JSON.stringify({ message: `Sent ${orders.length} follow-up emails.` }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Follow-up email error:", err);
    return new Response(
      JSON.stringify({
        message: "Error sending follow-up emails",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
// This code is a server-side function that connects to a MongoDB database, retrieves orders older than 7 days that haven't had follow-up emails sent, and sends those emails. It also updates the order status to indicate that the follow-up email has been sent.
