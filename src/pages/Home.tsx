import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, Crown, Heart, Gift, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-purple-900 to-secondary-900 text-white py-20 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="h-4 w-4 text-accent-300" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                AYVI JOIAS
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Elegância e sofisticação em cada peça. Descubra joias exclusivas que destacam sua beleza única.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link 
                  to="/products"
                  className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  Ver Coleção
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center"
                >
                  Nossa História
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center"
                  alt="Joias AYVI"
                  className="rounded-3xl shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -top-4 -right-4 bg-accent-500 rounded-full p-4 shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-primary-500 rounded-full p-3 shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Qualidade Garantida</h3>
              <p className="text-gray-600">Materiais premium e garantia de qualidade em todas as peças.</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Entrega Rápida</h3>
              <p className="text-gray-600">Frete grátis para todo o Brasil e entrega expressa disponível.</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-r from-accent-400 to-accent-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Embalagem Especial</h3>
              <p className="text-gray-600">Cada joia vem em uma embalagem exclusiva, pronta para presente.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Produtos em <span className="text-primary-600">Destaque</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra nossa seleção especial de joias que são verdadeiras obras de arte
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link 
              to="/products"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center group"
            >
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              O que nossos <span className="text-primary-600">clientes</span> dizem
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                text: "Joias lindas e de qualidade excepcional! Recebi muitos elogios.",
                rating: 5
              },
              {
                name: "Ana Santos",
                text: "Atendimento impecável e entrega super rápida. Recomendo!",
                rating: 5
              },
              {
                name: "João Oliveira",
                text: "Comprei um presente para minha esposa e ela amou. Voltarei sempre!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
