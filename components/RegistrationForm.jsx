"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUserAsync, setEmail } from "@/store/features/registerSlice";

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
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegistrationForm;
