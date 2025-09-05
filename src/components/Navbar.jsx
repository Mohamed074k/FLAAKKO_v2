import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '/images/logo-nav.png';

const Navbar = () => {
  const cartItems = useSelector(state => state.handleCart || []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);

  // Changed this line - now counts unique items instead of summing quantities
  const cartItemCount = cartItems.length;

  // Calculate total price (keep this the same as it's used for the cart dropdown)
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * (item.qty || 1));
  }, 0);

  // Close cart dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-white bg-opacity-95 shadow-lg sticky top-0 z-50 mx-4 lg:mx-20 rounded-b-3xl transition-all duration-300 ${isScrolled ? 'py-2' : 'py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="#" className="flex items-center px-2">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-6 w-20"
          />
        </NavLink>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute left-0 w-full h-0.5 bg-current rounded transform transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 top-2.5' : 'top-0'}`}></span>
            <span className={`absolute right-0 w-3/5 h-0.5 bg-current rounded transform transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'top-2'}`}></span>
            <span className={`absolute left-0 w-full h-0.5 bg-current rounded transform transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 top-2.5' : 'top-4'}`}></span>
          </div>
        </button>
 
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center justify-between">
          {/* Empty div for spacing */}
          <div className="w-20"></div>
          
          {/* Centered Navigation Links */}
          <ul className="flex flex-row space-x-6 items-center text-center">
             <li>
              <NavLink 
                className={({ isActive }) => 
                  `block py-2 px-4 text-gray-700 font-medium relative group
                  ${isActive ? 'text-black' : 'hover:text-black'}`
                }
                to="/collections/t-shirts"
              >
                T-SHIRTS
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black group-hover:w-4/5 transition-all duration-300 transform -translate-x-1/2"></span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                className={({ isActive }) => 
                  `block py-2 px-4 text-gray-700 font-medium relative group
                  ${isActive ? 'text-black' : 'hover:text-black'}`
                }
                to="/collections/hoodies"
              >
                HOODIES
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black group-hover:w-4/5 transition-all duration-300 transform -translate-x-1/2"></span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                className={({ isActive }) => 
                  `block py-2 px-4 text-gray-700 font-medium relative group
                  ${isActive ? 'text-black' : 'hover:text-black'}`
                }
                to="/collections/accessories"
              >
                ACCESSORIES
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black group-hover:w-4/5 transition-all duration-300 transform -translate-x-1/2"></span>
              </NavLink>
            </li>
          </ul>
          
          {/* Right Side Actions */}
          <div className="flex flex-row items-center space-x-2 text-center">
            <NavLink to="/login" className="btn-nav-outline bg-transparent text-black border border-none px-3 py-2 mx-2 ">
              <span className="flex items-center flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25-2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                Login
              </span>
            </NavLink>
            <NavLink to="/profile" className="btn-nav-outline bg-transparent text-black border border-none px-3 py-2 mx-2 ">
              <span className="flex items-center flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Profile
              </span>
            </NavLink>
            <div className="relative" ref={cartRef}>
              <button 
                onMouseEnter={() => setIsCartOpen(true)}
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="btn-nav-outline bg-transparent text-black border border-none px-3 py-2 mx-2 relative"
                aria-label="Cart"
                aria-expanded={isCartOpen}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </span>
              </button>
              
              {/* Cart Dropdown */}
              {isCartOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200"
                  onMouseLeave={() => setIsCartOpen(false)}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Your Cart</h3>
                    
                    {cartItems.length === 0 ? (
                      <div className="py-6 text-center">
                        <p className="text-gray-500">Your cart is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-96 overflow-y-auto pr-2 -mr-2">
                          {cartItems.map((item) => (
                            <div key={`${item.id}-${item.selectedVariant || ''}-${item.selectedSize || ''}`} className="flex items-center py-3 border-b border-gray-100">
                              <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                                <img 
                                  src={item.images?.[0] || item.image} 
                                  alt={item.name || item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name || item.title}</h4>
                                <p className="text-sm text-gray-500">Qty: {item.qty || 1}</p>
                                {item.selectedSize && (
                                  <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                                )}
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium">${(item.price * (item.qty || 1)).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between mb-4">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                          </div>
                          <NavLink 
                            to="/cart" 
                            className="block w-full bg-black text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                            onClick={() => setIsCartOpen(false)}
                          >
                            View Cart
                          </NavLink>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar for mobile */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white bg-opacity-90 shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="text-xl font-bold">Menu</span>
              <button
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <NavLink 
                  onClick={() => setMenuOpen(false)} 
                  className={({ isActive }) => 
                    `block py-2 px-4 text-gray-700 font-medium relative group
                    ${isActive ? 'text-black' : 'hover:text-black'}`
                  }
                  to="/collections/t-shirts"
                >
                  T-SHIRTS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  onClick={() => setMenuOpen(false)} 
                  className={({ isActive }) => 
                    `block py-2 px-4 text-gray-700 font-medium relative group
                    ${isActive ? 'text-black' : 'hover:text-black'}`
                  }
                  to="/collections/hoodies"
                >
                  HOODIES
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  onClick={() => setMenuOpen(false)} 
                  className={({ isActive }) => 
                    `block py-2 px-4 text-gray-700 font-medium relative group
                    ${isActive ? 'text-black' : 'hover:text-black'}`
                  }
                  to="/collections/accessories"
                >
                  ACCESSORIES
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              </li>
              
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to="/login" className="btn-nav-outline block text-left py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium">
                  <span className="flex items-center flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25-2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </svg>
                    Login
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to="/profile" className="btn-nav-outline block text-left py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium">
                  <span className="flex items-center flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Profile
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to="/register" className="btn-nav-outline block text-left py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium">
                  <span className="flex items-center flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    Register
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/cart" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Cart ({cartItemCount})
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;