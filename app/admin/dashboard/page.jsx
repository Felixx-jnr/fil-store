"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatAmount } from "@/lib/utils";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        if (res.status === 401 || res.status === 403) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">Admin Product Dashboard</h1>
        <button onClick={() => router.push("/admin/products/create")}>
          {" "}
          <FaPlus className="mr-2 buttons" /> Add Product{" "}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative p-4 border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-2 rounded w-full h-40 object-cover"
                />
                <h2 className="font-semibold text-xl">{product.name}</h2>
                <p className="text-gray-700">{product.category}</p>
                <p className="font-bold text-green-600">
                  
                  {formatAmount(product.price)}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">
                    ⭐ {product.rating} ({product.numReviews} reviews)
                  </span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/admin/products/${product._id}`)
                    }
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
