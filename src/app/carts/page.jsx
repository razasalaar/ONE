// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import Link from "next/link";

// import { useRouter } from "next/navigation";

// import {
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
// } from "../../redux/Cartslice";
// import Navbar from "../components/Navbar";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

//   const router = useRouter();

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleIncrement = (item) => {
//     dispatch(addToCart(item));
//   };

//   const handleDecrement = (item) => {
//     if (item.quantity > 1) {
//       dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
//     } else {
//       dispatch(removeFromCart(item.id));
//     }
//   };

//   const handleRemove = (itemId) => {
//     dispatch(removeFromCart(itemId));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="container mx-auto p-4  ">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center py-8 ">
//           <p className="text-lg mb-4">Your cart is empty</p>
//           <Link
//             href="/products"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-6 ">
//           <div className="grid gap-6">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col md:flex-row border rounded-lg p-4"
//               >
//                 <div className="md:w-1/4 mb-4 md:mb-0">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-48 object-contain"
//                   />
//                 </div>
//                 <div className="md:w-3/4 md:pl-6">
//                   <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                   <p className="text-gray-600 mb-2">
//                     Price: ${item.price.toFixed(2)}
//                   </p>

//                   <div className="flex items-center mb-4">
//                     <span className="mr-4">Quantity:</span>
//                     <button
//                       onClick={() => handleDecrement(item)}
//                       className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-1 border-t border-b">
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => handleIncrement(item)}
//                       className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       className="ml-4 text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </button>
//                   </div>

//                   <p className="font-medium">
//                     Subtotal: ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="border-t pt-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
//               <button
//                 onClick={handleClearCart}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Clear Cart
//               </button>
//             </div>

//             <div className="flex justify-end space-x-4">
//               <Link
//                 href="/products"
//                 className="px-6 py-2 max-md:text-[12px] text-center justify-center items-center border rounded hover:bg-gray-100"
//               >
//                 Continue Shopping
//               </Link>

//               <Link
//                 href="/checkout"
//                 className="px-6 py-2 max-md:text-[14px] bg-green-600 text-white rounded hover:bg-green-700"> Proceed to
//                 Checkout
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
// } from "../../redux/Cartslice";
// import Navbar from "../components/Navbar";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const router = useRouter();

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleIncrement = (item) => {
//     dispatch(addToCart(item));
//   };

//   const handleDecrement = (item) => {
//     if (item.quantity > 1) {
//       dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
//     } else {
//       dispatch(removeFromCart(item.id));
//     }
//   };

//   const handleRemove = (itemId) => {
//     dispatch(removeFromCart(itemId));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 pt-20 pb-8 px-4">
//         <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Your Cart ({cartItems.length})
//           </h2>

//           {cartItems.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-lg mb-4">Your cart is empty</p>
//               <Link
//                 href="/products"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-20 h-20 object-contain rounded-md"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-900">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       Price: ${item.price.toFixed(2)}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleDecrement(item)}
//                       className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 border rounded hover:bg-gray-100"
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => handleIncrement(item)}
//                       className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 border rounded hover:bg-gray-100"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="font-semibold text-gray-900 w-20 text-right">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                   <button
//                     onClick={() => handleRemove(item.id)}
//                     className="text-gray-400 hover:text-red-500"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       ></path>
//                     </svg>
//                   </button>
//                 </div>
//               ))}

//               <div className="mt-6 pt-6 border-t">
//                 <div className="flex justify-between text-base text-gray-900 mb-2">
//                   <p>Subtotal</p>
//                   <p className="font-semibold">${total.toFixed(2)}</p>
//                 </div>
//                 <div className="flex justify-between text-base text-gray-500 mb-4">
//                   <p>Shipping</p>
//                   <p>Free</p>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
//                   <p>Total</p>
//                   <p>${total.toFixed(2)}</p>
//                 </div>

//                 <div className="flex justify-between space-x-4">
//                   <button
//                     onClick={handleClearCart}
//                     className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
//                   >
//                     Clear Cart
//                   </button>
//                   <Link
//                     href="/products"
//                     className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
//                   >
//                     Continue Shopping
//                   </Link>
//                   <Link
//                     href="/checkout"
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors text-center"
//                   >
//                     Checkout
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/redux/Cartslice";
import Navbar from "../components/Navbar";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Your Cart ({cartItems.length})
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                Your cart is empty
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Continue shopping"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image || "/fallback-image.jpg"}
                      alt={item.title}
                      fill
                      className="object-contain rounded-md"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900 w-20 text-right hidden sm:block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="font-semibold text-gray-900 w-full text-right sm:hidden">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Summary */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-between text-base sm:text-lg text-gray-900 mb-2">
                  <p>Subtotal</p>
                  <p className="font-semibold">${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base sm:text-lg text-gray-500 mb-4">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 mb-8">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    onClick={handleClearCart}
                    className="px-6 py-3 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Clear cart"
                  >
                    Clear Cart
                  </button>
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <Link
                      href="/products"
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                      aria-label="Continue shopping"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      href="/checkout"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-center"
                      aria-label="Proceed to checkout"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
