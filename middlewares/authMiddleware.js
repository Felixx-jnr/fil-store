import { verifyToken } from "@/lib/auth";

export function requireAuth(handler) {
  return async (req) => {
    try {
      const token = req.cookies.get("token")?.value;

      if (!token) {
        return new Response("Unauthorized: No token", { status: 401 });
      }

      const user = verifyToken(token);

      if (!user) {
        return new Response("Unauthorized: Invalid token", { status: 401 });
      }

      // Pass the user to the handler
      return handler(req, user);
    } catch (error) {
      console.error("Auth error:", error);
      return new Response("Unauthorized", { status: 401 });
    }
  };
}

export function requireAdmin(handler) {
  return requireAuth(async (req, user) => {
    if (user.role !== "admin") {
      return new Response("Forbidden: Admins only", { status: 403 });
    }

    return handler(req, user);
  });
}
