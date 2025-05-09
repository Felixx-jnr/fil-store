import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateCode } from "@/lib/utils";
import { sendEmail } from "@/lib/mailer";
import PendingVerification from "@/models/PendingVerification.js";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  // Check if pending verification exists already
  const existingPending = await PendingVerification.findOne({ email });
  if (existingPending) {
    return new Response(
      JSON.stringify({
        message: "Verification already pending for this email",
      }),
      { status: 400 }
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const code = generateCode();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await PendingVerification.create({
    email,
    hashedPassword,
    verificationCode: code,
    verificationCodeExpiry: expiry,
  });

  await sendEmail(
    email,
    "Verify your email",
    `Your verification code is ${code}`
  );

  return Response.json({ message: "Verification code sent to email" });
}
