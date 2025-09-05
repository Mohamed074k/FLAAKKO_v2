import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collections } from '../data/products';
import ScrollAnimation from './ScrollAnimation';

const Collections = () => {
  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for text elements
  const textItem = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Animation for overlay container
  const overlayContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-left mb-5">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-monument"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          COLLECTIONS
        </motion.h2>
      </div>

      <ScrollAnimation yOffset={30}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left side - Two stacked images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {collections
              .filter(item => item.position.includes('left'))
              .map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative h-[350px] lg:h-[600px] overflow-hidden group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <motion.div 
                    className="absolute bottom-0 md:left-0 md:p-6 text-left w-full"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={overlayContainer}
                  >
                    <motion.div 
                      className="bg-transparent p-4 max-w-xs rounded-r-lg"
                      variants={overlayContainer}
                    >
                      <motion.h1 
                        className="text-3xl lg:text-5xl font-bold text-white [text-shadow:_0_8px_4px_rgba(0,0,0,0.5)]"
                        variants={textItem}
                      >
                        {item.title}
                      </motion.h1>
                      <motion.h3 
                        className="text-lg lg:text-xl text-white mb-2 [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]"
                        variants={textItem}
                      >
                        {item.subtitle}
                      </motion.h3>
                      <motion.div variants={textItem}>
                        <Link
                          to={item.link}
                          className="relative overflow-hidden inline-block bg-neutral-800 text-white px-6 py-2 text-sm font-medium rounded-full hover:bg-black transition-colors bg-opacity-80 group"
                        >
                          <span className="relative z-10">{item.buttonText}</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
          </div>

          {/* Right side - One large image */}
          <div className="w-full lg:w-1/2 h-[450px] lg:h-[1210px] relative">
            {collections
              .filter(item => item.position === 'right')
              .map((item) => (
                <div 
                  key={item.id}
                  className="w-full h-full"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <motion.div 
                    className="absolute bottom-0 md:left-0 md:p-8 text-left w-full"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={overlayContainer}
                  >
                    <motion.div 
                      className="bg-transparent p-6 max-w-md rounded-r-lg"
                      variants={overlayContainer}
                    >
                      <motion.h2 
                        className="text-3xl lg:text-5xl font-bold text-white [text-shadow:_0_8px_4px_rgba(0,0,0,0.5)]"
                        variants={textItem}
                      >
                        {item.title}
                      </motion.h2>
                      <motion.h3 
                        className="text-lg lg:text-xl text-white mb-4 [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]"
                        variants={textItem}
                      >
                        {item.subtitle}
                      </motion.h3>
                      <motion.div variants={textItem}>
                        <Link
                          to={item.link}
                          className="relative overflow-hidden inline-block bg-neutral-800 text-white px-6 py-2 text-sm font-medium rounded-full hover:bg-black transition-colors bg-opacity-80 group"
                        >
                          <span className="relative z-10">{item.buttonText}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default Collections;
