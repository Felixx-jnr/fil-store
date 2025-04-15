import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

//UPDATE USER
export const updateProfile = async (req, user) => {
  await connectDB();
  const { email, username, dob, country, phone, password } = await req.json();

  const updateData = { email, username, dob, country, phone };

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    updateData.password = bcrypt.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, updateData, {
    new: true,
  });

  return {
    message: "Profile updated successfully",
    user: {
      email: updatedUser.email || user.email,
      username: updatedUser.username || user.username,
      dob: updatedUser.dob || user.dob,
      country: updatedUser.country || user.country,
      phone: updatedUser.phone || user.phone,
      password: updatedUser.password || user.password,
    },
  };
};
