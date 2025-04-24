import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import registerReducer from "./features/registerSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    products: productReducer,
  },
});
