import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addCart } from '../store';

const ProductCard = ({ 
  product, 
  showHoverIcons = true,
  className = "",
  onQuickView,
  index = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const dispatch = useDispatch();

  // Check if scroll animations are enabled (after loader finishes)
  useEffect(() => {
    const checkAnimationsEnabled = () => {
      if (window.scrollAnimationsEnabled) {
        setAnimationsEnabled(true);
      } else {
        // Check again after a short delay
        setTimeout(checkAnimationsEnabled, 100);
      }
    };

    checkAnimationsEnabled();
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      qty: 1
    };
    
    dispatch(addCart(item));
    setNotificationMessage(`${product.name} added to cart successfully!`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement favorite functionality
    console.log('Add to favorites:', product.name);
  };

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg bg-green-500 text-white transition-all duration-300">
          {notificationMessage}
        </div>
      )}

      <motion.div 
        className={`group relative ${className}`}
        initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: animationsEnabled ? 0.1 * (index % 3) : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <motion.div 
            className="relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.image || product.images?.[0]}
                alt={product.name}
                className="w-full h-80 object-cover object-center transition-opacity duration-300"
              />
            </Link>

            {/* Hover Icons */}
            {showHoverIcons && (
              <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {/* Favorite Icon */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleFavorite}
                  className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Add to favorites"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.button>

                {/* Cart Icon - Same as navbar */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Add to cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </motion.button>

                {/* Magnifying Glass Icon */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleQuickView}
                  className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Quick view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              </div>
            )}

            {/* Product Badges */}
            {product.isNew && (
              <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                Sale
              </span>
            )}
          </motion.div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm text-gray-700 font-medium">
            <Link to={`/product/${product.slug}`} className="hover:text-gray-900 transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-gray-500 mt-1 uppercase">{product.category}</p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard; 