import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../../data/products';
import Navbar from '../../components/Navbar';
import Notification from '../../components/Notification';
import ScrollAnimation from '../../components/ScrollAnimation';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

const Hoodies = () => {
  const [priceFilter, setPriceFilter] = useState('all');
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  const hoodies = getProductsByCategory('hoodies');

  const filteredProducts = hoodies.filter((product) => {
    if (priceFilter === 'under50') return product.price < 50;
    if (priceFilter === '50to100') return product.price >= 50 && product.price <= 100;
    if (priceFilter === 'over100') return product.price > 100;
    return true;
  });

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleQuickView = (product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {showNotification && (
        <Notification 
          message={notificationMessage} 
          show={showNotification} 
          onClose={handleCloseNotification}
          type={notificationType}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Title and Filter Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <ScrollAnimation yOffset={30}>
            <h1 className="text-3xl font-bold font-monument">Hoodies</h1>
          </ScrollAnimation>
          <ScrollAnimation delay={0.1} yOffset={20} className="w-full md:w-auto">
            <div>
              <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Price
              </label>
              <select
                id="price-filter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className=" text-sm md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Prices</option>
                <option value="under25">Under $25</option>
                <option value="25to50">$25 - $50</option>
                <option value="over50">Over $50</option>
              </select>
            </div>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ScrollAnimation 
              key={product.id}
              delay={0.1 * (index % 3)}
              yOffset={30}
              viewportOptions={{ once: true, margin: '-50px' }}
            >
              <ProductCard 
                product={product} 
                index={index}
                onQuickView={handleQuickView}
              />
            </ScrollAnimation>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hoodies;
