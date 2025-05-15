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
      <section className="py-16 bg-sky-950 mt-10 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-black text-3xl md:text-4xl mb-6">
            Ready to Experience ONE?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who trust us for their fashion
            needs.
          </p>
          <div className="flex flex-col cursor-pointer sm:flex-row gap-4 justify-center">
            <Link href="../products">
              <button
                onClick={() => router.push("/products")}
                className="bg-[#f7d0b6] text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full"
              >
                Shop Now
              </button>
            </Link>
            <button
              onClick={() => router.push("/contact")}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-950 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
