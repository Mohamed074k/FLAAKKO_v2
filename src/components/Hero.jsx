import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollAnimation from "./ScrollAnimation";

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    cssEase: 'ease-in-out',
    arrows: false,
    rtl: false
  };

  const slides = [
    "/src/assets/images/slide-1.jpg",
    "/src/assets/images/slide-2.jpg",
    "/src/assets/images/slide-3-b.jpg"
  ];

  const mobileSlides = [
    "/src/assets/images/productos-hoodie-de-gira-blanco-2.jpg",
    "/src/assets/images/productos-remera-ojos-negra-2.jpg",
    "/src/assets/images/productos-remera-de-gira-blanca-2.jpg"
  ];

  return (
    <section className="hero border-b pb-3 mx-2 lg:mx-20 my-10">
      <div className="relative bg-gray-900 text-white rounded-3xl mx-3 overflow-hidden h-[550px]">
        {/* Background Image Slider - No animations */}
        <div className="absolute inset-0 w-full h-full">
          {/* Desktop Slides - Hidden on mobile */}
          <div className="hidden md:block w-full h-full">
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div key={`desktop-${index}`} className="w-full h-[650px]">
                  <img
                    className="w-full h-full object-cover"
                    src={slide}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Mobile Slides - Only visible on mobile */}
          <div className="block md:hidden w-full h-full">
            <Slider {...settings}>
              {mobileSlides.map((slide, index) => (
                <div key={`mobile-${index}`} className="w-full h-[550px]">
                  <img
                    className="w-full h-full object-cover"
                    src={slide}
                    alt={`Mobile Slide ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Overlay with Animated Text and Button */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
          <div className="container mx-auto px-4 pt-72">
            <ScrollAnimation yOffset={30} delay={0.1}>
              <h5 className="text-3xl md:text-5xl font-extrabold font-monument mb-1 [text-shadow:_0_8px_4px_rgba(0,0,0,1)]">
                NEW COLLECTIONS
              </h5>
            </ScrollAnimation>
            <ScrollAnimation yOffset={30} delay={0.2}>
              <h5 className="text-3xl md:text-5xl font-extrabold font-monument mb-1 [text-shadow:_0_8px_4px_rgba(0,0,0,1)]">
                #1
              </h5>
            </ScrollAnimation>
            <ScrollAnimation yOffset={30} delay={0.3}>
              <p className="text-md font-monument md:text-xl sm:block max-w-xl mb-4 [text-shadow:_0_8px_8px_rgba(0,0,0,0.5)]">
                T-shirts, Hoodies & more
              </p>
            </ScrollAnimation>
            <ScrollAnimation yOffset={30} delay={0.4}>
              <Link
                to={"/collections"}
                className="relative inline-block bg-neutral-800 text-white px-8 py-3 text-lg font-bold rounded-full hover:bg-black transition-colors bg-opacity-80 overflow-hidden group"
              >
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;