import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";


const Checkout = () => {
  const cart = useSelector((state) => state.handleCart);
  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;
  cart.forEach((item) => {
    subtotal += item.price * (item.qty || 1);
    totalItems += (item.qty || 1);
  });

  return (
    <>
      <Navbar />
      <div className="container my-8 py-8 mx-auto max-w-5xl">
        <h1 className="text-center text-3xl font-bold mb-6">Checkout</h1>
        <hr className="mb-6" />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Order Form */}
          <div className="flex-1 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
                  <input type="text" id="firstName" className="form-input w-full border rounded px-3 py-2" placeholder="First name" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
                  <input type="text" id="lastName" className="form-input w-full border rounded px-3 py-2" placeholder="Last name" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input type="email" id="email" className="form-input w-full border rounded px-3 py-2" placeholder="name@example.com" />
              </div>
              <div>
                <label htmlFor="address" className="block mb-1 font-medium">Address</label>
                <input type="text" id="address" className="form-input w-full border rounded px-3 py-2" placeholder="1234 Main St" />
              </div>
              <div>
                <label htmlFor="address2" className="block mb-1 font-medium">Address 2 <span className="text-gray-400">(Optional)</span></label>
                <input type="text" id="address2" className="form-input w-full border rounded px-3 py-2" placeholder="Apartment, studio, or floor" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="country" className="block mb-1 font-medium">Country</label>
                  <input type="text" id="country" className="form-input w-full border rounded px-3 py-2" placeholder="Country" />
                </div>
                <div>
                  <label htmlFor="state" className="block mb-1 font-medium">State</label>
                  <input type="text" id="state" className="form-input w-full border rounded px-3 py-2" placeholder="State" />
                </div>
                <div>
                  <label htmlFor="zip" className="block mb-1 font-medium">Zip</label>
                  <input type="text" id="zip" className="form-input w-full border rounded px-3 py-2" placeholder="Zip" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">Payment</h2>
              <div>
                <label htmlFor="cardName" className="block mb-1 font-medium">Name on Card</label>
                <input type="text" id="cardName" className="form-input w-full border rounded px-3 py-2" placeholder="Name on card" />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block mb-1 font-medium">Credit Card Number</label>
                <input type="text" id="cardNumber" className="form-input w-full border rounded px-3 py-2" placeholder="Card number" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiration" className="block mb-1 font-medium">Expiration</label>
                  <input type="text" id="expiration" className="form-input w-full border rounded px-3 py-2" placeholder="MM/YY" />
                </div>
                <div>
                  <label htmlFor="cvv" className="block mb-1 font-medium">CVV</label>
                  <input type="text" id="cvv" className="form-input w-full border rounded px-3 py-2" placeholder="CVV" />
                </div>
              </div>
              <div className="text-center">
                <button className="my-2 px-6 py-2 btn bg-black text-white rounded" type="submit" disabled>
                  Place Order
                </button>
              </div>
            </form>
          </div>
          {/* Order Summary */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="mb-4 divide-y">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="ml-2 text-gray-500">x{item.qty || 1}</span>
                  </div>
                  <span>${(item.price * (item.qty || 1)).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <ul className="mb-4">
              <li className="flex justify-between mb-2">
                <span>Products ({totalItems})</span>
                <span>${Math.round(subtotal)}</span>
              </li>
              <li className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping}</span>
              </li>
              <li className="flex justify-between font-bold text-lg">
                <span>Total amount</span>
                <span>${Math.round(subtotal + shipping)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout; 