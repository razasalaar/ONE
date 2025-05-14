// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { fetchProductById } from "@/lib/api";
// import Navbar from "../../components/Navbar";
// import ProtectedRoute from "@/app/components/ProtectedRoute";
// export default function ProductDetailPage() {
//   const params = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (params?.id) {
//       const loadProduct = async () => {
//         try {
//           const data = await fetchProductById(params.id);
//           setProduct(data);
//         } catch (error) {
//           console.error("Error fetching product:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       loadProduct();
//     }
//   }, [params?.id]);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
//       </div>
//     );
//   if (!product)
//     return <div className="text-center py-8">Product not found</div>;

//   return (
//     <ProtectedRoute>
//       <div className="w-full">
//         <Navbar />
//       </div>

//       <div className="max-w-4xl mt-20   mx-auto bg-white rounded-lg shadow p-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-1/2">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-auto object-contain max-h-96"
//             />
//           </div>
//           <div className="md:w-1/2">
//             <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
//             <p className="text-xl font-semibold text-blue-600 mb-4">
//               ${product.price}
//             </p>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             <div className="bg-gray-100 p-3 rounded">
//               <p className="text-sm text-gray-700">
//                 Category: {product.category}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/lib/api";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Cartslice";

// SVG Icons
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params?.id) {
      const loadProduct = async () => {
        try {
          const data = await fetchProductById(params.id);
          setProduct({
            ...data,
            // For demo purposes - in a real app, you would get these from your API
            images: [
              data.image,
              "/placeholder-1.jpg",
              "/placeholder-2.jpg",
              "/placeholder-3.jpg",
            ],
            rating: data.rating || { rate: 4.5, count: 120 }, // Fallback if no rating exists
          });
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [params?.id]);

  // Handle quantity increase and decrease
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity: quantity,
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon />
            <span className="ml-2">Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <Link
              href="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon />
              <span className="ml-1">Back to products</span>
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Product Images */}
              <div className="md:w-1/2 p-6">
                <div className="h-96 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[activeImage]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                        activeImage === index
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h1>
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(product.rating.rate) ? (
                              <StarIcon />
                            ) : (
                              <StarIcon />
                            )}
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating.rate} ({product.rating.count} reviews)
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {product.category}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-semibold text-gray-900 mb-4">
                    ${product.price.toFixed(2)}
                    {product.price > 50 && (
                      <span className="ml-2 text-sm text-green-600">
                        Free Shipping
                      </span>
                    )}
                  </p>

                  <p className="text-gray-700 mb-6">{product.description}</p>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>
                    <ul className="mt-2 pl-4 list-disc text-sm text-gray-600 space-y-1">
                      <li>Premium quality materials</li>
                      <li>1-year manufacturer warranty</li>
                      <li>Eco-friendly packaging</li>
                      <li>30-day return policy</li>
                    </ul>
                  </div>

                  <div className="flex items-center mb-6">
                    <span className="mr-3 text-sm font-medium text-gray-900">
                      Quantity
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      <ShoppingCartIcon />
                      <span className="ml-2">Add to Cart</span>
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Product Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Material
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    High-quality {product.category} with durable finish
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Dimensions
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    15 x 10 x 5 inches
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                  <p className="mt-1 text-sm text-gray-900">2.5 lbs</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Shipping
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    Usually ships within 2-3 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
