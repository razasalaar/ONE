"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import ToastProvider from "./components/ToastProvider";

// Create a new QueryClient for each request
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider />
            <div className="page-transition" key={pathname}>
              {children}
            </div>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
