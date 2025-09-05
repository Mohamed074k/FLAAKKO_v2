import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import loaderImage from '/images/loader.png';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const location = useLocation();

  // Prevent scrolling while loader is visible
  useEffect(() => {
    if (isVisible) {
      // Add CSS class to prevent scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when loader disappears
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    // Cleanup function to re-enable scrolling
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isVisible]);

  // Initial page load loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Set global state to enable scroll animations
      window.scrollAnimationsEnabled = true;
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Page navigation loader
  useEffect(() => {
    setIsPageLoading(true);
    
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Initial page load loader */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-md z-[9999] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg bg-white/90 backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <img
                src={loaderImage}
                alt="Loading..."
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.p
              className="absolute bottom-1/4 text-gray-600 font-medium text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page navigation loader */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[9998]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          >
            <motion.div
              className="h-full bg-black"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Loader; 