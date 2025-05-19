"use client";
import { loginUser } from "@/lib/api";
import React, { use, useState } from "react";
import { TERipple } from "tw-elements-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data.success) {
        setLoginError("Invalid username or password");
        toast.error("Invalid username or password");
        return;
      }
      setLoginError(null);
      const { accessToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      toast.success("Login successful!");
      router.push("/dashboard");
    },

    onError: (error) => {
      setLoginError("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    mutate({ username, password });
  };

  return (
    <section className="min-h-screen w-full flex bg-[#f7f9fb] items-center justify-center px-4 py-4">
      <div className="max-w-3xl w-full bg-[#f7f9fb] rounded-lg overflow-hidden flex flex-col lg:flex-row">
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
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-3 mx-auto max-w-sm">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
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

            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-sky-950 px-7 py-2 text-sm font-medium uppercase text-white shadow hover:bg-sky-900 transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {loginError && (
              <p className="text-red-500 mt-2 text-xs text-center">
                {loginError}
              </p>
            )}

            <div className="mt-3 text-center text-xs text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-sky-950 hover:text-sky-800 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
