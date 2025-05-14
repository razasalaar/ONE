"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/Cartslice";

import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaArrowLeft,
  FaLock,
  FaShoppingCart,
} from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import ProtectedRoute from "../components/ProtectedRoute";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
];

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState("shipping"); // 'shipping' or 'payment'

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format credit card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);

      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    // Format expiry date
    if (name === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);

      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (step) => {
    const newErrors = {};

    if (step === "shipping" || step === "all") {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }

      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.postalCode.trim())
        newErrors.postalCode = "Postal code is required";
      if (!formData.country) newErrors.country = "Country is required";
    }

    if (
      (step === "payment" || step === "all") &&
      paymentMethod === "credit-card"
    ) {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }

      if (!formData.expiry.trim()) {
        newErrors.expiry = "Expiration date is required";
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiry)) {
        newErrors.expiry = "Invalid expiration date";
      } else {
        // Check if card is expired
        const [month, year] = formData.expiry.split("/");
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const currentDate = new Date();

        if (expiryDate < currentDate) {
          newErrors.expiry = "Card is expired";
        }
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3-4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateForm("shipping")) {
      setActiveStep("payment");
      // Smooth scroll to top of form
      document
        .getElementById("checkout-form")
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToShipping = () => {
    setActiveStep("shipping");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm("all")) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowConfirmation(true);
    } catch (error) {
      console.error("Checkout error:", error);
      // Would handle specific error messages here in production
    } finally {
      setIsLoading(false);
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <ProtectedRoute>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep === "shipping"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-1">Shipping</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div
                    className={`h-full ${
                      activeStep === "payment" ? "bg-blue-600" : "bg-gray-200"
                    }`}
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep === "payment"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-1">Payment</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                    3
                  </div>
                  <span className="text-sm mt-1">Confirmation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <div
                id="checkout-form"
                className="mb-6 flex items-center justify-between"
              >
                <h2 className="text-2xl font-semibold">
                  {activeStep === "shipping"
                    ? "Shipping Details"
                    : "Payment Method"}
                </h2>
                {activeStep === "payment" && (
                  <button
                    onClick={handleBackToShipping}
                    className="text-blue-600 flex items-center hover:text-blue-800 focus:outline-none"
                    aria-label="Back to shipping details"
                  >
                    <FaArrowLeft className="mr-1" /> Back
                  </button>
                )}
              </div>

              <form
                onSubmit={
                  activeStep === "shipping"
                    ? handleContinueToPayment
                    : handleSubmit
                }
                className="space-y-6"
              >
                {/* Shipping Information */}
                {activeStep === "shipping" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          autoComplete="name"
                          className={`mt-1 block w-full p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          aria-invalid={errors.fullName ? "true" : "false"}
                          aria-describedby={
                            errors.fullName ? "fullName-error" : undefined
                          }
                        />
                        {errors.fullName && (
                          <p
                            className="text-red-500 text-sm mt-1"
                            id="fullName-error"
                          >
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="email"
                          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            className="text-red-500 text-sm mt-1"
                            id="email-error"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block  text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        autoComplete="tel"
                        className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        autoComplete="street-address"
                        className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                        aria-invalid={errors.address ? "true" : "false"}
                        aria-describedby={
                          errors.address ? "address-error" : undefined
                        }
                      />
                      {errors.address && (
                        <p
                          className="text-red-500 text-sm mt-1"
                          id="address-error"
                        >
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          autoComplete="address-level2"
                          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          }`}
                          aria-invalid={errors.city ? "true" : "false"}
                          aria-describedby={
                            errors.city ? "city-error" : undefined
                          }
                        />
                        {errors.city && (
                          <p
                            className="text-red-500 text-sm mt-1"
                            id="city-error"
                          >
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="postalCode"
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          autoComplete="postal-code"
                          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.postalCode
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          aria-invalid={errors.postalCode ? "true" : "false"}
                          aria-describedby={
                            errors.postalCode ? "postalCode-error" : undefined
                          }
                        />
                        {errors.postalCode && (
                          <p
                            className="text-red-500 text-sm mt-1"
                            id="postalCode-error"
                          >
                            {errors.postalCode}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          autoComplete="country"
                          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.country
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          aria-invalid={errors.country ? "true" : "false"}
                          aria-describedby={
                            errors.country ? "country-error" : undefined
                          }
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <p
                            className="text-red-500 text-sm mt-1 p-2"
                            id="country-error"
                          >
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                {activeStep === "payment" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("credit-card")}
                        className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === "credit-card"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        aria-pressed={paymentMethod === "credit-card"}
                      >
                        <FaCreditCard className="text-2xl mb-2" />
                        <span>Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === "paypal"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        aria-pressed={paymentMethod === "paypal"}
                      >
                        <FaPaypal className="text-2xl mb-2" />
                        <span>PayPal</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("digital-wallet")}
                        className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === "digital-wallet"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        aria-pressed={paymentMethod === "digital-wallet"}
                      >
                        <div className="flex gap-2">
                          <FaApplePay className="text-2xl" />
                          <FaGooglePay className="text-2xl" />
                        </div>
                        <span>Digital Wallet</span>
                      </button>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4 mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              id="cardNumber"
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="XXXX XXXX XXXX XXXX"
                              autoComplete="cc-number"
                              className={`block w-full p-2 rounded-md pr-10 focus:border-blue-500 focus:ring-blue-500 ${
                                errors.cardNumber
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              aria-invalid={
                                errors.cardNumber ? "true" : "false"
                              }
                              aria-describedby={
                                errors.cardNumber
                                  ? "cardNumber-error"
                                  : undefined
                              }
                              maxLength={19}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <FaCreditCard className="text-gray-400" />
                            </div>
                          </div>
                          {errors.cardNumber && (
                            <p
                              className="text-red-500 text-sm mt-1"
                              id="cardNumber-error"
                            >
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="expiry"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Expiration Date{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="expiry"
                              type="text"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              autoComplete="cc-exp"
                              className={`mt-1 block p-2 w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                errors.expiry
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              aria-invalid={errors.expiry ? "true" : "false"}
                              aria-describedby={
                                errors.expiry ? "expiry-error" : undefined
                              }
                            />
                            {errors.expiry && (
                              <p
                                className="text-red-500 text-sm mt-1"
                                id="expiry-error"
                              >
                                {errors.expiry}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-700"
                            >
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="cvv"
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              autoComplete="cc-csc"
                              className={`mt-1 block p-2 w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                errors.cvv
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              aria-invalid={errors.cvv ? "true" : "false"}
                              aria-describedby={
                                errors.cvv ? "cvv-error" : undefined
                              }
                              maxLength={4}
                            />
                            {errors.cvv && (
                              <p
                                className="text-red-500 text-sm mt-1"
                                id="cvv-error"
                              >
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-center text-gray-600">
                          You'll be redirected to PayPal to complete your
                          purchase securely.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "digital-wallet" && (
                      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-center text-gray-600">
                          Choose your preferred wallet on the next screen.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={
                      activeStep === "shipping" ? clearCart : handleClearCart
                    }
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    aria-busy={isLoading ? "true" : "false"}
                  >
                    {isLoading ? (
                      <>
                        <BiLoaderAlt className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : activeStep === "shipping" ? (
                      "Continue to Payment"
                    ) : (
                      <span className="flex items-center">
                        <FaLock className="mr-2" /> Complete Purchase
                      </span>
                    )}
                  </button>

                  {activeStep === "payment" && (
                    <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center">
                      <FaLock className="mr-1" /> Your payment information is
                      secured with 256-bit encryption
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className=" h-auto w-auto object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/64";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-md">
                    <p className="font-medium">Free shipping applied!</p>
                    <p>Orders over $100 qualify for free shipping.</p>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <Link
                    href="/carts"
                    className="text-blue-600 flex items-center hover:text-blue-800 text-sm"
                  >
                    <FaArrowLeft className="mr-1" /> Back to cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Confirmation Modal */}
        {showConfirmation && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">
                Order Confirmed!
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Thank you for your purchase, {formData.fullName}. We've sent a
                confirmation email to <strong>{formData.email}</strong> with
                your order details.
              </p>
              <div className="bg-gray-50 p-4 rounded mb-6">
                <p className="font-medium">
                  Order Number: #ORD-
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
                <p className="text-gray-500">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  router.push("/");
                }}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
