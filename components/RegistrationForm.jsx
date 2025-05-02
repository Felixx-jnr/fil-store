"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUserAsync, setEmail } from "@/store/features/registerSlice";
import { GoPerson } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import Loading from "@/components/Loading";
import Link from "next/link";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isRegistered, isLoading, error } = useSelector(
    (state) => state.register
  );

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAsync(formData)).then((res) => {
      if (!res.error) {
        dispatch(setEmail(formData.email));
      }
    });
  };

  // Navigate after registration
  useEffect(() => {
    if (isRegistered) {
      router.push("/verify");
    }
  }, [isRegistered, router]);

  return (
    <div className="relative h-screen">
      <div className="top-1/2 left-1/2 absolute bg-white/40 shadow-2xl backdrop-blur-2xl p-5 rounded-2xl w-[95%] xs:w-[80%] md:w-[600px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          REGISTER
        </h1>

        <form onSubmit={handleSubmit}>
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
                autoComplete="off"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                required
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
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
                required
                placeholder="Type your password"
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="block mt-5 buttons"
          >
            {isLoading ? <Loading /> : "Register"}
          </button>
          {error && <p>{error}</p>}
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
