"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.success) {
      console.warn("Logout API failed:", result.message);
      alert(result.message);
    }

    router.push("/");
  };

  return (
    <header className="shadow-lg rounded-lg  w-full">
      <nav className="flex h-auto w-auto justify-between items-center md:h-16 px-4">
        {/* Logo */}
        <div
          className={`w-1/2 md:w-1/5 font-semibold ${
            menuOpen ? "hidden md:flex md:justify-center" : "flex items-center"
          }`}
        >
          <Link
            className="text-red-700 font-bold text-2xl md:text-4xl"
            href="/dashboard"
          >
            ONE
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex w-2/6 justify-evenly font-semibold">
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-lg transition-colors text-gray-800 font-medium ${
              pathname === "/dashboard" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/about"
                className={`px-4 py-2 rounded-lg transition-colors text-gray-800 font-medium ${
                  pathname === "/about" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className={`px-4 py-2 rounded-lg transition-colors text-gray-800 font-medium ${
                  pathname === "/products" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                Products
              </Link>
              <Link
                href="/contact"
                className={`px-4 py-2 rounded-lg transition-colors text-gray-800 font-medium ${
                  pathname === "/contact" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex w-1/5 justify-evenly font-semibold">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden  text-gray-500  w-10 h-10 relative focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col space-y-2 px-6 py-4 flex-grow">
          {/* Menu Items */}
          <Link
            href="/dashboard"
            className={`px-4 py-3 rounded-lg transition-colors text-gray-800 font-medium ${
              pathname === "/dashboard" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`px-4 py-3 rounded-lg transition-colors text-gray-800 font-medium ${
              pathname === "/about" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          {/* Products */}
          <Link
            href="/products"
            className={`px-4 py-3 rounded-lg transition-colors text-gray-800 font-medium ${
              pathname === "/products" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`px-4 py-3 rounded-lg transition-colors text-gray-800 font-medium ${
              pathname === "/contact" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-gray-800 w-30 text-white px-4 py-1 rounded hover:bg-gray-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 w-30 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
