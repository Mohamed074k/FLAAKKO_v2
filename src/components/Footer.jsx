import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaHome, FaUserPlus, FaBox, FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import logo from "../assets/images/logo-hero.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
    { name: "Register", path: "/register", icon: <FaUserPlus className="mr-2" /> },
    { name: "Products", path: "/products", icon: <FaBox className="mr-2" /> },
  ];

  const socialLinks = [
    { icon: <FaFacebook className="text-xl" />, url: "#" },
    { icon: <FaTwitter className="text-xl" />, url: "#" },
    { icon: <FaInstagram className="text-xl" />, url: "#" },
  ];

  return (
    <footer className="bg-black text-white pt-12 pb-6 rounded-t-3xl mt-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and Description */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="Logo" className="h-10" />
            </div>
            <p className="text-gray-400 mb-4">
Shop smart, live better — everything you need in one place.            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.icon}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Kafr El Sheikh, Egypt</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 flex-shrink-0" />
                <span className="text-gray-400">+01228563612</span>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-3 flex-shrink-0" />
                <span className="text-gray-400">24 Hours Daily</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Additional Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made by{' '}
              <a 
                href="https://www.linkedin.com/in/mohamed-elsayed-074k/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                Mohamed Elsayed
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;