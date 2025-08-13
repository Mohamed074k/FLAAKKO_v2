import React from 'react';
import heroVideo from '../assets/videos/hero.mp4';

const VideoSection = () => {
  return (
    <section className="relative h-96 lg:h-screen overflow-hidden mx-4 lg:mx-20 mt-10 mb-20 rounded-3xl">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        {/* Centered Logo */}
        <div className="w-1/2 md:w-1/3 lg:w-1/4 max-w-xs">
          <img 
            src="/src/assets/images/logo-hero.png" 
            alt="Hero Logo"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
