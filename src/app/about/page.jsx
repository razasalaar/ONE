// "use client";
// import ProtectedRoute from "@/app/components/ProtectedRoute";
// import Navbar from "@/app/components/Navbar";

// export default function AboutPage() {
//   return (
//     <ProtectedRoute>
//       <Navbar />

//       <div className="relative overflow-hidden">
//         {/* Hero Section */}
//         <section className="w-full h-[80vh] relative overflow-hidden before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-50">
//           <img
//             src="https://images.unsplash.com/photo-1556909212-dfb59d4f1a5d?auto=format&fit=crop&w=1920&q=80"
//             className="absolute top-0 left-0 w-full h-full object-cover"
//             alt="About ONE"
//             loading="eager"
//           />
//           <div className="relative z-20 container mx-auto px-6 h-full flex items-center justify-center">
//             <div className="text-center text-white animate-fadeIn">
//               <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//                 About <span className="text-red-700">ONE</span>
//               </h1>
//               <p className="text-lg max-w-2xl mx-auto">
//                 Discover who we are, what we stand for, and why we’re reshaping
//                 modern fashion across the globe.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Our Story */}
//         <section className="py-16 px-6 bg-white">
//           <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
//             <div className="lg:w-1/2">
//               <h2 className="text-sky-950 font-black text-3xl mb-6">
//                 Our Journey
//               </h2>
//               <p className="text-sky-950 text-lg mb-4">
//                 Founded with passion and purpose, ONE was born to redefine how
//                 fashion speaks to the modern soul. From humble beginnings, we’ve
//                 grown into a movement that empowers individuals through bold
//                 styles, premium fabrics, and creative designs.
//               </p>
//               <p className="text-sky-950 text-lg">
//                 Every stitch and seam is crafted with care, making sure you feel
//                 confident and comfortable no matter the occasion.
//               </p>
//             </div>
//             <div className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
//               <img
//                 src="https://images.unsplash.com/photo-1581578017425-4a18f1d19c0d?auto=format&fit=crop&w=800&q=80"
//                 className="w-full h-full object-cover"
//                 alt="Our Journey"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Our Mission */}
//         <section className="py-16 px-6 bg-[#f7d0b6] text-sky-950">
//           <div className="container mx-auto text-center max-w-3xl">
//             <h2 className="text-3xl font-black mb-6">Our Mission</h2>
//             <p className="text-lg mb-4">
//               To empower people through fashion. We aim to create timeless,
//               high-quality clothing that reflects individuality and supports
//               sustainable practices.
//             </p>
//             <p className="text-lg">
//               Whether you're dressing up for a moment or every day, we’re here
//               to elevate your experience.
//             </p>
//           </div>
//         </section>

//         {/* Meet Our Team */}
//         <section className="py-16 px-6 bg-white">
//           <div className="container mx-auto text-center">
//             <h2 className="text-3xl font-black text-sky-950 mb-10">
//               Meet the Team
//             </h2>
//             <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {[
//                 {
//                   name: "Raza",
//                   role: "Founder & CEO",
//                   img: "https://randomuser.me/api/portraits/men/11.jpg",
//                 },
//                 {
//                   name: "Ayesha",
//                   role: "Creative Director",
//                   img: "https://randomuser.me/api/portraits/women/21.jpg",
//                 },
//                 {
//                   name: "Ali",
//                   role: "Marketing Head",
//                   img: "https://randomuser.me/api/portraits/men/32.jpg",
//                 },
//                 {
//                   name: "Zara",
//                   role: "Product Designer",
//                   img: "https://randomuser.me/api/portraits/women/34.jpg",
//                 },
//               ].map((member, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center text-center bg-[#f7f7f7] rounded-xl p-6 shadow-md"
//                 >
//                   <img
//                     src={member.img}
//                     alt={member.name}
//                     className="w-24 h-24 object-cover rounded-full mb-4"
//                   />
//                   <h3 className="font-semibold text-sky-950 text-lg">
//                     {member.name}
//                   </h3>
//                   <p className="text-sm text-[#64618C]">{member.role}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="py-16 bg-sky-950 text-white text-center">
//           <div className="container mx-auto px-6 max-w-2xl">
//             <h2 className="text-3xl font-black mb-4">
//               Ready to Elevate Your Style?
//             </h2>
//             <p className="text-lg mb-6">
//               Join thousands of fashion-forward customers and discover a new
//               world of modern, expressive clothing.
//             </p>
//             <button className="bg-[#f7d0b6] text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full">
//               Explore Our Collection
//             </button>
//           </div>
//         </section>
//       </div>
//     </ProtectedRoute>
//   );
// }
"use client";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full h-[70vh] overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-50">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Our Team"
          loading="eager"
        />
        <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-center md:text-left animate-fadeIn">
            <span className="uppercase text-white text-sm font-bold mb-4 block tracking-widest">
              OUR STORY
            </span>
            <h1 className="text-white font-extrabold text-3xl sm:text-5xl lg:text-5xl mb-6 leading-tight">
              About <span className="text-red-700">ONE</span> – Redefining
              Fashion
            </h1>
            <p className="text-stone-100 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              We believe fashion should be accessible, sustainable, and make you
              feel confident.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Our Mission"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-pink-300 font-bold uppercase tracking-widest text-sm mb-4 block">
                Our Mission
              </span>
              <h2 className="text-sky-950 font-black text-3xl md:text-4xl leading-tight mb-6">
                To Inspire Confidence Through Fashion
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Founded in 2015, ONE began with a simple idea: create
                high-quality, affordable fashion that empowers people to express
                their unique style.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Today, we're proud to serve customers in over 50 countries, with
                collections that blend contemporary trends with timeless
                elegance.
              </p>
              <button
                onClick={() => router.push("/products")}
                className="bg-sky-950 text-white hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full"
              >
                Explore Our Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#f7f9fb]">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[#f7d0b6] font-bold uppercase tracking-widest text-sm mb-4 block">
            Our Values
          </span>
          <h2 className="text-sky-950 font-black text-3xl md:text-4xl mb-12">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#f7d0b6] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sky-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-sky-950 font-bold text-xl mb-3">Quality</h3>
              <p className="text-gray-600">
                We source only the finest materials and work with skilled
                artisans to create durable, well-crafted clothing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#f7d0b6] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sky-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sky-950 font-bold text-xl mb-3">
                Sustainability
              </h3>
              <p className="text-gray-600">
                Committed to ethical production and reducing our environmental
                impact through responsible practices.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#f7d0b6] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sky-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sky-950 font-bold text-xl mb-3">Community</h3>
              <p className="text-gray-600">
                We believe fashion should bring people together and celebrate
                diversity in all its forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-pink-300 font-bold uppercase tracking-widest text-sm mb-4 block">
              Meet The Team
            </span>
            <h2 className="text-sky-950 font-black text-3xl md:text-4xl mb-6">
              The People Behind ONE
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our talented team of designers, stylists, and customer service
              professionals are dedicated to bringing you the best fashion
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Sarah Williams",
                role: "Creative Director",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Michael Chen",
                role: "Head Designer",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Priya Patel",
                role: "Customer Experience",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
              },
            ].map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative overflow-hidden rounded-xl mb-4 h-80">
                  <img
                    src={member.img}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={member.name}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white text-left">
                      <p className="font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-sky-950 font-bold text-xl">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <button
              onClick={() => router.push("/products")}
              className="bg-[#f7d0b6] text-sky-950 hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full"
            >
              Shop Now
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-950 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
