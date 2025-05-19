"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          style: {
            background: "#0c4a6e",
          },
        },
        error: {
          style: {
            background: "#e11d48",
          },
        },
      }}
    />
  );
}
