import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Heart, Search, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-primary-800 via-purple-800 to-secondary-800 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="p-2 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Crown className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
              AYVI JOIAS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-accent-300 transition-colors duration-200 font-medium">
              Início
            </Link>
            <Link to="/products" className="hover:text-accent-300 transition-colors duration-200 font-medium">
              Produtos
            </Link>
            <Link to="/about" className="hover:text-accent-300 transition-colors duration-200 font-medium">
              Sobre
            </Link>
            <Link to="/contact" className="hover:text-accent-300 transition-colors duration-200 font-medium">
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 cursor-pointer hover:text-accent-300 transition-colors" />
            <Heart className="h-5 w-5 cursor-pointer hover:text-accent-300 transition-colors" />
            
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingBag className="h-5 w-5 group-hover:text-accent-300 transition-colors" />
              {getItemCount() > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {getItemCount()}
                </motion.span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-accent-300 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden md:block text-sm">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                    Meu Perfil
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                    Meus Pedidos
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 text-primary-600 font-medium">
                      Administração
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-600"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden py-4 border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className="hover:text-accent-300 transition-colors duration-200">
                  Início
                </Link>
                <Link to="/products" className="hover:text-accent-300 transition-colors duration-200">
                  Produtos
                </Link>
                <Link to="/about" className="hover:text-accent-300 transition-colors duration-200">
                  Sobre
                </Link>
                <Link to="/contact" className="hover:text-accent-300 transition-colors duration-200">
                  Contato
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
