import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, address, cartItems } = body;

    if (!email || !phone || !address || cartItems.length === 0) {
      return new Response(
        JSON.stringify({ message: "Missing required information" }),
        { status: 400 }
      );
    }

    const amount =
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) *
      100;

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const res = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        metadata: {
          name,
          email,
          phone,
          total,
          address,
          cartItems,
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({
      authorization_url: res.data.data.authorization_url,
    });
  } catch (error) {
    console.error("Paystack Error:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({ message: "Failed to initiate payment" }),
      { status: 500 }
    );
  }
}
