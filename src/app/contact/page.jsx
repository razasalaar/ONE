"use client";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <ProtectedRoute>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="relative overflow-hidden pt-16">
        {/* Hero Section */}
        <section className="w-full h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-50">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="Contact Us"
            loading="eager"
          />
          <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-center md:text-left animate-fadeIn">
              <span className="uppercase text-white text-sm font-bold mb-4 block tracking-widest">
                CONNECT WITH US
              </span>
              <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
                We're here to <span className="text-[#f7d0b6]">help!</span>
              </h1>
              <p className="text-stone-100 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                Reach out for any questions or support, and we'll get back to
                you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-[#f7f9fb] py-16 px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-black text-sky-950 text-2xl sm:text-3xl md:text-4xl mb-4">
                Get in Touch with Us
              </h2>
              <p className="text-sky-950 text-base sm:text-lg mb-8">
                We value your feedback and are here to assist with any
                inquiries.
              </p>
            </div>
            {/* <form
              onSubmit={handleSubmit}
              className="w-full md:w-1/2 bg-[#f7d0b6] p-8 rounded-xl shadow-xl"
            >
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-full text-sky-950 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-full text-sky-950 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl text-sky-950 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-950 text-white hover:bg-opacity-90 transition-all duration-300 uppercase py-3 px-8 text-sm font-semibold rounded-full cursor-pointer"
              >
                Send Message
              </button>
            </form> */}

            <form
              onSubmit={handleSubmit}
              className="w-full md:w-1/2 bg-sky-950 p-8 rounded-xl shadow-xl"
            >
              <Box sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}>
                <TextField
                  variant="standard"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Your Name"
                  InputLabelProps={{
                    sx: {
                      color: "#ffffff",
                      "&.Mui-focused": {
                        color: "#ffffff",
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white", // Sets the input text color to white
                      "&:before": {
                        borderBottomColor: "#ffffff", // Underline color (default state)
                      },
                      "&:after": {
                        borderBottomColor: "#ffffff", // Underline color (focused state)
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "#ffffff", // Underline color (hover state)
                      },
                    },
                  }}
                />

                <TextField
                  variant="standard"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Your Email"
                  InputLabelProps={{
                    sx: {
                      color: "#ffffff",
                      "&.Mui-focused": {
                        color: "#ffffff",
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                      "&:before": {
                        borderBottomColor: "#ffffff",
                      },
                      "&:after": {
                        borderBottomColor: "#ffffff",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "#ffffff",
                      },
                    },
                  }}
                />

                <TextField
                  variant="standard"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  label="Your Message"
                  multiline
                  rows={4}
                  InputLabelProps={{
                    sx: {
                      color: "#ffffff",
                      "&.Mui-focused": {
                        color: "#ffffff",
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                      "&:before": {
                        borderBottomColor: "#ffffff",
                      },
                      "&:after": {
                        borderBottomColor: "#ffffff",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "#ffffff",
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#f7d0b6",
                    color: "#0c4a6e",
                    textTransform: "uppercase",
                    fontWeight: "semibold",
                    py: 1.5,
                    px: 4,
                    borderRadius: "9999px",
                    "&:hover": {
                      backgroundColor: "#f7d0b6",
                      opacity: 0.9,
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </form>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 bg-sky-950 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-black text-2xl sm:text-3xl md:text-4xl mb-6">
              Visit Us or Reach Us
            </h2>
            <p className="text-base sm:text-lg mb-8">
              Our office is located at the heart of the city. Feel free to stop
              by or give us a call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="flex flex-col items-center mb-6 sm:mb-0">
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p>123 Fashion Street, Lahore, Pakistan</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p>+92 300 1234567</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
