import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      trim: true,
    },

    dob: {
      type: String,
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    address: {
      type: String,
    },

    phone: {
      type: String,
    },

    country: {
      type: String,
    },

    resetPasswordCode: { type: String },
    resetPasswordExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
