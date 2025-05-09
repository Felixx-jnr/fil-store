import mongoose from "mongoose";

const pendingVerificationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    hashedPassword: { type: String, required: true },
    verificationCode: { type: String, required: true },
    verificationCodeExpiry: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PendingVerification ||
  mongoose.model("PendingVerification", pendingVerificationSchema);
