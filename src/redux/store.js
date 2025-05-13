"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice";

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const persistedState = localStorage.getItem("reduxState");
      return persistedState ? JSON.parse(persistedState) : undefined;
    }
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
  }
};

// Configure the store with preloaded state
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store changes to save to localStorage
if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      localStorage.setItem("reduxState", JSON.stringify(store.getState()));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  });
}
