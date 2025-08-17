import React, { useState, useEffect } from 'react';
import { Upload, Database, CheckCircle, AlertCircle, Loader, Settings } from 'lucide-react';
import Button from '../common/Button';
import { runAllMigrations, migratePackages, migrateDestinations } from '../../scripts/migrateData';

const DataMigration = () => {
  const [migrationStatus, setMigrationStatus] = useState({
    packages: 'idle', // idle, loading, success, error
    destinations: 'idle',
    overall: 'idle'
  });
  const [error, setError] = useState(null);
  const [firebaseConfigured, setFirebaseConfigured] = useState(false);

  useEffect(() => {
    // Verificar se Firebase está configurado
    const checkFirebaseConfig = () => {
      const requiredVars = [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_AUTH_DOMAIN',
        'VITE_FIREBASE_PROJECT_ID'
      ];
      
      const hasConfig = requiredVars.every(varName => 
        import.meta.env[varName] && import.meta.env[varName] !== 'your_api_key_here'
      );
      
      setFirebaseConfigured(hasConfig);
    };

    checkFirebaseConfig();
  }, []);

  const handleMigratePackages = async () => {
    setMigrationStatus(prev => ({ ...prev, packages: 'loading' }));
    setError(null);
    
    try {
      await migratePackages();
      setMigrationStatus(prev => ({ ...prev, packages: 'success' }));
    } catch (err) {
      console.error('Erro na migração de pacotes:', err);
      setMigrationStatus(prev => ({ ...prev, packages: 'error' }));
      setError(`Erro nos pacotes: ${err.message}`);
    }
  };

  const handleMigrateDestinations = async () => {
    setMigrationStatus(prev => ({ ...prev, destinations: 'loading' }));
    setError(null);
    
    try {
      await migrateDestinations();
      setMigrationStatus(prev => ({ ...prev, destinations: 'success' }));
    } catch (err) {
      console.error('Erro na migração de destinos:', err);
      setMigrationStatus(prev => ({ ...prev, destinations: 'error' }));
      setError(`Erro nos destinos: ${err.message}`);
    }
  };

  const handleMigrateAll = async () => {
    setMigrationStatus(prev => ({ ...prev, overall: 'loading' }));
    setError(null);
    
    try {
      await runAllMigrations();
      setMigrationStatus({
        packages: 'success',
        destinations: 'success',
        overall: 'success'
      });
    } catch (err) {
      console.error('Erro na migração completa:', err);
      setMigrationStatus(prev => ({ ...prev, overall: 'error' }));
      setError(`Erro geral: ${err.message}. Verifique se o Firebase está configurado.`);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'loading':
        return <Loader className="w-5 h-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Database className="w-5 h-5 text-neutral-400" />;
    }
  };

  if (!import.meta.env.DEV) {
    return null; // Só mostrar em desenvolvimento
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-neutral-200 p-6 max-w-sm z-50">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-primary-600" />
        <h3 className="font-semibold text-neutral-900">Migração de Dados</h3>
      </div>

      {/* Status Firebase */}
      <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
        firebaseConfigured 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-yellow-50 border border-yellow-200'
      }`}>
        <Settings className={`w-4 h-4 ${firebaseConfigured ? 'text-green-600' : 'text-yellow-600'}`} />
        <span className={`text-sm ${firebaseConfigured ? 'text-green-700' : 'text-yellow-700'}`}>
          Firebase: {firebaseConfigured ? 'Configurado' : 'Não configurado'}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Pacotes</span>
          {getStatusIcon(migrationStatus.packages)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Destinos</span>
          {getStatusIcon(migrationStatus.destinations)}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleMigratePackages}
          disabled={migrationStatus.packages === 'loading' || !firebaseConfigured}
          className="w-full"
        >
          Migrar Pacotes
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleMigrateDestinations}
          disabled={migrationStatus.destinations === 'loading' || !firebaseConfigured}
          className="w-full"
        >
          Migrar Destinos
        </Button>
        
        <Button 
          size="sm" 
          variant="primary"
          onClick={handleMigrateAll}
          disabled={migrationStatus.overall === 'loading' || !firebaseConfigured}
          className="w-full"
        >
          Migrar Tudo
        </Button>
      </div>

      <div className="mt-3 text-xs text-neutral-500 text-center">
        Ambiente: Desenvolvimento
        {!firebaseConfigured && (
          <div className="text-yellow-600 mt-1">
            Configure o Firebase no .env
          </div>
        )}
      </div>
    </div>
  );
};

export default DataMigration;
