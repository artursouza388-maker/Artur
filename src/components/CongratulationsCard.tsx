import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Heart, Gift, Sparkles } from 'lucide-react';

interface CongratulationsCardProps {
  isVisible: boolean;
  onClose: () => void;
  orderNumber: string;
  customerName: string;
}

const CongratulationsCard: React.FC<CongratulationsCardProps> = ({
  isVisible,
  onClose,
  orderNumber,
  customerName
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti Animation */}
        <div className="relative overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * 400 - 200, 
                y: -50, 
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: 400, 
                rotate: Math.random() * 360 + 180
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 1
              }}
            >
              <Sparkles className={`h-4 w-4 ${
                ['text-primary-400', 'text-accent-400', 'text-secondary-400', 'text-emerald-400', 'text-purple-400'][Math.floor(Math.random() * 5)]
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Success Icon */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full p-4">
              <Check className="h-12 w-12 text-white" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 bg-accent-500 rounded-full p-1"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-4 w-4 text-white fill-current" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="text-3xl font-serif font-bold text-center text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Parabéns!
        </motion.h2>

        {/* Message */}
        <motion.div 
          className="text-center space-y-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-gray-700 font-medium">
            Obrigado por escolher a <span className="text-primary-600 font-bold">AYVI JOIAS</span>!
          </p>
          <p className="text-gray-600">
            Olá <span className="font-semibold text-primary-600">{customerName}</span>, sua compra foi realizada com sucesso!
          </p>
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600 mb-1">Número do pedido:</p>
            <p className="text-lg font-bold text-primary-600">#{orderNumber}</p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="space-y-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Gift className="h-5 w-5 text-accent-500" />
            <span>Embalagem especial inclusa</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Heart className="h-5 w-5 text-primary-500" />
            <span>Garantia de qualidade AYVI</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Star className="h-5 w-5 text-emerald-500" />
            <span>Entrega rastreada</span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-gray-500 mb-4">
            Acompanhe seu pedido por email ou na área do cliente
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Continuar Comprando
          </button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <Heart className="h-8 w-8 text-primary-400" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Star className="h-6 w-6 text-accent-400" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CongratulationsCard;
