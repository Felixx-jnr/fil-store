"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUserAsync, setEmail } from "@/store/features/registerSlice";
import { GoPerson } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isRegistered, isLoading, error } = useSelector(
    (state) => state.register
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/\d/, "Must contain a number")
        .matches(/[@$!%*?&.#]/, "Must contain a special character (@$!%*?&.#)"),

      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      const res = await dispatch(registerUserAsync({ email, password }));
      if (!res.error) {
        dispatch(setEmail(email));
      }
    },
  });

  // Navigate after registration
  useEffect(() => {
    if (isRegistered) {
      router.push("/verify");
    }
  }, [isRegistered, router]);

  return (
    <div className="relative h-screen">
      <div className="top-1/2 left-1/2 absolute bg-white shadow-2xl p-5 rounded-2xl w-[95%] sm:w-[85%] md:w-[700px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          REGISTER
        </h1>

        <form onSubmit={formik.handleSubmit}>
          {/* email*/}
          <div>
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
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
                placeholder="Type your email"
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* password */}
          <div className="my-5">
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
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
                placeholder="Type your password"
                className="block outline-0 w-full placeholder-filgrey"
              />
              <button
                type="button"
                className="right-10 absolute focus:outline-none text-gren text-sm cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* confirm password */}
          <div>
            <label
              className="font-semibold"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>

            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <span>
                <IoIosLock className="text-gren text-2xl" />
              </span>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                required
                placeholder="Comfirm your password"
                className="block outline-0 w-full placeholder-filgrey"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="right-10 absolute focus:outline-none text-gren text-sm cursor-pointer pointer-events"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? "block mt-5 " : "block mt-5 buttons"}
          >
            {isLoading ? <Loading /> : "Register"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <div className="mt-10 text-center">
          Or{" "}
          <Link
            href="/login"
            className="hover:text-mustard underline"
          >
            Login
          </Link>{" "}
          If you have an account already
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
