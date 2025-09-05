import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Notification from '../../components/Notification';
import ScrollAnimation from '../../components/ScrollAnimation';
import ProductCard from '../../components/ProductCard';
import Breadcrumb from '../../components/Breadcrumb';

const Collections = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
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

  // Pagination logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleQuickView = (product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumb />
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
              <div className="w-full md:w-auto space-y-0 space-x-4 flex flex-row">
                <div>
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category-filter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full text-sm md:w-48 px-4 py-2 shadow-md border border-gray-300 rounded-md"
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
                    className="w-full text-sm md:w-48 px-4 py-2 shadow-md border border-gray-300 rounded-md"
                  >
                    <option value="all">All Prices</option>
                    <option value="under25">Under 25 EGP</option>
                    <option value="25to50">25 EGP-50 EGP</option>
                    <option value="over50">Over 50 EGP</option>
                  </select>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p className="text-lg font-medium">No products match your selected filters.</p>
              <p className="text-sm mt-2">Try adjusting the category or price range to see more products.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product, index) => (
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
              {totalProducts > productsPerPage && (
                <div className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border border-gray-300 ${
                        currentPage === index + 1
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      } transition`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;