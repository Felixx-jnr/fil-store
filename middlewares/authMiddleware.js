import { verifyToken } from "../lib/auth";

export function requireAuth(handler) {
  return async (req) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = verifyToken(token);
    if (!user) return new Response("Unauthorized", { status: 401 });

    return handler(req, user);
  };
}

export function requireAdmin(handler) {
  return requireAuth(async (req, user) => {
    if (user.role !== "admin")
      return new Response("Forbidden", { status: 403 });
    return handler(req, user);
  });
}
