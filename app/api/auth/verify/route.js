import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { sendEmail } from "@/lib/mailer";

export async function POST(req) {
  await connectDB();
  const { email, code } = await req.json();

  const pending = await PendingVerification.findOne({ email });
  if (!pending) {
    return new Response(
      JSON.stringify({ message: "No pending verification for this email" }),
      { status: 404 }
    );
  }

  if (pending.verificationCode !== code) {
    return new Response(
      JSON.stringify({ message: "Invalid verification code" }),
      { status: 400 }
    );
  }

  if (pending.verificationCodeExpiry < new Date()) {
    await PendingVerification.deleteOne({ email });
    return new Response(
      JSON.stringify({ message: "Verification code expired" }),
      { status: 400 }
    );
  }

  // Create user
  await User.create({
    email: pending.email,
    password: pending.hashedPassword,
    isVerified: true,
  });

  // Send success email
  await sendEmail(
    email,
    "Welcome to Fil Store 🎉",
    `Hi there! Your email has been successfully verified. You can now login and enjoy all our features.`
  );

  // Remove pending verification record
  await PendingVerification.deleteOne({ email });

  return Response.json({
    message: "Email verified successfully, account created.",
  });
}
