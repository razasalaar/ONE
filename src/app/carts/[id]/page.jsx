"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCartById } from "@/lib/api";
import CartItem from "../../components/Cartitem";

import { useRouter } from "next/navigation";
export default function CartDetailPage() {
  const params = useParams();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (params?.id) {
      const loadCart = async () => {
        try {
          const data = await fetchCartById(params.id);
          setCart(data);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      };
      loadCart();
    }
  }, [params?.id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!cart) return <div className="text-center py-8">Cart not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Cart #{cart.id}</h1>
      <p className="text-gray-600 mb-6">User ID: {cart.userId}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="space-y-4">
          {cart.products.map((product, index) => (
            <CartItem key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
