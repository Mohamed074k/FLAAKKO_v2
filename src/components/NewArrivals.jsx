import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { newArrivalsProducts } from '../data/products';
import ScrollAnimation from './ScrollAnimation';
import ProductCard from './ProductCard';

const NewArrivals = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);
    const navigate = useNavigate();
  

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const scrollNewArrivals = (direction) => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollAmount = 300; // Same scroll distance as in Product.jsx
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    
    setScrollPosition(container.scrollLeft);
  };

  const isAtEnd = () => {
    if (!scrollRef.current) return false;
    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    return scrollPosition >= maxScroll - 1; // Small buffer to account for rounding
  };


    const handleQuickView = (product) => {
    navigate(`/product/${product.slug || product.id}`);
  };


  return (
    <div className="py-20 bg-white overflow-x-hidden relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation yOffset={30}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-monument mt-2">
              NEW ARRIVALS
            </h2>
            <p className="mt-1 max-w-2xl mx-auto text-gray-500 sm:mt-1 font-monument text-md">
              Discover our latest products
            </p>
          </div>
        </ScrollAnimation>

        {/* Horizontal scroll container for all screen sizes */}
        <ScrollAnimation yOffset={50}>
          <div className="relative">
            <div className="flex justify-end space-x-2 mb-4 pr-4">
              <button
                onClick={() => scrollNewArrivals('left')}
                disabled={scrollPosition <= 0}
                className={`p-2 rounded-full ${scrollPosition <= 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollNewArrivals('right')}
                disabled={isAtEnd()}
                className={`p-2 rounded-full ${isAtEnd() ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <motion.div 
              ref={scrollRef}
              className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] sm:auto-cols-[minmax(300px,1fr)] lg:auto-cols-[minmax(320px,1fr)] xl:auto-cols-[minmax(350px,1fr)] gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={container}
              style={{
                scrollBehavior: 'smooth',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
            >
              {newArrivalsProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  variants={item}
                >
                  <ProductCard 
                    product={product} 
                    index={index}
                    className="w-full"
                                        onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default NewArrivals;