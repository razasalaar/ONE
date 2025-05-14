// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { addToCart } from "../../redux/Cartslice";
// import { useDispatch } from "react-redux";

// export default function ProductCard({ product }) {
//   const dispatch = useDispatch();
//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg h-full flex flex-col">
//       <div className="relative w-full h-48">
//         <Image
//           src={product.image}
//           alt={product.title}
//           fill
//           className="object-contain p-4"
//           sizes="(max-width: 768px) 100vw, 300px"
//           priority
//         />
//       </div>
//       <div className="p-4 flex flex-col" style={{ minHeight: "180px" }}>
//         <h3 className="font-semibold text-md mb-2 line-clamp-2">
//           {product.title}
//         </h3>
//         <p className="text-gray-600 mb-2">${product.price}</p>
//         <p className="text-sm text-gray-500 mb-4 line-clamp-2">
//           {product.description}
//         </p>
//         <div className="mt-auto">
//           <Link
//             href={`/products/${product.id}`}
//             className="text-blue-600 hover:underline"
//           >
//             View Details
//           </Link>
//           <button
//             onClick={handleAddToCart}
//             className="ml-4 px-4 py-2 cursor-pointer bg-gradient-to-r from-green-500 to-green-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:scale-95"
//           >
//             Add To Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
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
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Product Image with Overlay on Hover */}
      <div className="relative h-64 w-full overflow-hidden">
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-101"
            sizes="(max-width: 168px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full items-center justify-center space-x-4">
            <Link
              href={`/products/${product.id}`}
              className="rounded-full bg-white p-3 text-gray-800 shadow-md transition-all hover:bg-gray-100"
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
            </Link>
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-white p-3 cursor-pointer  text-gray-800 shadow-md transition-all hover:bg-gray-100"
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
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-gray-900 line-clamp-1">
            {product.title}
          </h3>
          <span className="font-semibold text-indigo-600">
            ${product.price}
          </span>
        </div>

        <p className="mb-4 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
