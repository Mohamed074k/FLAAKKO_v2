import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const ScrollAnimation = ({ 
  children, 
  delay = 0, 
  yOffset = 50, 
  className = '',
  viewportOptions = { once: true, margin: '-100px' }
}) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: viewportOptions.once,
    threshold: 0.1,
    rootMargin: viewportOptions.margin || '0px'
  });

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

  const variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Don't animate if animations are not enabled yet
  if (!animationsEnabled) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
