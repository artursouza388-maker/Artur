import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3">
              <motion.button
                className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="h-5 w-5 text-gray-700" />
              </motion.button>
              <motion.button
                className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-5 w-5 text-gray-700" />
              </motion.button>
              <motion.button
                onClick={handleAddToCart}
                className="p-3 bg-primary-500 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="h-5 w-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.featured && (
              <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                Destaque
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                Oferta
              </span>
            )}
            {!product.inStock && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Esgotado
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-accent-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">
                R$ {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {product.originalPrice && (
              <span className="text-sm font-bold text-emerald-600">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
