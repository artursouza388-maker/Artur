import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                AYVI JOIAS
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Desde 2020, criamos joias exclusivas que celebram momentos especiais e destacam a beleza única de cada pessoa.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 cursor-pointer hover:text-accent-300 transition-colors" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-accent-300 transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-accent-300 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-300">Links Rápidos</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Nossos Produtos
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Nossa História
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Fale Conosco
              </Link>
              <Link to="/shipping" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Entrega e Frete
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-300">Atendimento</h3>
            <div className="space-y-2">
              <Link to="/returns" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Trocas e Devoluções
              </Link>
              <Link to="/size-guide" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Guia de Tamanhos
              </Link>
              <Link to="/care" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Cuidados com Joias
              </Link>
              <Link to="/warranty" className="block text-gray-300 hover:text-accent-300 transition-colors text-sm">
                Garantia
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-300">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-0000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contato@ayvijoias.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 AYVI JOIAS. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-accent-300 text-sm transition-colors">
              Privacidade
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-accent-300 text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
