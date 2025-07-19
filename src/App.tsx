import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CartSidebar from './components/Cart/CartSidebar';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-slate-900">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onOpen={() => setIsCartOpen(true)} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;