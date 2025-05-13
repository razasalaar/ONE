"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/lib/api";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "@/app/components/ProtectedRoute";
export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const loadProduct = async () => {
        try {
          const data = await fetchProductById(params.id);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [params?.id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
      </div>
    );
  if (!product)
    return <div className="text-center py-8">Product not found</div>;

  return (
    <ProtectedRoute>
      <div className="w-full">
        <Navbar />
      </div>

      <div className="max-w-4xl mt-20   mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl font-semibold text-blue-600 mb-4">
              ${product.price}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-700">
                Category: {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
