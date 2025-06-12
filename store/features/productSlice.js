import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import axios from "axios";

// Thunks
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  fetchAllProducts
);

export const getProduct = createAsyncThunk("products/getOne", fetchProductById);

export const addProduct = createAsyncThunk("products/create", createProduct);

export const editProduct = createAsyncThunk(
  "products/update",
  ({ id, updates }) => updateProduct(id, updates)
);

export const removeProduct = createAsyncThunk("products/delete", deleteProduct);

// ✅ NEW: Filtered Products Thunk
export const getFilteredProducts = createAsyncThunk(
  "products/getFiltered",
  async ({ category, minPrice, maxPrice, minRating }) => {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (minRating) params.append("minRating", minRating);

    const res = await axios.get(`/api/products?${params.toString()}`);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    single: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSingleProduct(state) {
      state.single = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ Handle filtered products
      .addCase(getFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch one
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.single = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
        if (state.single && state.single._id === action.payload._id) {
          state.single = action.payload;
        }
      })

      // Delete
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.meta.arg);
      });
  },
});

export const { clearSingleProduct } = productSlice.actions;
export default productSlice.reducer;
