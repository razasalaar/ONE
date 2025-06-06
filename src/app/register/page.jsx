"use client";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const Router = useRouter();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setSuccessMessage("Registration successful!");
      toast.success("Registration successful!");
      setTimeout(() => {
        Router.push("/login");
      }, 1500);
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setPasswordError("");

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // First check password match
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match!");
      toast.error("Passwords don't match!");
      return;
    }

    // Then check terms agreement
    if (!agreeToTerms) {
      setFormError("You must agree to the Terms and Conditions to sign up.");
      toast.error("You must agree to the Terms and Conditions");
      return;
    }

    // If all validation passes, submit form
    mutate({ username, email, password });
  };

  return (
    <section className="min-h-screen w-full bg-[#f7f9fb] flex items-center justify-center px-4 py-4">
      <div className="max-w-5xl w-full bg-[#f7f9fb] rounded-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
          <Image
            src="/image/login.png"
            alt="Login illustration"
            width={700}
            height={500}
            className="w-full h-auto max-w-[180px] md:max-w-[300px]"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 p-5 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold text-sky-950 mb-4 text-center">
            Create Your Account
          </h2>

          <div className="flex justify-center mb-3 gap-2">
            <button
              type="button"
              className="social-button hover:bg-sky-900 cursor-pointer"
              aria-label="Sign up with Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>

            <button
              type="button"
              className="social-button hover:bg-sky-900 cursor-pointer"
              aria-label="Sign up with Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>

            <button
              type="button"
              className="social-button hover:bg-sky-900 cursor-pointer"
              aria-label="Sign up with LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </button>
          </div>

          <div className="my-3 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <p className="mx-4 mb-0 text-center font-semibold text-xs text-gray-500">
              OR
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mx-auto ">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Create a password"
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 text-xs text-gray-500 cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 text-xs text-gray-500 cursor-pointer"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                id="terms"
                className="mr-2 h-3.5 w-3.5 border-gray-300 text-sky-950 focus:ring-sky-950"
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-sky-950 hover:text-sky-800">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {formError && (
              <p className="mt-1 text-xs text-red-600">{formError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-full bg-sky-950 px-7 py-2 text-sm font-medium uppercase text-white shadow hover:bg-sky-900 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {error && <p className="text-red-600 text-xs">{error.message}</p>}
            {successMessage && (
              <p className="text-green-600 text-xs">{successMessage}</p>
            )}
            {passwordError && (
              <p className="mt-1 text-xs text-red-600">{passwordError}</p>
            )}

            <div className="mt-3 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-sky-950 hover:text-sky-800 font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .social-button {
          height: 32px;
          width: 32px;
          border-radius: 9999px;
          background-color: #0c4a6e;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .social-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
}
