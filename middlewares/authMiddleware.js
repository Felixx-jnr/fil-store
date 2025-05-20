import { verifyToken } from "@/lib/auth";

export function requireAuth(handler) {
  return async (req, context) => {
    const token = req.cookies?.get("token")?.value;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    let user;
    try {
      user = verifyToken(token);
    } catch (err) {
      return new Response("Invalid token", { status: 401 });
    }

    return handler(req, context, user);
  };
}

export function requireAdmin(handler) {
  return requireAuth(async (req, context, user) => {
    if (user.role !== "admin") {
      return new Response("Forbidden", { status: 403 });
    }

    return handler(req, context, user);
  });
}
