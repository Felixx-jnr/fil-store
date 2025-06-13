"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { verifyCodeAsync } from "@/store/features/registerSlice";
import { GoPerson } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import Loading from "@/components/Loading";
import Link from "next/link";

const VerificationForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, isVerified, isLoading, error } = useSelector(
    (state) => state.register
  );

  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyCodeAsync({ code, email })).then((res) => {
      if (!res.error) {
        router.push("/login");
      }
    });
  };

  // Redirect back to registration if no email in state
  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  return (
    <div className="relative h-screen">
      <div className="top-1/2 left-1/2 absolute bg-white shadow-2xl p-5 rounded-2xl w-[95%] sm:w-[85%] md:w-[700px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          VERIFY YOUR MAIL
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
                type="email"
                value={email}
                disabled
                className="block outline-0 w-full"
              />
            </div>
          </div>

          <div>
            <label
              className="font-semibold"
              htmlFor="code"
            >
              Verification Code
            </label>

            <div className="flex items-center gap-2 px-2 py-3 border-filgrey border-b">
              <span>
                <IoIosLock className="text-gren text-2xl" />
              </span>
              <input
                autoComplete="off"
                type="text"
                id="code"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="block outline-0 w-full placeholder-filgrey"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? "block mt-5" : "block mt-5 buttons"}
          >
            {isLoading ? <Loading /> : "Verify"}
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

export default VerificationForm;
