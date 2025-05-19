"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <QueryClientProvider client={queryClient}>
            <div className="page-transition" key={pathname}>
              {children}
            </div>
          </QueryClientProvider>
        </body>
      </html>
    </Provider>
  );
}
