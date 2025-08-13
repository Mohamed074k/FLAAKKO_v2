import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Notification from '../../components/Notification';
import ScrollAnimation from '../../components/ScrollAnimation';
import ProductCard from '../../components/ProductCard';

const Collections = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    // Filter by category
    const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
    
    // Filter by price
    let priceMatch = true;
    if (priceFilter === 'under25') priceMatch = product.price < 25;
    else if (priceFilter === '25to50') priceMatch = product.price >= 25 && product.price <= 50;
    else if (priceFilter === 'over50') priceMatch = product.price > 50;
    else if (priceFilter === 'over100') priceMatch = product.price > 100;
    
    return categoryMatch && priceMatch;
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
                    <ScrollAnimation yOffset={30}>
            <h1 className="text-2xl font-bold text-gray-900 font-monument">All Products</h1>
            </ScrollAnimation>
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>
                  <ScrollAnimation delay={0.1} yOffset={20}>
          <div className="w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full text-sm md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
               {categories.map((category) => (
                 <option key={category} value={category}>
                    {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Other'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                id="price-filter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full text-sm md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                <option value="all">All Prices</option>
                <option value="under25">Under $25</option>
                <option value="25to50">$25 - $50</option>
                <option value="over50">Over $50</option>
              </select>
            </div>
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

export default Collections;
