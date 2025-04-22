import { verifyToken } from "@/lib/auth";
import { parse } from "cookie";

export async function GET(req) {
  try {
    const cookies = req.headers.get("cookie");
    if (!cookies) {
      return new Response(JSON.stringify({ message: "No token found" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { token } = parse(cookies);
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = verifyToken(token);

    return new Response(
      JSON.stringify({
        message: "User authenticated",
        user,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
