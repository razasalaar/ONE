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
  const [headerLoaded, setHeaderLoaded] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
        // Trigger header animation after content loads
        setTimeout(() => setHeaderLoaded(true), 300);
      }
    };
    loadProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-sky-950" />
      </div>
    );

  return (
    <ProtectedRoute>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="bg-[#f7f9fb] pt-28 pb-16 mb-8">
        <div className="container mx-auto px-4">
          {/* Animated Header with Brand Logo */}
          <div
            className={`text-center mb-16 transition-all duration-1000 transform ${
              headerLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
              <span className="text-sky-950 inline-block relative">
                ONE
                <div
                  className="w-full h-1 bg-sky-950 absolute bottom-0 left-0 transform transition-transform duration-1000 delay-300 origin-left"
                  style={{
                    transform: headerLoaded ? "scaleX(1)" : "scaleX(0)",
                    bottom: "-6px", // Adding margin between "ONE" and the underline
                  }}
                ></div>
              </span>
            </h1>

            <p
              className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 delay-500"
              style={{
                opacity: headerLoaded ? 1 : 0,
                transform: headerLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              Premium products for the modern lifestyle
            </p>
          </div>

          {/* Featured Products Section */}
          <div className="mb-20 mt-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sky-950 mb-5">
                Featured Collection
              </h2>
              <div className="w-20 h-1 bg-sky-950 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of premium products
              </p>
            </div>

            <div className="relative overflow-hidden mx-auto max-w-[95%]">
              <div className="flex space-x-6 py-6 animate-marquee">
                {products.slice(0, 8).map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[280px] transform transition-all duration-300 hover:translate-y-[-5px]"
                  >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-[400px] flex flex-col transition-all duration-300">
                      {/* Badge - Show New for some products */}
                      {product.id % 3 === 0 && (
                        <div className="absolute top-3 left-3 z-10 bg-sky-950 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}

                      <Link
                        href={`/products/${product.id}`}
                        className="block h-[200px] relative"
                      >
                        <div className="w-full h-full overflow-hidden bg-[#f7f9fb]">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      </Link>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        {/* Category */}
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          {product.category || "Fashion"}
                        </div>

                        <h3 className="font-semibold text-sky-950 line-clamp-2 h-12 mb-2 text-base">
                          {product.title}
                        </h3>

                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-sky-950">
                              ${product.price?.toFixed(2)}
                            </span>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(4 + (product.id % 2))
                                      ? "fill-current"
                                      : "text-gray-300"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                          </div>

                          <Link
                            href={`/products/${product.id}`}
                            className="block w-full text-center text-sm font-medium text-sky-950 hover:text-sky-800 transition-colors"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Duplicate products to create continuous loop effect */}
                {products.slice(0, 8).map((product) => (
                  <div
                    key={`duplicate-${product.id}`}
                    className="flex-shrink-0 w-[280px] transform transition-all duration-300 hover:translate-y-[-5px]"
                  >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-[400px] flex flex-col transition-all duration-300">
                      {/* Badge - Show New for some products */}
                      {product.id % 3 === 0 && (
                        <div className="absolute top-3 left-3 z-10 bg-sky-950 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}

                      <Link
                        href={`/products/${product.id}`}
                        className="block h-[200px] relative"
                      >
                        <div className="w-full h-full overflow-hidden bg-[#f7f9fb]">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      </Link>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        {/* Category */}
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          {product.category || "Fashion"}
                        </div>

                        <h3 className="font-semibold text-sky-950 line-clamp-2 h-12 mb-2 text-base">
                          {product.title}
                        </h3>

                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-sky-950">
                              ${product.price?.toFixed(2)}
                            </span>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(4 + (product.id % 2))
                                      ? "fill-current"
                                      : "text-gray-300"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                          </div>

                          <Link
                            href={`/products/${product.id}`}
                            className="block w-full text-center text-sm font-medium text-sky-950 hover:text-sky-800 transition-colors"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-950 mb-5">
              Discover Our Collection
            </h2>
            <div className="w-20 h-1 bg-sky-950 mx-auto mb-8"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          width: max-content;
        }
      `}</style>
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <section className="py-16 bg-sky-950 mt-10 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl mb-6">
            Ready to Experience ONE?
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who trust us for their fashion
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="bg-[#f7d0b6] text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full cursor-pointer">
                Shop Now
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-950 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full cursor-pointer">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
