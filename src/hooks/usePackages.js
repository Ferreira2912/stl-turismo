import { useState, useEffect } from 'react';
import { 
  getPackages, 
  getFeaturedPackages, 
  addPackage as addPackageToDb,
  updatePackage as updatePackageInDb,
  deletePackage as deletePackageFromDb
} from '../services/database';

export const usePackages = (featured = false) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = featured ? await getFeaturedPackages() : await getPackages();
        setPackages(data || []);
      } catch (err) {
        console.error('Erro ao carregar pacotes:', err);
        setError(err);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [featured]);

  const addPackage = async (packageData) => {
    try {
      const newPackage = await addPackageToDb(packageData);
      setPackages(prev => [newPackage, ...prev]);
      return newPackage;
    } catch (err) {
      console.error('Erro ao adicionar pacote:', err);
      throw err;
    }
  };

  const updatePackage = async (packageId, packageData) => {
    try {
      const updatedPackage = await updatePackageInDb(packageId, packageData);
      setPackages(prev => 
        prev.map(pkg => pkg.id === packageId ? updatedPackage : pkg)
      );
      return updatedPackage;
    } catch (err) {
      console.error('Erro ao atualizar pacote:', err);
      throw err;
    }
  };

  const deletePackage = async (packageId) => {
    try {
      await deletePackageFromDb(packageId);
      setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
    } catch (err) {
      console.error('Erro ao deletar pacote:', err);
      throw err;
    }
  };

  return {
    packages,
    loading,
    error,
    addPackage,
    updatePackage,
    deletePackage
  };
};
