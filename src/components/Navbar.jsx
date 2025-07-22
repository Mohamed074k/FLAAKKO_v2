import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const state = useSelector(state => state.handleCart);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <NavLink className="text-2xl font-bold px-2" to="/">
          React Ecommerce
        </NavLink>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setMenuOpen(true)}
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
 
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center justify-between">
          <ul className="flex flex-row space-x-6 items-center text-center">
            <li>
              <NavLink className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/about">About</NavLink>
            </li>
            <li>
              <NavLink className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="flex flex-row items-center space-x-2 text-center">
            <NavLink to="/login" className="btn-nav-outline bg-transparent text-black border border-black px-3 py-2 mx-2 rounded-md hover:bg-black hover:text-white transition">
              <span className="flex items-center flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                Login
              </span>
            </NavLink>
            <NavLink to="/register" className="btn-nav-outline bg-transparent text-black border border-black px-3 py-2 mx-2 rounded-md hover:bg-black hover:text-white transition">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                Register
              </span>
            </NavLink>
            <NavLink to="/cart" className="btn-nav-outline bg-transparent text-black border border-black px-3 py-2 mx-2 rounded-md hover:bg-black hover:text-white transition">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Cart ({state.length})
              </span>
            </NavLink>
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
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
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
                <NavLink onClick={() => setMenuOpen(false)} className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/">Home</NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/about">About</NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} className="block py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium" to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to="/login" className="btn-nav-outline block text-left py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium">
                  <span className="flex items-center flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </svg>
                    Login
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
                <NavLink onClick={() => setMenuOpen(false)} to="/cart" className="btn-nav-outline block text-left py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium">
                  <span className="flex items-center flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    Cart ({state.length})
                  </span>
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