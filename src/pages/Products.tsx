import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { value: 'all', label: 'Todos os Produtos' },
    { value: 'rings', label: 'Anéis' },
    { value: 'necklaces', label: 'Colares' },
    { value: 'earrings', label: 'Brincos' },
    { value: 'bracelets', label: 'Pulseiras' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nome A-Z' },
    { value: 'price-low', label: 'Menor Preço' },
    { value: 'price-high', label: 'Maior Preço' },
    { value: 'rating', label: 'Melhor Avaliado' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Nossa <span className="text-primary-600">Coleção</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra joias exclusivas criadas com amor e perfeição nos mínimos detalhes
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar joias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex rounded-xl border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 py-3 px-4 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-3 px-4 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-gray-600">
            Mostrando <span className="font-semibold">{filteredProducts.length}</span> produtos
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-gray-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Tente ajustar seus filtros ou termos de busca para encontrar o que procura.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
