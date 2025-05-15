"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StyledBadge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api";

export default function Navbar() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
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
    <header className="shadow-lg rounded-lg w-full bg-white">
      <nav className="flex h-auto items-center justify-between px-4 py-3 md:h-16 md:py-0">
        {/* Logo */}
        <div
          className={`flex items-center font-semibold ${
            menuOpen ? "hidden md:flex" : "flex"
          } w-1/2 md:w-1/5`}
        >
          <Link
            className="text-red-600 font-bold text-2xl md:text-4xl"
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
                href="/products"
                className={`px-4 py-2 rounded-lg transition-colors text-gray-800 font-medium ${
                  pathname === "/products" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                Products
              </Link>
              <Link
                href="/about"
                className={`px-4 py-2 rounded-lg transition-colors text-gray-800 font-medium ${
                  pathname === "/about" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                About Us
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
        <div className="hidden md:flex w-1/5 justify-evenly font-semibold items-center">
          {isLoggedIn ? (
            <div className="flex items-center space-x-6">
              <Link href="/carts" aria-label={`Cart with ${cartCount} items`}>
                <StyledBadge badgeContent={cartCount} color="primary">
                  <ShoppingCartIcon className="text-sky-950" />
                </StyledBadge>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sky-950 hover:bg-sky-50 rounded-lg p-2 transition-colors"
                aria-label="Log out"
              >
                <LogoutIcon />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sky-950 hover:underline">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-sky-950 text-white px-4 py-1 rounded hover:bg-sky-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right Section (Cart + Hamburger) */}
        <div className="flex items-center space-x-4 md:hidden">
          {isLoggedIn && !menuOpen && (
            <Link
              href="/carts"
              onClick={() => setMenuOpen(false)}
              aria-label={`Cart with ${cartCount} items`}
            >
              <StyledBadge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon className="text-sky-950" />
              </StyledBadge>
            </Link>
          )}
          <button
            className="text-sky-950 w-10 h-10 relative focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
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
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col space-y-2 px-6 py-4 bg-white md:hidden">
          <Link
            href="/dashboard"
            className={`px-4 py-3 rounded-lg transition-colors text-gray-800 font-medium ${
              pathname === "/dashboard" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/products"
                className={`px-4 py-3 rounded-lg transition-colors text-gray-800 font-medium ${
                  pathname === "/products" ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Products
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
              <Link
                href="/contact"
                className={`px-4 py-3 rounded-lg transition-colors text-gray-800 font-medium ${
                  pathname === "/contact" ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 rounded-lg bg-sky-50 text-sky-950 hover:bg-sky-100 transition-colors font-medium text-left"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                href="/login"
                className="px-4 py-3 bg-sky-900 text-white rounded-lg hover:bg-sky-950 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-3 bg-sky-950 text-white rounded-lg hover:bg-sky-900 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
