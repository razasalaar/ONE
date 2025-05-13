"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";
import Navbar from "../components/Navbar";
export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="w-full h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-50">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            className="absolute top-0 left-0 w-full h-full object-cover "
            alt="Fashion"
            loading="eager"
          />
          <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-center md:text-left animate-fadeIn">
              <span className="uppercase text-white text-sm font-bold mb-4 block tracking-widest">
                PREMIUM FASHION
              </span>
              <h1 className="text-white font-extrabold text-3xl sm:text-5xl lg:text-5xl mb-6 leading-tight">
                Welcome to <span className="text-red-700">ONE</span> – Your
                Trendy Clothing Store
              </h1>
              <p className="text-stone-100 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                Discover the finest collection of modern fashion wear,
                handpicked to elevate your style every day.
              </p>
              <Link href="/products">
                <button className="bg-white cursor-pointer hover:bg-red-500   text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full shadow-lg">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="bg-[#f7d0b6] py-16 px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-black text-sky-950 text-3xl md:text-4xl mb-4">
                ONE is redefining fashion in{" "}
                <span className="text-white">50+ countries</span>
              </h2>
              <p className="text-sky-950 text-lg">
                From casual wear to elegant evening outfits, our fashion line is
                designed for modern men and women with taste.
              </p>
            </div>
            <Link href="/products">
              <button className="bg-sky-900 hover:bg-sky-950 cursor-pointer text-white hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full border-2 border-sky-900 min-w-[200px]">
                Explore Collection
              </button>
            </Link>
          </div>
        </section>

        {/* Featured Products - 1 */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              <div className="lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right p-8 order-2 lg:order-1">
                <h2 className="text-[#64618C] font-bold text-2xl lg:text-3xl mb-6">
                  Best-Selling Outfit of the Month
                </h2>
                <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    alt="Clothing"
                    loading="lazy"
                  />
                </div>
                <p className="mt-6 text-sky-950 max-w-md">
                  This month's customer favorite - now with 15% discount for
                  limited time.
                </p>
              </div>

              <div className="lg:w-1/2 bg-sky-950 text-white p-12 rounded-xl relative overflow-hidden order-1 lg:order-2">
                <div className="relative z-20">
                  <h2 className="text-pink-300 font-black text-4xl md:text-5xl leading-tight mb-6">
                    Elevate Your Style with ONE
                  </h2>
                  <p className="text-white text-lg mb-8">
                    Choose from a wide variety of high-quality T-shirts, jeans,
                    jackets, and ethnic wear. Comfort meets luxury in every
                    piece we offer.
                  </p>
                  <Link href="/products">
                    <button className="bg-pink-300 hover:bg-pink-400 cursor-pointer text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full">
                      See Product
                    </button>
                  </Link>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#f7d0b6] rounded-full opacity-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products - 2 */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              <div className="lg:w-1/2 bg-[#f7d0b6] text-sky-950 p-12 rounded-xl relative overflow-hidden">
                <div className="relative z-20">
                  <h2 className="text-sky-950 font-black text-4xl md:text-5xl leading-tight mb-6">
                    Trendy & Comfortable Clothing
                  </h2>
                  <p className="text-sky-950 text-lg mb-8">
                    Crafted with breathable fabrics, our products ensure you're
                    stylish and comfortable all day long. Perfect for every
                    season.
                  </p>
                  <Link href="/products">
                    <button className="bg-sky-900 hover:bg-sky-950 cursor-pointer text-white hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full border-2 border-sky-900">
                      View Details
                    </button>
                  </Link>
                </div>
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-sky-950 rounded-full opacity-10"></div>
              </div>

              <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left p-8">
                <h2 className="text-[#64618C] font-bold text-2xl lg:text-3xl mb-6">
                  Handpicked Styles
                </h2>
                <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1920&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    alt="Latest fashion"
                    loading="lazy"
                  />
                </div>
                <p className="mt-6 text-sky-950 max-w-md">
                  Curated collections updated weekly by our fashion experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sky-950 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-black text-3xl md:text-4xl mb-6">
              Join Our Fashion Community
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Get 15% off your first order and exclusive access to new
              collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-full text-sky-950 focus:outline-none"
              />
              <button className="bg-[#f7d0b6] text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
