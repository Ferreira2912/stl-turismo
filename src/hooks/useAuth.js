import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock admin para desenvolvimento
      if (email === 'admin@stlturismo.com' && password === 'admin123') {
        const mockUser = {
          uid: 'mock-admin-uid',
          email: 'admin@stlturismo.com',
          displayName: 'Admin STL'
        };
        setUser(mockUser);
  if (import.meta.env.DEV) console.log('🔑 Admin logado (mock):', mockUser.email);
        return mockUser;
      }
      
      // Tentar Firebase se as credenciais estão configuradas
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
  if (import.meta.env.DEV) console.log('🔑 Admin logado (Firebase):', result.user.email);
        return result.user;
      } catch (firebaseError) {
  if (import.meta.env.DEV) console.warn('⚠️ Firebase não configurado, usando apenas mock');
        throw new Error('Credenciais inválidas. Use: admin@stlturismo.com / admin123');
      }
    } catch (error) {
  if (import.meta.env.DEV) console.error('❌ Erro no login:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
  if (import.meta.env.DEV) console.log('👋 Admin deslogado');
    } catch (error) {
  if (import.meta.env.DEV) console.error('❌ Erro no logout:', error);
      setError(error.message);
    }
  };

  const isAdmin = () => {
    return user && user.email && (
      user.email.includes('@stlturismo.com') || 
      user.email === 'admin@stlturismo.com'
    );
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut: signOutUser,
    isAuthenticated: !!user,
    isAdmin: isAdmin()
  };
};
