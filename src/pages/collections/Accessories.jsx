import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../../data/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Notification from '../../components/Notification';
import ScrollAnimation from "../../components/ScrollAnimation";
import ProductCard from '../../components/ProductCard';

const Accessories = () => {
  const [priceFilter, setPriceFilter] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const navigate = useNavigate();

  // Get accessories products
  const accessories = getProductsByCategory('accessories');

  // Filter products by price
  const filteredProducts = accessories.filter((product) => {
    if (priceFilter === 'under25') return product.price < 25;
    if (priceFilter === '25to50') return product.price >= 25 && product.price <= 50;
    if (priceFilter === 'over50') return product.price > 50;
    return true; // 'all' filter
  });

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleQuickView = (product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
              <h1 className="text-3xl font-bold font-monument">Accessories</h1>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1} yOffset={20}>
             <div>
              <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Price
              </label>
              <select
                id="price-filter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full text-sm md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
      </main>
      <Footer />
    </div>
  );
};

export default Accessories;
