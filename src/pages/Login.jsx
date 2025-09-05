import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumb />
      <main className="flex-grow">
        <div className="container mx-auto my-8 py-8 max-w-lg">
          <h1 className="text-center text-3xl font-bold mb-2">Login</h1>
          <hr className="mb-6" />
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-4/5 md:w-full">
              <form>
                <div className="relative mb-8">
                  <input
                    type="email"
                    className={`w-full px-4 pt-5 pb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black peer`}
                    id="floatingInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => !email && setIsEmailFocused(false)}
                  />
                  <label 
                    htmlFor="floatingInput" 
                    className={`absolute left-3 transition-all duration-200 ease-in-out transform ${
                      isEmailFocused || email 
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
                    className={`w-full px-4 pt-5 pb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black peer`}
                    id="floatingPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => !password && setIsPasswordFocused(false)}
                  />
                  <label 
                    htmlFor="floatingPassword" 
                    className={`absolute left-3 transition-all duration-200 ease-in-out transform ${
                      isPasswordFocused || password 
                        ? 'text-xs md:text-xm text-black -translate-y-4 top-1' 
                        : 'translate-y-3 top-0 text-gray-500'
                    } pointer-events-none bg-white px-1`}
                  >
                    Password
                  </label>
                </div>
                <div className="mb-4">
                  <p>New Here?{' '}
                    <Link to="/register" className="underline text-blue-600 hover:text-blue-800">Register</Link>
                  </p>
                </div>
                <div className="text-center">
                  <button
                    className="my-2 mx-auto px-6 py-2 bg-black text-white rounded disabled:opacity-50 cursor-not-allowed"
                    type="submit"
                    disabled
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;