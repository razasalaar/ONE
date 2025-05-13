"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/components/AuthProvider";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/Cartslice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  //   const [isClient, setIsClient] = useState(false);
  //   const { isAuthenticated, loading } = useAuth();
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
    <div className="container mx-auto p-4  ">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8 ">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link
            href="/products"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6 ">
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row border rounded-lg p-4"
              >
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">
                    Price: ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center mb-4">
                    <span className="mr-4">Quantity:</span>
                    <button
                      onClick={() => handleDecrement(item)}
                      className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="font-medium">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/products"
                className="px-6 py-2 max-md:text-[12px] text-center justify-center items-center border rounded hover:bg-gray-100"
              >
                Continue Shopping
              </Link>
              <button className="px-6 py-2 max-md:text-[14px] bg-green-600 text-white rounded hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
