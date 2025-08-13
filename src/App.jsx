import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/home';
import Product from './pages/Product';
import ProductsPage from './pages/ProductsPage';
import TShirts from './pages/collections/TShirts';
import Hoodies from './pages/collections/Hoodies';
import Accessories from './pages/collections/Accessories';
import Collections from './pages/collections';
import store from './store';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Loader />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* Collection Routes */}
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/t-shirts" element={<TShirts />} />
          <Route path="/collections/hoodies" element={<Hoodies />} />
          <Route path="/collections/accessories" element={<Accessories />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
