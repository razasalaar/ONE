"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/Cartslice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
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

      <div className="min-h-screen bg-[#f7f9fb] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep === "shipping"
                        ? "bg-sky-950 text-white"
                        : "bg-white text-sky-950 border border-sky-950"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-1 text-sky-950">Shipping</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div
                    className={`h-full ${
                      activeStep === "payment" ? "bg-sky-950" : "bg-gray-200"
                    }`}
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep === "payment"
                        ? "bg-sky-950 text-white"
                        : "bg-white text-sky-950 border border-sky-950"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-1 text-sky-950">Payment</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-sky-950 border border-sky-950">
                    3
                  </div>
                  <span className="text-sm mt-1 text-sky-950">
                    Confirmation
                  </span>
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
                <h2 className="text-2xl font-semibold text-sky-950">
                  {activeStep === "shipping"
                    ? "Shipping Details"
                    : "Payment Method"}
                </h2>
                {activeStep === "payment" && (
                  <button
                    onClick={handleBackToShipping}
                    className="text-sky-950 flex items-center hover:text-sky-800 focus:outline-none"
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
                {activeStep === "shipping" && (
                  <div className="space-y-6 p-2">
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 3 },
                        "& .MuiInputLabel-root": { color: "#0c4a6e" }, // sky-950 equiv
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#0c4a6e",
                        },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                          { borderBottomColor: "#0c4a6e" },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#0c4a6e",
                        },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {/* Full Name and Email in one row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                          id="fullName"
                          label="Full Name"
                          variant="standard"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          autoComplete="name"
                          error={!!errors.fullName}
                          helperText={errors.fullName}
                          required
                          fullWidth
                        />

                        <TextField
                          id="email"
                          label="Email Address"
                          variant="standard"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="email"
                          error={!!errors.email}
                          helperText={errors.email}
                          required
                          fullWidth
                        />
                      </div>

                      {/* Phone and Address in one row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                          id="phone"
                          label="Phone Number"
                          variant="standard"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          autoComplete="tel"
                          fullWidth
                        />

                        <TextField
                          id="address"
                          label="Street Address"
                          variant="standard"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          autoComplete="street-address"
                          error={!!errors.address}
                          helperText={errors.address}
                          required
                          fullWidth
                        />
                      </div>

                      {/* City, Postal Code, and Country in one row (3 columns) */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextField
                          id="city"
                          label="City"
                          variant="standard"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          autoComplete="address-level2"
                          error={!!errors.city}
                          helperText={errors.city}
                          required
                          fullWidth
                        />

                        <TextField
                          id="postalCode"
                          label="Postal Code"
                          variant="standard"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          autoComplete="postal-code"
                          error={!!errors.postalCode}
                          helperText={errors.postalCode}
                          required
                          fullWidth
                        />

                        <TextField
                          id="country"
                          select
                          label="Country"
                          variant="standard"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          autoComplete="country"
                          error={!!errors.country}
                          helperText={errors.country}
                          required
                          fullWidth
                        >
                          <MenuItem value="">Select a country</MenuItem>
                          {countries.map((country) => (
                            <MenuItem key={country} value={country}>
                              {country}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </Box>
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
                            ? "border-sky-950 bg-sky-50"
                            : "border-gray-200 hover:bg-[#f7f9fb]"
                        }`}
                        aria-pressed={paymentMethod === "credit-card"}
                      >
                        <FaCreditCard className="text-2xl mb-2 text-sky-950" />
                        <span className="text-sky-950">Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === "paypal"
                            ? "border-sky-950 bg-sky-50"
                            : "border-gray-200 hover:bg-[#f7f9fb]"
                        }`}
                        aria-pressed={paymentMethod === "paypal"}
                      >
                        <FaPaypal className="text-2xl mb-2 text-sky-950" />
                        <span className="text-sky-950">PayPal</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("digital-wallet")}
                        className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === "digital-wallet"
                            ? "border-sky-950 bg-sky-50"
                            : "border-gray-200 hover:bg-[#f7f9fb]"
                        }`}
                        aria-pressed={paymentMethod === "digital-wallet"}
                      >
                        <div className="flex gap-2 text-sky-950">
                          <FaApplePay className="text-2xl" />
                          <FaGooglePay className="text-2xl" />
                        </div>
                        <span className="text-sky-950">Digital Wallet</span>
                      </button>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4 mt-4 p-4 border border-gray-200 rounded-lg bg-[#f7f9fb]">
                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-sky-950"
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
                              className={`block w-full p-2 rounded-md pr-10 focus:border-sky-950 focus:ring-sky-950 ${
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
                              <FaCreditCard className="text-sky-950" />
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
                              className="block text-sm font-medium text-sky-950"
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
                              className={`mt-1 block p-2 w-full rounded-md shadow-sm focus:border-sky-950 focus:ring-sky-950 ${
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
                              className="block text-sm font-medium text-sky-950"
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
                              className={`mt-1 block p-2 w-full rounded-md shadow-sm focus:border-sky-950 focus:ring-sky-950 ${
                                errors.cvv
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              aria-invalid={errors.cvv ? "true" : "false"}
                              aria-describedby={
                                errors.cvv ? "cvv-error" : undefined
                              }
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
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={
                      activeStep === "shipping" ? clearCart : handleClearCart
                    }
                    className="w-full bg-sky-950 text-white py-3 px-4 rounded-full hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-950 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
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
              <h2 className="text-2xl font-semibold mb-6 text-sky-950">
                Order Summary
              </h2>
              <div className="space-y-4 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded overflow-hidden bg-[#f7f9fb]">
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
                        <h3 className="font-medium text-sky-950">
                          {item.name}
                        </h3>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-sky-950">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-sky-950">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="text-sky-950">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                    <span className="text-sky-950">Total</span>
                    <span className="text-sky-950">${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <div className="mt-4 p-3 bg-[#f7f9fb] text-sky-950 text-sm rounded-md border border-[#f7d0b6]">
                    <p className="font-medium">Free shipping applied!</p>
                    <p>Orders over $100 qualify for free shipping.</p>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <Link
                    href="/carts"
                    className="text-sky-950 flex items-center hover:text-sky-800 text-sm"
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
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#f7d0b6] mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-sky-950"
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
              <h3 className="text-2xl font-semibold text-center mb-4 text-sky-950">
                Order Confirmed!
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Thank you for your purchase, {formData.fullName}. We've sent a
                confirmation email to <strong>{formData.email}</strong> with
                your order details.
              </p>
              <div className="bg-[#f7f9fb] p-4 rounded mb-6">
                <p className="font-medium text-sky-950">
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
                className="w-full bg-sky-950 text-white py-3 px-4 rounded-full hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-950 focus:ring-offset-2 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
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
    </ProtectedRoute>
  );
}
