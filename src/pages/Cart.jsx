import React from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "../store";
// import Footer from "../components/Footer"; // Uncomment if Footer exists
// import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleIncrement = (product) => {
    dispatch(incrementQty({ id: product.id }));
  };
  const handleDecrement = (product) => {
    dispatch(decrementQty({ id: product.id }));
  };
  const handleDelete = (product) => {
    dispatch(removeFromCart({ id: product.id }));
  };

  const EmptyCart = () => {
    return (
      <div className="container mx-auto text-center py-10">
        <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
        <a href="/" className="btn btn-outline-dark mx-4 border px-4 py-2 rounded hover:bg-gray-100">
          <span className="mr-2">&#8592;</span> Continue Shopping
        </a>
      </div>
    );
  };

  const ShowCart = () => {
    if (!state || state.length === 0) return <EmptyCart />;
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.forEach((item) => {
      subtotal += item.price * (item.qty || 1);
      totalItems += (item.qty || 1);
    });
    return (
      <section className="min-h-[60vh] bg-gray-50 py-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded shadow p-6 mb-6">
              <h5 className="text-xl font-bold mb-4">Item List</h5>
              {state.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row md:items-center border-b py-4 last:border-b-0">
                  <div className="flex md:items-center w-full">
                    <img src={item.image} alt={item.title} className="w-32 h-32 object-contain bg-white rounded mr-6 border" />
                    <div className="flex flex-col sm:flex-row sm:items-center w-full">
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button
                          className="border rounded px-2 py-1 text-lg"
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.qty || 1}</span>
                        <button
                          className="border rounded px-1 py-1 text-lg"
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-0 sm:ml-8 text-right mt-2 sm:mt-0">
                        <span className="text-gray-700 font-semibold">
                          {(item.qty || 1)} x ${item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:block w-full md:w-auto mt-4 md:mt-0 justify-end">
                    <button
                      className="text-red-600 hover:text-red-800 p-2 rounded-full border border-red-200 hover:bg-red-50 transition w-full md:w-auto"
                      onClick={() => handleDelete(item)}
                      title="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="block md:hidden text-xs mt-1">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded shadow p-6">
              <h5 className="text-xl font-bold mb-4">Order Summary</h5>
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
              <Link
                to="/checkout"
                className="block w-full text-center bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Go to checkout
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-4">Cart</h1>
        <hr className="mb-6" />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart; 