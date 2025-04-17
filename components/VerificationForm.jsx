"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { verifyCodeAsync } from "@/store/features/registerSlice";

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
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="bg-gray-100 p-2 border w-full text-gray-700"
        />
      </div>

      <div>
        <label>Verification Code</label>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="p-2 border w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        {isLoading ? "Verifying..." : "Verify"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default VerificationForm;
