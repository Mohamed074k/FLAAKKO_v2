import React from 'react';
import Navbar from '../components/Navbar';
import Products from '../components/Products';

const ProductsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6">
        <Products />
      </div>
    </>
  );
};

export default ProductsPage; 