import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const appUser: User = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || 'Usuário',
          role: session.user.user_metadata.role || 'customer',
        };
        setUser(appUser);
      }
      setIsLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const appUser: User = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || 'Usuário',
          role: session.user.user_metadata.role || 'customer',
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) return { success: false, error: "Credenciais inválidas. Verifique seu e-mail e senha." };
    return { success: true, error: null };
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          role: 'customer'
        }
      }
    });
    setIsLoading(false);
    if (error) return { success: false, error: "Não foi possível criar a conta. O e-mail pode já estar em uso." };
    alert('Conta criada! Por favor, verifique seu e-mail para confirmar sua conta antes de fazer login.');
    return { success: true, error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
