import React from 'react';
import { Package } from 'lucide-react';

const AdminDashboard = () => {
  const goToCreatePackage = () => {
    // Sinalizar para abrir seção de pacotes
    try {
      window.location.hash = '#packages-new';
    } catch (e) {
      void e; // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao painel administrativo</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última atualização</p>
          <p className="text-sm font-medium">{new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* Ações Rápidas mínimas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={goToCreatePackage}
            className="flex items-center justify-center gap-3 p-5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Package className="w-6 h-6 text-blue-600" />
            <span className="text-gray-800 font-semibold">Criar Pacote</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
