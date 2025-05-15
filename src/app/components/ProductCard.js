"use client";

import Link from "next/link";
import Image from "next/image";
import { addToCart } from "../../redux/Cartslice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* Badge for new products or promotions */}
      {product.id % 3 === 0 && (
        <div className="absolute top-4 left-4 z-10 bg-sky-950 text-white text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </div>
      )}

      {/* Product Image with Overlay */}
      <div
        className="relative block"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-[280px] w-full overflow-hidden bg-[#f7f9fb]">
            {product.image && (
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-contain transition-all duration-500 p-4 ${
                  isImageHovered ? "scale-110" : "scale-100"
                }`}
              />
            )}

            {/* Quick Actions Overlay - Shows only when hovering over image */}
            <div
              className={`absolute inset-0 bg-black/10 opacity-0 flex items-center justify-center space-x-3 transition-opacity duration-300 ${
                isImageHovered ? "opacity-100" : ""
              }`}
            >
              <button
                onClick={handleAddToCart}
                className="bg-sky-950 text-white p-3 rounded-full shadow-md transition-transform duration-300 hover:bg-sky-900 transform hover:scale-105 cursor-pointer"
                aria-label="Add to Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/products/${product.id}`);
                }}
                className="bg-white text-sky-950 p-3 rounded-full shadow-md transition-transform duration-300 hover:bg-gray-100 transform hover:scale-105 cursor-pointer"
                aria-label="View Details"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {product.category || "Fashion"}
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-sky-950 line-clamp-1 text-lg">
            {product.title}
          </h3>
          <div className="font-bold text-sky-950 ml-2">
            ${product.price?.toFixed(2) || product.price}
          </div>
        </div>

        {/* Rating - if available */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating.rate)
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
            <span className="text-xs text-gray-500 ml-2">
              ({product.rating.count} reviews)
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Add to Cart Button - Visible as main action */}
        <button
          onClick={handleAddToCart}
          className="w-full rounded-full bg-sky-950 px-4 py-3 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-sky-900 transform hover:translate-y-[-2px] cursor-pointer"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
