import { useState, useEffect } from 'react';
import { getPackages, getFeaturedPackages } from '../services/database';
import { mockPackages } from '../data/mockData';

export const usePackages = (featured = false) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        let data;
        
        // Em desenvolvimento, use dados mock
        if (import.meta.env.DEV) {
          data = featured 
            ? mockPackages.filter(pkg => pkg.featured)
            : mockPackages;
        } else {
          data = featured ? await getFeaturedPackages() : await getPackages();
        }
        
        setPackages(data);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar pacotes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [featured]);

  return { packages, loading, error, refetch: () => fetchPackages() };
};