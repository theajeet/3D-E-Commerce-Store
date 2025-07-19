import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    }));
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-500/50">
          <div className="relative overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.button
              onClick={handleWishlistToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                isInWishlist 
                  ? 'bg-red-500/80 text-white' 
                  : 'bg-black/20 text-white hover:bg-red-500/80'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </motion.button>

            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 backdrop-blur-md transition-colors duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">Add to Cart</span>
              </motion.button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating.rate)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">
                ({product.rating.count})
              </span>
            </div>

            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-blue-400">
                ${product.price.toFixed(2)}
              </span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-gray-300" />
              </motion.div>
            </div>

            <div className="mt-2">
              <span className="inline-block bg-slate-700 text-xs text-gray-300 px-2 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;