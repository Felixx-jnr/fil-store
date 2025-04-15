import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/mailer";

export async function POST(req) {
  await connectDB();
  const { email, resetCode, newPassword } = await req.json();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // Check if reset code exists and is within the expiry time
  if (
    user.resetPasswordCode !== resetCode ||
    new Date() > user.resetPasswordExpiry
  ) {
    return new Response(
      JSON.stringify({ message: "Invalid or expired reset code" }),
      { status: 400 }
    );
  }

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  // Update the user's password and clear the reset code
  user.password = hashedPassword;
  user.resetPasswordCode = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();

  // Send a confirmation email
  await sendEmail(
    email,
    "Password Successfully Reset",
    "Your password has been successfully reset."
  );

  return Response.json({ message: "Password reset successfully" });
}
