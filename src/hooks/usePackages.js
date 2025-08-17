import { useState, useEffect } from 'react';
import { getPackages, getFeaturedPackages } from '../services/database';
import { mockPackages } from '../data/mockData';

export const usePackages = (featured = false) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        let data = [];
        
        // Tentar Firebase primeiro
        try {
          data = featured ? await getFeaturedPackages() : await getPackages();
          
          // Se Firebase retornou dados, usar Firebase
          if (data && data.length > 0) {
            setIsUsingFirebase(true);
            console.log('📡 Dados carregados do Firebase:', data.length, 'pacotes');
          } else {
            throw new Error('Nenhum dado encontrado no Firebase');
          }
        } catch (firebaseError) {
          console.warn('⚠️ Firebase não disponível, usando dados mock:', firebaseError.message);
          // Fallback para dados mock
          data = featured 
            ? mockPackages.filter(pkg => pkg.featured)
            : mockPackages;
          setIsUsingFirebase(false);
          console.log('💾 Usando dados mock:', data.length, 'pacotes');
        }
        
        setPackages(data);
      } catch (err) {
        setError(err.message);
        console.error('❌ Erro ao carregar pacotes:', err);
        // Em caso de erro total, usar mock como último recurso
        const fallbackData = featured 
          ? mockPackages.filter(pkg => pkg.featured)
          : mockPackages;
        setPackages(fallbackData);
        setIsUsingFirebase(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [featured]);

  const refetch = async () => {
    await fetchPackages();
  };

  return { 
    packages, 
    loading, 
    error, 
    isUsingFirebase,
    refetch
  };
};