// app/admin/products/create/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CreateProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // useEffect(() => {
  //   const token = document.cookie.includes("token");
  //   if (!token) router.replace("/");
  //   // You could fetch user info and check role here if desired.
  // }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/products", form);
      toast.success("Product created!");
      router.push("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data || "Error creating product");
    }
  };

  return (
    <div className="mx-auto p-4 max-w-xl">
      <h1 className="mb-4 font-bold text-2xl">Create New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {Object.keys(form).map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
