import { useState, useEffect } from 'react';
import { getDestinations } from '../services/database';
import { mockDestinations } from '../data/mockData';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        let data;
        
        if (import.meta.env.DEV) {
          data = mockDestinations;
        } else {
          data = await getDestinations();
        }
        
        setDestinations(data);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar destinos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error };
};