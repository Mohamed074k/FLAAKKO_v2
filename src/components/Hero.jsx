import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero border-b pb-3">
      <div className="relative bg-gray-900 text-white rounded-lg mx-3 overflow-hidden">
        <img
          className="w-full h-[500px] object-cover opacity-70"
          src="/src/assets/main.png.jpg"
          alt="Card"
          height={500}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h5 className="text-4xl md:text-5xl font-light mb-4">New Season Arrivals</h5>
            <p className="text-lg md:text-xl  sm:block max-w-xl">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 px-8 py-3 bg-transparent- text-white border font-semibold rounded shadow hover:bg-white hover:text-black transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 