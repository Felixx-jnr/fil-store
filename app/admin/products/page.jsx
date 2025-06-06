"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatAmount } from "@/lib/utils";
import Loading from "@/components/Loading";

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
    <div className="flex justify-center mt-[50px] xs:p-10 px-3 py-10 form-background">
      <div className="bg-white shadow-2xl p-5 rounded-2xl w-full">
        <h1 className="font-semibold text-gren text-3xl xs:text-4xl text-center">
          SEE ALL PRODUCTS
        </h1>
        <p className="mb-5 text-gren text-xs xs:text-sm text-center">
          As an admin, you can manage all products here. You can add, edit, or
          delete products as needed.
        </p>

        <button
          className="flex justify-self-end my-2 buttons"
          onClick={() => router.push("/admin/products/create")}
        >
          Add New Product
        </button>

        {loading ? (
          <Loading />
        ) : (
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative p-4 bg-light shadow-md rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-2 rounded w-full h-40 object-cover"
                  />
                  <h2 className="font-semibold text-xl text-gren">{product.name}</h2>
                  <p className="text-gray-700">{product.category}</p>
                  <p className="font-bold text-gren">
                    {formatAmount(product.price)}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semibold">
                      ⭐ {product.averageRating?.toFixed(1) || 0} (
                      {product.ratings?.length || 0} reviews)
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4 justify-between">
                    <button
                      className = "buttons"
                      
                      onClick={() =>
                        router.push(`/admin/products/${product._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                       className = "danger-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
