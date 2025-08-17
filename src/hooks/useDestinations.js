import { useState, useEffect } from 'react';
import { getDestinations } from '../services/database';
import { mockDestinations } from '../data/mockData';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        let data = [];
        
        // Tentar Firebase primeiro
        try {
          data = await getDestinations();
          
          if (data && data.length > 0) {
            setIsUsingFirebase(true);
            console.log('📡 Destinos carregados do Firebase:', data.length, 'destinos');
          } else {
            throw new Error('Nenhum destino encontrado no Firebase');
          }
        } catch (firebaseError) {
          console.warn('⚠️ Firebase não disponível para destinos, usando dados mock:', firebaseError.message);
          data = mockDestinations;
          setIsUsingFirebase(false);
          console.log('💾 Usando destinos mock:', data.length, 'destinos');
        }
        
        setDestinations(data);
      } catch (err) {
        setError(err.message);
        console.error('❌ Erro ao carregar destinos:', err);
        // Fallback para mock
        setDestinations(mockDestinations);
        setIsUsingFirebase(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const refetch = async () => {
    await fetchDestinations();
  };

  return { 
    destinations, 
    loading, 
    error, 
    isUsingFirebase,
    refetch 
  };
};