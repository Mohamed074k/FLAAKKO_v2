import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../store";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";


const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => (
    <div className="flex flex-col md:flex-row gap-8 my-8">
      <div className="flex-1 flex justify-center items-center">
        <Skeleton height={400} width={400} />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton height={30} width={250} />
        <Skeleton height={90} />
        <Skeleton height={40} width={70} />
        <Skeleton height={50} width={110} />
        <Skeleton height={120} />
        <Skeleton height={40} width={110} />
        <Skeleton height={40} width={110} />
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="flex flex-col md:flex-row gap-8 my-8">
      <div className="flex-1 flex justify-center items-center">
        <img
          className="object-contain max-h-[400px] w-auto"
          src={product.image}
          alt={product.title}
          width="400"
          height="400"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h4 className="uppercase text-gray-500 tracking-wider">{product.category}</h4>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-lg flex items-center gap-2">
          {product.rating && product.rating.rate}
          <i className="fa fa-star text-yellow-400"></i>
        </p>
        <h3 className="text-2xl font-semibold my-2">${product.price}</h3>
        <p className="text-base text-gray-700">{product.description}</p>
        <div className="flex gap-4 mt-4">
          <button
            className="btn-nav-outline bg-white text-gray-900 rounded-md px-2 py-2 border-2 border-gray-900 hover:text-white hover:bg-gray-900 transition"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn-nav-outline bg-gray-800 text-white px-2 py-2 rounded-md hover:bg-gray-900">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const Loading2 = () => (
    <div className="flex gap-4 my-4">
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="w-[250px] h-[400px]">
          <Skeleton height={400} width={250} />
        </div>
      ))}
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="flex gap-4 my-4">
      {similarProducts.map((item) => (
        <div key={item.id} className="card bg-white shadow rounded text-center w-[250px] flex flex-col justify-between">
          <img
            className="object-contain p-3 mx-auto h-[300px] w-auto"
            src={item.image}
            alt="Card"
            height={300}
            width={300}
          />
          <div className="card-body p-2">
            <h5 className="text-base font-semibold mb-2">
              {item.title.substring(0, 15)}...
            </h5>
          </div>
          <div className="flex justify-center gap-2 pb-3">
            <Link
              to={`/product/${item.id}`}
              className="btn-nav-outline  bg-gray-800 text-white px-2 py-2 rounded-md hover:bg-gray-900"
            >
              Buy Now
            </Link>
            <button
              className="btn-nav-outline  bg-gray-800 text-white px-2 py-2 rounded-md hover:bg-gray-900"
              onClick={() => addProduct(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div>{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-4">You may also Like</h2>
          <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
            {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
          </Marquee>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product; 