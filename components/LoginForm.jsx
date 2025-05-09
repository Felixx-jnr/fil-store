"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GoPerson } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) router.push("/profile");
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current?.focus(); // Move focus to password input
    }
  };

  return (
    <div className="relative h-screen">
      <div className="top-1/2 left-1/2 absolute bg-white/40 shadow-2xl backdrop-blur-2xl p-5 rounded-2xl w-[95%] xs:w-[80%] md:w-[600px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          LOGIN
        </h1>
        <form onSubmit={handleLogin}>
          <div className="my-4">
            <label
              className="font-semibold"
              htmlFor="email"
            >
              Email
            </label>

            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <span>
                <GoPerson className="text-gren text-2xl" />
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                autoComplete="off"
                name="email"
                type="email"
                id="email"
                placeholder="Type your email"
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
          </div>

          <div>
            <label
              className="font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <span>
                <IoIosLock className="text-gren text-2xl" />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
          </div>

          <Link className = "block text-right text-xs hover:underline hover:text-mustard mt-2" href="/reset-password">Forgot password</Link>

          <button
            type="submit"
            className="block mt-5 buttons"
          >
            Login
          </button>
        </form>
        <div className="mt-10 text-center">
          Or{" "}
          <Link
            href="/register"
            className="hover:text-mustard underline"
          >
            Register
          </Link>{" "}
          If you don't have an account with us
        </div>
      </div>
    </div>
  );
}
