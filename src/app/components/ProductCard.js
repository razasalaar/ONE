"use client";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "../../redux/Cartslice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg h-full flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 300px"
          priority
        />
      </div>
      <div className="p-4 flex flex-col" style={{ minHeight: "180px" }}>
        <h3 className="font-semibold text-md mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto">
          <Link
            href={`/products/${product.id}`}
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="ml-4 px-4 py-2 cursor-pointer bg-gradient-to-r from-green-500 to-green-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:scale-95"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
