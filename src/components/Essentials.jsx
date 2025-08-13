import React from 'react';
import { motion } from 'framer-motion';
import { essentials } from '../data/products';
import ScrollAnimation from './ScrollAnimation';
import ProductCard from './ProductCard';

const Essentials = () => {
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

  return (
    <div className="py-20 bg-white overflow-x-hidden relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation yOffset={30}>
          <div className="text-center mb-10">
            <p className="mt-3 max-w-2xl mx-auto text-gray-900 sm:mt-4 font-monument text-lg">
              EVERYDAY
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-monument mt-2">
              ESSENTIALS
            </h2>
          </div>
        </ScrollAnimation>

        {/* Mobile horizontal scroll container */}
        <ScrollAnimation yOffset={50}>
          <div className="md:hidden pb-4 -ml-4 w-screen">
            <motion.div 
              className="flex space-x-4 pl-4 pb-4 overflow-x-auto scrollbar-hide"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={container}
            >
              {essentials.map((product, index) => (
                <motion.div 
                  key={product.id}
                  className="w-64 flex-shrink-0"
                  variants={item}
                >
                  <ProductCard 
                    product={product} 
                    index={index}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollAnimation>

        {/* Desktop grid layout */}
        <ScrollAnimation yOffset={50}>
          <motion.div 
            className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            {essentials.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={item}
              >
                <ProductCard 
                  product={product} 
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default Essentials;
