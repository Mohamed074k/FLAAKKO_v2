import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [focusedFields, setFocusedFields] = useState({
    name: false,
    email: false,
    password: false
  });

  const handleFocus = (field) => {
    setFocusedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocusedFields(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.toLowerCase()]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 py-8 max-w-lg">
        <h1 className="text-center text-3xl font-bold mb-2">Register</h1>
        <hr className="mb-6" />
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-4/5 md:w-full">
            <form>
              <div className="relative mb-8">
                <input
                  type="text"
                  className="w-full px-4 pt-5 pb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black peer"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                />
                <label 
                  htmlFor="name" 
                  className={`absolute left-3 transition-all duration-200 ease-in-out transform ${
                    focusedFields.name || formData.name 
                      ? 'text-xs md:text-xm text-black -translate-y-4 top-1' 
                      : 'translate-y-3 top-0 text-gray-500'
                  } pointer-events-none bg-white px-1`}
                >
                  Full Name
                </label>
              </div>
              <div className="relative mb-8">
                <input
                  type="email"
                  className="w-full px-4 pt-5 pb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black peer"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                />
                <label 
                  htmlFor="email" 
                  className={`absolute left-3 transition-all duration-200 ease-in-out transform ${
                    focusedFields.email || formData.email 
                      ? 'text-xs md:text-xm text-black -translate-y-4 top-1' 
                      : 'translate-y-3 top-0 text-gray-500'
                  } pointer-events-none bg-white px-1`}
                >
                  Email address
                </label>
              </div>
              <div className="relative mb-8">
                <input
                  type="password"
                  className="w-full px-4 pt-5 pb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black peer"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                />
                <label 
                  htmlFor="password" 
                  className={`absolute left-3 transition-all duration-200 ease-in-out transform ${
                    focusedFields.password || formData.password 
                      ? 'text-xs md:text-xm text-black -translate-y-4 top-1' 
                      : 'translate-y-3 top-0 text-gray-500'
                  } pointer-events-none bg-white px-1`}
                >
                  Password
                </label>
              </div>
              <div className="mb-4">
                <p>Already have an account?{' '}
                  <Link to="/login" className="underline text-blue-600 hover:text-blue-800">Login</Link>
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 mx-auto px-6 py-2 bg-black text-white rounded disabled:opacity-50 cursor-not-allowed"
                  type="submit"
                  disabled
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;