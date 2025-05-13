"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "@/lib/api";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
      </div>
    );

  return (
    <ProtectedRoute>
      <div className="w-full ">
        <Navbar />
      </div>
      <div className="container mx-auto ">
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
