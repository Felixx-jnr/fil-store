import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

// REGISTER USER
export async function registerUser(email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password before saving
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  const token = signToken({ id: newUser._id, role: newUser.role });

  return {
    token,
    user: {
      email: newUser.email,
      role: newUser.role,
    },
  };
}

// LOGIN USER
export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid credentials");
  }
  const token = signToken({ id: user._id, role: user.role });
  return {
    token,
    user: { email: user.email, role: user.role },
  };
}
