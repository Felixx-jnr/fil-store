import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { generateCode } from "@/lib/utils";
import { sendEmail } from "@/lib/mailer";

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // Generate verification code and expiry time
  const resetCode = generateCode();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

  // Update user with reset code and expiry
  user.resetPasswordCode = resetCode;
  user.resetPasswordExpiry = expiry;
  await user.save();

  // Send email with reset code
  await sendEmail(
    email,
    "Password Reset Request",
    `Your password reset code is: ${resetCode}. It expires in 10 minutes.`
  );

  return Response.json({
    message: "Password reset code sent. Check your email.",
  });
}
