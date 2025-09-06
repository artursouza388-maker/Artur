import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import UnderConstruction from './pages/UnderConstruction';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Auth Routes (without layout) */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Public Routes (with layout) */}
            <Route 
              path="/" 
              element={
                <Layout>
                  <Home />
                </Layout>
              } 
            />
            <Route 
              path="/products" 
              element={
                <Layout>
                  <Products />
                </Layout>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Layout>
                  <Cart />
                </Layout>
              } 
            />
            
            {/* Placeholder Routes */}
            <Route 
              path="/about" 
              element={
                <Layout>
                  <div className="min-h-screen bg-gray-50 py-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Sobre a AYVI JOIAS</h1>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Fundada em 2020, a AYVI JOIAS nasceu do sonho de criar peças únicas que celebram 
                        a beleza e elegância de cada mulher. Nosso compromisso é oferecer joias de qualidade 
                        excepcional, com design exclusivo e materiais premium.
                      </p>
                    </div>
                  </div>
                </Layout>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <Layout>
                  <div className="min-h-screen bg-gray-50 py-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Fale Conosco</h1>
                      <div className="space-y-6 text-lg text-gray-600">
                        <p><strong>Email:</strong> contato@ayvijoias.com</p>
                        <p><strong>Telefone:</strong> (11) 9999-0000</p>
                        <p><strong>WhatsApp:</strong> (11) 9999-0000</p>
                        <p><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
                      </div>
                    </div>
                  </div>
                </Layout>
              } 
            />

            {/* Protected User Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Layout><UnderConstruction /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <Layout><UnderConstruction /></Layout>
                </ProtectedRoute>
              } 
            />

            {/* Public Placeholder Routes */}
            <Route path="/product/:id" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/shipping" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/returns" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/size-guide" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/care" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/warranty" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/privacy" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/terms" element={<Layout><UnderConstruction /></Layout>} />
            <Route path="/forgot-password" element={<Layout><UnderConstruction /></Layout>} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
