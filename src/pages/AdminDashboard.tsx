import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Tag,
  Star,
  Eye
} from 'lucide-react';
import { products } from '../data/products';
import { coupons } from '../data/coupons';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Vendas Totais',
      value: 'R$ 45.350,00',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'Pedidos',
      value: '128',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'from-primary-400 to-primary-600'
    },
    {
      title: 'Produtos',
      value: products.length.toString(),
      change: '+3',
      icon: Package,
      color: 'from-secondary-400 to-secondary-600'
    },
    {
      title: 'Clientes',
      value: '89',
      change: '+15.3%',
      icon: Users,
      color: 'from-accent-400 to-accent-600'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'coupons', label: 'Cupons', icon: Tag },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'customers', label: 'Clientes', icon: Users }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-emerald-600 text-sm font-semibold flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Produtos Mais Vendidos</h3>
          <div className="space-y-4">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center space-x-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-gray-600 text-sm">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{Math.floor(Math.random() * 50) + 10}</p>
                  <p className="text-gray-600 text-sm">vendas</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {[
              { action: 'Nova venda', description: 'Anel Solitário Diamante', time: '2 min atrás', type: 'sale' },
              { action: 'Produto adicionado', description: 'Colar Corrente Ouro', time: '15 min atrás', type: 'product' },
              { action: 'Cupom usado', description: 'WELCOME10', time: '32 min atrás', type: 'coupon' },
              { action: 'Novo cliente', description: 'Ana Silva', time: '1h atrás', type: 'customer' },
              { action: 'Produto atualizado', description: 'Brincos Argola Dourados', time: '2h atrás', type: 'product' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'sale' ? 'bg-emerald-500' :
                  activity.type === 'product' ? 'bg-primary-500' :
                  activity.type === 'coupon' ? 'bg-accent-500' : 'bg-secondary-500'
                }`} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Gerenciar Produtos</h2>
        <motion.button
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-5 w-5" />
          <span>Novo Produto</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Produto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Preço</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estoque</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Avaliação</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.slice(0, 10).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-gray-600 text-sm">{product.description.slice(0, 50)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {product.category === 'rings' ? 'Anéis' :
                       product.category === 'necklaces' ? 'Colares' :
                       product.category === 'earrings' ? 'Brincos' : 'Pulseiras'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">R$ {product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                      <p className="text-gray-500 text-sm line-through">R$ {product.originalPrice.toFixed(2)}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'Em estoque' : 'Esgotado'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-accent-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-gray-500 text-sm">({product.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCoupons = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Gerenciar Cupons</h2>
        <motion.button
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-5 w-5" />
          <span>Novo Cupom</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <motion.div
            key={coupon.id}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-accent-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{coupon.code}</h3>
                <p className="text-gray-600">
                  {coupon.discountType === 'percentage' 
                    ? `${coupon.discountValue}% de desconto`
                    : `R$ ${coupon.discountValue.toFixed(2)} de desconto`
                  }
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                coupon.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {coupon.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              {coupon.minPurchase && (
                <p>Compra mínima: R$ {coupon.minPurchase.toFixed(2)}</p>
              )}
              {coupon.maxDiscount && (
                <p>Desconto máximo: R$ {coupon.maxDiscount.toFixed(2)}</p>
              )}
              <p>Válido até: {coupon.expiresAt.toLocaleDateString()}</p>
              <p>Usado: {coupon.usedCount} / {coupon.usageLimit || '∞'}</p>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <motion.button
                className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white py-2 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Editar
              </motion.button>
              <motion.button
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'products':
        return renderProducts();
      case 'coupons':
        return renderCoupons();
      case 'orders':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Gerenciar Pedidos</h3>
            <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        );
      case 'customers':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Gerenciar Clientes</h3>
            <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Painel <span className="text-primary-600">Administrativo</span>
          </h1>
          <p className="text-xl text-gray-600">
            Gerencie sua loja AYVI JOIAS
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-2 mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex space-x-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
