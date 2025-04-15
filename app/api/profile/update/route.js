import { requireAuth } from "@/middlewares/authMiddleware";
import { updateProfile } from "@/controllers/userController";

export const PUT = requireAuth(async (req, user) => {
  const result = await updateProfile(req, user);
  return Response.json(result);
});
