import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../store";
import { FaStar, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { products } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarScrollPosition, setSimilarScrollPosition] = useState(0);
  const similarProductsRef = useRef(null);
  const dispatch = useDispatch();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const findProduct = () => {
      try {
        setLoading(true);
        
        // Ensure products is an array and has items
        if (!Array.isArray(products) || products.length === 0) {
          throw new Error('No products available');
        }
        
        // Find product by id or slug
        const foundProduct = products.find(p => {
          if (!p) return false; // Skip undefined/null products
          return (p.slug && p.slug === id) || 
                 (p.id && p.id.toString() === id);
        });

        if (!foundProduct) {
          throw new Error(`Product with ID/Slug "${id}" not found`);
        }

        setProduct(foundProduct);
        
        // Set default variant and size if variants exist
        if (foundProduct.variants?.length > 0) {
          setSelectedVariant(0);
          setSelectedSize(foundProduct.variants[0].size?.[0] || '');
        } else {
          // Reset variant and size if no variants
          setSelectedVariant(0);
          setSelectedSize('');
        }
        
        // Find similar products from the same category
        if (foundProduct.category) {
          const similar = products
            .filter(p => {
              if (!p || p.id === foundProduct.id) return false;
              
              // If it's a t-shirt, show other t-shirts
              if (foundProduct.category?.toLowerCase().includes('t-shirt')) {
                return p.category?.toLowerCase().includes('t-shirt');
              }
              return p.category === foundProduct.category;
            })
            .sort(() => 0.5 - Math.random()) // Shuffle the array
            .slice(0, 4);
          
          setSimilarProducts(similar);
        } else {
          setSimilarProducts([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error finding product:', err);
        setError(err.message || 'Product not found. Please check the URL or return to the shop.');
        setProduct(null);
        setSimilarProducts([]);
      } finally {
        setLoading(false);
      }
    };

    findProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      ...product,
      selectedVariant: product.variants ? selectedVariant : null,
      selectedSize: selectedSize,
      quantity: 1
    };
    
    dispatch(addCart(cartItem));
    
    // Show notification
    setNotificationMessage(`${product.name} added to cart !`);
    setNotificationType('success');
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleVariantSelect = (index) => {
    setSelectedVariant(index);
    if (product.variants?.[index]?.size) {
      setSelectedSize(product.variants[index].size[0]);
    }
    setCurrentImageIndex(0);
  };

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  const handleSimilarAddToCart = (product) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      qty: 1,
      slug: product.slug
    };
    
    dispatch(addCart(item));
    setNotificationMessage(`${product.name} added to cart successfully!`);
    setNotificationType('success');
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleSimilarQuickView = (product) => {
    navigate(`/product/${product.slug || product.id}`);
  };

  const scrollSimilarProducts = (direction) => {
    if (!similarProductsRef.current) return;
    
    const container = similarProductsRef.current;
    const scrollAmount = 300; // Adjust this value to control scroll distance
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    
    setSimilarScrollPosition(container.scrollLeft);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="mb-4">{error || 'The requested product could not be found.'}</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants?.[selectedVariant] || {};
  const images = currentVariant.images || product.images || [product.image];
  const price = currentVariant.price || product.price;
  const originalPrice = currentVariant.originalPrice || product.originalPrice;

  return (
    <div className="min-h-screen bg-white">
      {/* Notification */}
      {showNotification && (
        <div 
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[1000] px-6 py-3 rounded-lg shadow-lg ${
            notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white transition-all duration-300`}
          style={{
            animation: 'slideDown 0.3s ease-out',
          }}
        >
          {notificationMessage}
        </div>
      )}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            transform: translate(-50%, -20px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Shop
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-transparent rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`border-2 rounded overflow-hidden ${
                      currentImageIndex === index ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="bg-transparent w-full h-24 object-contain border-none"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {product.rating && (
              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <FaStar
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            )}

            <div className="mt-6">
              <p className="text-3xl text-gray-900">${price.toFixed(2)}</p>
              {originalPrice && originalPrice > price && (
                <p className="text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 space-y-4">
                <p className="text-base text-gray-700">{product.description}</p>
              </div>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.variants[0].color ? 'Color' : 'Options'}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => handleVariantSelect(index)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        selectedVariant === index
                          ? 'bg-black text-white border-gray-900'
                          : 'border-black-300 text-black-700 hover:bg-gray-50'
                      }`}
                    >
                      {variant.color || `Option ${index + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {currentVariant?.size && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {currentVariant.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 flex items-center justify-center border rounded-md text-sm ${
                        selectedSize === size
                          ? 'bg-black text-white border-gray-900'
                          : 'border-black-300 text-black-700 hover:bg-black-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center bg-black text-white px-8 py-3 text-base font-medium rounded-md hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500"
              >
                <FaShoppingCart className="mr-2" />
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {product.category?.toLowerCase().includes('t-shirt') 
                  ? 'More T-Shirts You May Like'
                  : `More in ${product.category}`}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => scrollSimilarProducts('left')}
                  disabled={similarScrollPosition <= 0}
                  className={`p-2 rounded-full ${similarScrollPosition <= 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollSimilarProducts('right')}
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div 
              ref={similarProductsRef}
              className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] sm:auto-cols-[minmax(300px,1fr)] lg:auto-cols-[minmax(320px,1fr)] xl:auto-cols-[minmax(350px,1fr)] gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
              style={{
                scrollBehavior: 'smooth',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
            >
              {similarProducts.map((item, index) => (
                <ProductCard 
                  key={item.id}
                  product={item}
                  index={index}
                  onQuickView={handleSimilarQuickView}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Product;
