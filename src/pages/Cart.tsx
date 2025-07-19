import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total, itemCount } = useAppSelector(state => state.cart);

  const updateItemQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const removeItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
              <p className="text-gray-300">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {items.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearCart}
                className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
              >
                Clear Cart
              </motion.button>
            )}
          </div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Add some products to get started</p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              <span>Browse Products</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
                >
                  <div className="flex items-center space-x-4">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-white font-semibold mb-2 hover:text-blue-300 transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-blue-400 font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </motion.button>
                        <span className="text-white font-medium min-w-[3rem] text-center text-lg">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-full bg-red-600/20 hover:bg-red-600/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="text-white font-semibold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 h-fit sticky top-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal ({itemCount} items)</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-blue-400">
                      ${(total * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                Proceed to Checkout
              </motion.button>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;