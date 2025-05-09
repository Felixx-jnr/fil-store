"use client";

import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { IoIosLock } from "react-icons/io";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Request reset code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(data.message);
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

  // Submit new password + code
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetCode, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(data.message);
      setStep(1);
      setEmail("");
      setResetCode("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="top-1/2 left-1/2 absolute bg-white shadow-2xl backdrop-blur-2xl p-5 rounded-2xl w-[95%] xs:w-[80%] md:w-[600px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          RESET PASSWORD
        </h1>

        {step === 1 && (
          <form onSubmit={handleRequestCode}>
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
                autoComplete="off"
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className="block outline-0 w-full placeholder-filgrey"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              className="mt-5 buttons"
              type="submit "
            >
              Send Reset Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="my-4">
              <label
                className="font-semibold"
                htmlFor="resetCode"
              >
                Reset Code
              </label>

              <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
                <span>
                  <GoPerson className="text-gren text-2xl" />
                </span>
                <input
                  type="text"
                  autoComplete="off"
                  id="resetCode"
                  name="resetCode"
                  placeholder="Enter reset code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="block outline-0 w-full placeholder-filgrey"
                  required
                />
              </div>
            </div>

            <div>
              <label
                className="font-semibold"
                htmlFor="newPassword"
              >
                Password
              </label>
              <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
                <span>
                  <GoPerson className="text-gren text-2xl" />
                </span>
                <input
                  type="password"
                  id="newPassword"
                  name="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  autoComplete="off"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="block outline-0 w-full placeholder-filgrey"
                />
              </div>
            </div>
            <button
              className="my-5 buttons"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        )}

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
