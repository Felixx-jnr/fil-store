import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import registerReducer from "./features/registerSlice";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";

// Load cart from localStorage
const loadCart = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

// Save cart to localStorage
const saveCart = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    // ignore write errors
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});

// Save on every state change
store.subscribe(() => {
  saveCart(store.getState());
});
