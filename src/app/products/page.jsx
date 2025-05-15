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
      <div className="bg-gray-50 py-12 mb-8">
        <div className="container mx-auto px-4">
          {/* Animated Header with Brand Logo */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-black tracking-tight mb-4 ">
              <span className="text-red-600 inline-block ">ONE</span>
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto animate-slideUp">
              Premium products for the modern lifestyle
            </p>
          </div>
          
          {/* Featured Products Slider - Now with uniform card sizes */}
          <div className="overflow-hidden relative">
            <div className="flex space-x-6 py-6 animate-marquee">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="min-w-[280px] w-[280px] transform transition-all duration-300 hover:scale-105">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-[360px] flex flex-col">
                    <div className="h-[180px] overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <h3 className="font-medium text-gray-900 line-clamp-2 h-12">{product.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-red-600">${product.price}</span>
                        <Link 
                          href={`/products/${product.id}`}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate products to create continuous loop effect - with uniform sizes */}
              {products.slice(0, 8).map((product) => (
                <div key={`duplicate-${product.id}`} className="min-w-[280px] w-[280px] transform transition-all duration-300 hover:scale-105">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-[360px] flex flex-col">
                    <div className="h-[180px] overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <h3 className="font-medium text-gray-900 line-clamp-2 h-12">{product.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-red-600">${product.price}</span>
                        <Link 
                          href={`/products/${product.id}`}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover Our Collection</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
      `}</style>
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
