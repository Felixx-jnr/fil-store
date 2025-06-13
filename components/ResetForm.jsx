"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoPerson } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "@/components/Loading";

export default function ResetForm() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔒 Yup password schema
  const passwordSchema = Yup.string()
    .min(6, "Password must be at least 8 characters")
    .matches(/[A-Za-z]/, "Must contain a letter")
    .matches(/\d/, "Must contain a number")
    .matches(/[@$!%*?&.#]/, "Must contain a special character (@$!%*?&.#)")
    .required("Password is required");

  // 🔹 Step 1: Request Reset Code
  const formikStep1 = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      setMessage("");
      setLoading(true);
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setMessage(data.message);
        setStep(2);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  // 🔹 Step 2: Submit New Password
  const formikStep2 = useFormik({
    initialValues: {
      resetCode: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required"),
      newPassword: passwordSchema,
    }),
    onSubmit: async (values) => {
      setError("");
      setMessage("");
      setLoading(true);
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formikStep1.values.email,
            resetCode: values.resetCode,
            newPassword: values.newPassword,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setMessage(data.message);
        setStep(1);
        formikStep1.resetForm();
        formikStep2.resetForm();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative h-screen">
      <div className="top-1/2 left-1/2 absolute bg-white shadow-2xl p-5 rounded-2xl w-[95%] sm:w-[85%] md:w-[700px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          RESET PASSWORD
        </h1>

        {step === 1 && (
          <form onSubmit={formikStep1.handleSubmit}>
            <label
              className="font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <GoPerson className="text-gren text-2xl" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="block outline-0 w-full placeholder-filgrey"
                value={formikStep1.values.email}
                onChange={formikStep1.handleChange}
                onBlur={formikStep1.handleBlur}
              />
            </div>
            {formikStep1.touched.email && formikStep1.errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {formikStep1.errors.email}
              </p>
            )}
            <button
              className={loading ? "mt-5" : "mt-5 buttons"}
              type="submit"
              disabled={loading}
            >
              {loading ? <Loading /> : "Send Reset Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={formikStep2.handleSubmit}>
            <div className="my-4">
              <label
                className="font-semibold"
                htmlFor="resetCode"
              >
                Reset Code
              </label>
              <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
                <GoPerson className="text-gren text-2xl" />
                <input
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  placeholder="Enter reset code"
                  className="block outline-0 w-full placeholder-filgrey"
                  value={formikStep2.values.resetCode}
                  onChange={formikStep2.handleChange}
                  onBlur={formikStep2.handleBlur}
                />
              </div>
              {formikStep2.touched.resetCode &&
                formikStep2.errors.resetCode && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formikStep2.errors.resetCode}
                  </p>
                )}
            </div>

            <div>
              <label
                className="font-semibold"
                htmlFor="newPassword"
              >
                Password
              </label>
              <div className="relative flex items-center gap-2 px-2 py-3 border-filgrey border-b">
                <IoIosLock className="text-gren text-2xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter new password"
                  className="block outline-0 w-full placeholder-filgrey"
                  value={formikStep2.values.newPassword}
                  onChange={formikStep2.handleChange}
                  onBlur={formikStep2.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="right-3 absolute text-gren text-xl"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formikStep2.touched.newPassword &&
                formikStep2.errors.newPassword && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formikStep2.errors.newPassword}
                  </p>
                )}
            </div>

            <button
              className={loading ? "mt-5 " : "mt-5 buttons"}
              type="submit"
              disabled={loading}
            >
              {loading ? <Loading /> : "Reset Password"}
            </button>
          </form>
        )}

        <div className="flex justify-center mt-2">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
