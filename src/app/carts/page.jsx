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
      <div className="min-h-screen bg-[#f7f9fb] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-950 mb-6">
            Your Cart ({cartItems.length})
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                Your cart is empty
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-sky-950 text-white rounded-full hover:bg-sky-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-950"
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
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#f7f9fb] rounded-lg hover:bg-gray-100 transition-colors"
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
                    <h3 className="font-semibold text-sky-950 line-clamp-1 text-base sm:text-lg ">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="px-3 py-2 text-sky-950 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
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
                        className="px-3 py-2 text-sky-950 hover:bg-gray-200 focus:outline-none"
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-sky-950 w-20 text-right hidden sm:block">
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
                  <p className="font-semibold text-sky-950 w-full text-right sm:hidden">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-base sm:text-lg text-sky-950 mb-2">
                  <p>Subtotal</p>
                  <p className="font-semibold">${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base sm:text-lg text-gray-500 mb-4">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-lg sm:text-xl font-bold text-sky-950 mb-8">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>

                <div className="flex justify-between flex-col sm:flex-row gap-4">
                  <div>
                    <button
                      onClick={handleClearCart}
                      className="px-6 py-3 text-sky-950 cursor-pointer border border-sky-950 rounded-full hover:bg-sky-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-950 text-sm font-semibold uppercase"
                      aria-label="Clear cart"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="flex sm:flex-row gap-4">
                    <Link
                      href="/products"
                      className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 text-center text-sky-950 text-sm font-semibold uppercase"
                      aria-label="Continue shopping"
                    >
                      Continue Shopping
                    </Link>

                    <Link
                      href="/checkout"
                      className="px-6 bg-sky-950 hover:bg-sky-900 text-white font-medium py-3 rounded-full transition-all duration-300 text-center text-sm font-semibold uppercase"
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
      <section className="py-16 bg-sky-950 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-black text-3xl md:text-4xl mb-6">
            Ready to Experience ONE?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who trust us for their fashion
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="bg-[#f7d0b6] text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full">
                Shop Now
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-950 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
