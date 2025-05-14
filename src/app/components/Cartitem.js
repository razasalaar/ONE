"use client";
import Link from "next/link";

export default function CartItem({ product }) {
  return (
    <div className="flex items-start border-b pb-4">
      <div className="flex-1">
        <Link
          href={`/products/${product.productId}`}
          className="font-medium hover:underline"
        >
          Product #{product.productId}
        </Link>
        <p className="text-gray-600">Quantity: {product.quantity}</p>
      </div>
    </div>
  );
}
