import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const UnderConstruction: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <motion.div 
        className="max-w-2xl mx-auto text-center bg-white p-10 rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, -15, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HardHat className="h-20 w-20 text-accent-500" />
          </motion.div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          Página em <span className="text-primary-600">Construção</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Estamos preparando esta página com muito carinho para você! Volte em breve para conferir as novidades.
        </p>
        <Link 
          to="/"
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Início
        </Link>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
