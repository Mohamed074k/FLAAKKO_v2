import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "../store";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (product) => {
    dispatch(incrementQty({ id: product.id }));
  };
  const handleDecrement = (product) => {
    dispatch(decrementQty({ id: product.id }));
  };
  const handleDelete = (product) => {
    dispatch(removeFromCart({ id: product.id }));
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      // Simulate API call or any async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container mx-auto text-center py-10">
        <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
        <Link to="/" className="btn btn-outline-dark mx-4 border px-4 py-2 rounded hover:bg-gray-100">
          <span className="mr-2">&#8592;</span> Continue Shopping
        </Link>
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
              <h5 className="text-xl font-bold mb-6">Item List</h5>
              {state.map((item) => (
                <div key={item.id} className="border-b py-6 last:border-b-0">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      {item.color && (
                        <p className="text-gray-600">
                          Color: <span className="capitalize">{item.color}</span>
                        </p>
                      )}
                      {item.size && (
                        <p className="text-gray-600">
                          Size: <span className="uppercase">{item.size}</span>
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            onClick={() => handleDecrement(item)}
                          >
                            -
                          </button>
                          <span className="px-4">{item.qty || 1}</span>
                          <button
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            onClick={() => handleIncrement(item)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="font-semibold">
                          ${(item.price * (item.qty || 1)).toFixed(2)}
                        </div>
                        
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(item)}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:w-80 flex-shrink-0">
            <div className="bg-white rounded shadow p-6 sticky top-6">
              <h5 className="text-xl font-bold mb-6">Order Summary</h5>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(subtotal + shipping).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className={`w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-black-700 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;