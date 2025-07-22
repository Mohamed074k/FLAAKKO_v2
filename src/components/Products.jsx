import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [dropdownProduct, setDropdownProduct] = useState(null);
  const cart = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hide dropdown on click outside
  useEffect(() => {
    if (!showCartDropdown) return;
    const handleClick = (e) => {
      // Only close if click is outside the dropdown
      if (!e.target.closest('.cart-dropdown')) {
        setShowCartDropdown(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [showCartDropdown]);

  const addProduct = (product) => {
    const wasEmpty = cart.length === 0;
    dispatch(addCart(product));
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
    if (wasEmpty) {
      setDropdownProduct(product);
      setShowCartDropdown(true);
      // Remove auto-hide timeout
    }
  };

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        const products = await response.clone().json();
        setData(products);
        setFilter(products);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => (
    <>
      <div className="w-full py-5 flex justify-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full md:w-1/3 sm:w-1/2 px-2 mb-4">
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => (
    <>
      <div className="flex flex-wrap justify-center gap-2 py-5">
        <button
          className="btn-nav-outline btn-sm bg-wite text-black px-4 py-2 mr-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition"
          onClick={() => setFilter(data)}
        >
          All
        </button>
        <button
          className="btn-nav-outline btn-sm bg-wite text-black px-4 py-2 mr-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="btn-nav-outline btn-sm bg-wite text-black px-4 py-2 mr-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="btn-nav-outline btn-sm bg-wite text-black px-4 py-2 mr-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="btn-nav-outline btn-sm bg-wite text-black px-4 py-2 mr-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {filter.map((product) => (
          <div
            id={product.id}
            key={product.id}
            className="w-full md:w-1/3 sm:w-1/2 px-2 my-8"
          >
            <div className="card text-center h-full flex flex-col justify-between  rounded border shadow-lg">
              <img
                className="object-contain p-3 mx-auto h-[300px] w-auto"
                src={product.image}
                alt="Card"
                height={300}
              />
              <div className="card-body p-4 flex-1 flex flex-col">
                <h5 className="text-lg font-semibold mb-2">
                  {product.title.substring(0, 12)}...
                </h5>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {product.description.substring(0, 90)}...
                </p>
              </div>
              <ul className="list-none p-0 mb-2">
                <li className="text-lg font-bold">$ {product.price}</li>
              </ul>
              <div className="flex justify-center gap-2 pb-4">
                <Link
                  to={`/product/${product.id}`}
                  className="btn-nav-outline  bg-gray-800 text-white px-2 py-2 rounded-md hover:bg-gray-900"
                >
                  Buy Now
                </Link>
                <button
                  className="btn-nav-outline  bg-gray-800 text-white px-2 py-2 rounded-md hover:bg-gray-900"
                  onClick={(e) => { e.stopPropagation(); addProduct(product); }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container mx-auto my-3 py-3 px-2 relative">
      {showAdded && (
        <div className="fixed left-1/2 -translate-x-1/2 top-8 z-50 flex items-center px-6 py-3 rounded shadow-lg transition-all duration-500 ease-in-out bg-green-100 border border-green-400 text-green-700 animate-fade-slide">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="font-semibold">Added to cart</span>
        </div>
      )}
      {showCartDropdown && dropdownProduct && (
        <div className="cart-dropdown fixed right-8 top-20 z-50 bg-white border border-gray-300 rounded shadow-lg w-80 animate-fade-slide p-4" onClick={e => e.stopPropagation()}>
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
            onClick={() => setShowCartDropdown(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="flex items-center mb-4">
            <img src={dropdownProduct.image} alt={dropdownProduct.title} className="w-16 h-16 object-contain rounded mr-4 border" />
            <div>
              <div className="font-semibold text-base mb-1">{dropdownProduct.title.substring(0, 30)}...</div>
              <div className="text-gray-700 font-bold">${dropdownProduct.price}</div>
            </div>
          </div>
          <Link
            to="/cart"
            className="block w-full text-center bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Go to Cart
          </Link>
        </div>
      )}
      <div className="w-full mb-6">
        <h2 className="text-3xl font-bold text-center">Latest Products</h2>
        <hr className="my-4" />
      </div>
      {loading ? <Loading /> : <ShowProducts />}
    </div>
  );
};

export default Products; 