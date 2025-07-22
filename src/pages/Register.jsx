import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 py-8 max-w-lg">
        <h1 className="text-center text-3xl font-bold mb-2">Register</h1>
        <hr className="mb-6" />
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-full">
            <form>
              <div className="mb-4">
                <label htmlFor="Name" className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="Name"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Email" className="block mb-1 font-medium">Email address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Password" className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="Password"
                  placeholder="Password"
                />
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