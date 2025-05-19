"use client";
import { loginUser } from "@/lib/api";
import React, { use, useState } from "react";
import { TERipple } from "tw-elements-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data.success) {
        setLoginError("Invalid username or password");
        return;
      }
      setLoginError(null);
      const { accessToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      router.push("/dashboard");
    },

    onError: () => {
      setLoginError("Login failed", error);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    mutate({ username, password });
  };

  return (
    <section className="min-h-screen w-full flex bg-[#f7f9fb] items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-[#f7f9fb] rounded-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <Image
            src="/image/login.png"
            alt="Login illustration"
            width={700}
            height={500}
            className="w-full h-auto max-w-[200px]  md:max-w-[350px]"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-sky-950 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-950"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-sm text-gray-500 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-sky-950 px-7 py-3 text-sm font-medium uppercase text-white shadow hover:bg-sky-900 transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {loginError && (
              <p className="text-red-500 mt-2 text-center">{loginError}</p>
            )}

            <div className="mt-6 text-center text-sm text-gray-600">
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
