"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getFilteredProducts } from "@/store/features/productSlice";

export default function ProductFilter() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");

  const handleFilter = () => {
    dispatch(
      getFilteredProducts({
        category,
        minPrice,
        maxPrice,
        minRating,
      })
    );
  };

  return (
    <div className="bg-white shadow mb-4 p-4 rounded">
      <div className="gap-4 grid md:grid-cols-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="phone">Phones</option>
          <option value="laptop">Laptops</option>
          <option value="tablet">Tablets</option>
          {/* Add more categories */}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="bg-[#188672] mt-4 px-4 py-2 rounded text-white"
      >
        Apply Filters
      </button>
    </div>
  );
}
