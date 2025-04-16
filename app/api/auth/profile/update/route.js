import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireAuth } from "@/middlewares/authMiddleware";

export const POST = requireAuth(async (req, user) => {
  await connectDB();

  const { username, dob, phone, country, address } = await req.json();

  // Find user by id from token
  const existingUser = await User.findById(user.id);
  if (!existingUser) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // Update profile fields if provided
  if (username) existingUser.username = username;
  if (dob) existingUser.dob = dob;
  if (phone) existingUser.phone = phone;
  if (country) existingUser.country = country;
  if (address) existingUser.address = address;

  await existingUser.save();

  return new Response(
    JSON.stringify({ message: "Profile updated successfully" }),
    { status: 200 }
  );
});
