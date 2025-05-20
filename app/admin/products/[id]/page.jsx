"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/admin/products/${id}`, {
          withCredentials: true,
        });
        setForm(res.data); // assumes res.data is a product object
      } catch (err) {
        toast.error("Failed to fetch product");
        router.push("/admin/dashboard");
      }
    };
    fetchProduct();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/products/${id}`, form);
      toast.success("Product updated!");
      router.push("/admin/dashboard");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="mx-auto p-4 max-w-xl">
      <h1 className="mb-4 font-bold text-2xl">Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded w-full h-28"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />

        <button
          type="submit"
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
