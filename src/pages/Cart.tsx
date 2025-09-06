import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { coupons } from '../data/coupons';
import CongratulationsCard from '../components/CongratulationsCard';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const subtotal = getTotal();
  const discount = appliedCoupon ? 
    (appliedCoupon.discountType === 'percentage' 
      ? Math.min(subtotal * (appliedCoupon.discountValue / 100), appliedCoupon.maxDiscount || Infinity)
      : appliedCoupon.discountValue) : 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    setCouponError('');
    const coupon = coupons.find(c => 
      c.code.toLowerCase() === couponCode.toLowerCase() && 
      c.active && 
      new Date() < c.expiresAt &&
      (!c.minPurchase || subtotal >= c.minPurchase)
    );

    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido ou não aplicável a este pedido');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const processOrder = async () => {
    if (!user) return;
    
    setIsProcessingOrder(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    setAppliedCoupon(null);
    setIsProcessingOrder(false);
    setShowCongratulations(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-lg p-12">
              <div className="bg-gray-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-gray-400" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Seu carrinho está vazio
              </h2>
              <p className="text-gray-600 mb-8">
                Descubra nossa coleção exclusiva de joias e adicione suas favoritas ao carrinho.
              </p>
              <Link 
                to="/products"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center group"
              >
                Explorar Produtos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
            Carrinho de <span className="text-primary-600">Compras</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Seus Produtos ({items.length})
                </h2>
                
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      className="flex items-center space-x-4 py-6 border-b border-gray-200 last:border-b-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-primary-600 font-bold">
                          R$ {item.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Minus className="h-5 w-5 text-gray-600" />
                        </motion.button>
                        
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Plus className="h-5 w-5 text-gray-600" />
                        </motion.button>
                      </div>

                      <motion.button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Resumo do Pedido
              </h2>

              {/* Coupon Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cupom de Desconto
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Digite o cupom"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <motion.button
                    onClick={applyCoupon}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tag className="h-5 w-5" />
                  </motion.button>
                </div>
                
                {couponError && (
                  <p className="text-red-500 text-sm mt-2">{couponError}</p>
                )}

                {appliedCoupon && (
                  <motion.div 
                    className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <p className="text-emerald-800 font-semibold">{appliedCoupon.code}</p>
                      <p className="text-emerald-600 text-sm">
                        {appliedCoupon.discountType === 'percentage' 
                          ? `${appliedCoupon.discountValue}% de desconto`
                          : `R$ ${appliedCoupon.discountValue.toFixed(2)} de desconto`
                        }
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-600 hover:text-emerald-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}

                {/* Popular Coupons */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Cupons disponíveis:</p>
                  <div className="space-y-1">
                    {coupons.slice(0, 3).map(coupon => (
                      <button
                        key={coupon.id}
                        onClick={() => setCouponCode(coupon.code)}
                        className="block w-full text-left text-xs text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        {coupon.code} - {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}% OFF`
                          : `R$ ${coupon.discountValue} OFF`
                        }
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Desconto:</span>
                    <span className="font-semibold">-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {user ? (
                <motion.button
                  onClick={processOrder}
                  disabled={isProcessingOrder}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessingOrder ? (
                    <span>Processando...</span>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Finalizar Compra
                    </>
                  )}
                </motion.button>
              ) : (
                <Link
                  to="/login"
                  state={{ from: { pathname: '/cart' } }}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Fazer Login para Comprar
                </Link>
              )}

              <Link 
                to="/products"
                className="block w-full text-center text-primary-600 hover:text-primary-700 font-semibold mt-4 transition-colors"
              >
                Continuar Comprando
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <CongratulationsCard
        isVisible={showCongratulations}
        onClose={() => setShowCongratulations(false)}
        orderNumber={`AJ${Date.now()}`}
        customerName={user?.name || 'Cliente'}
      />
    </div>
  );
};

export default Cart;
