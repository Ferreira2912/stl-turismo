import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminPackages from '../components/admin/AdminPackages';
import AdminReservations from '../components/admin/AdminReservations';
import AdminSettings from '../components/admin/AdminSettings';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { isAdmin, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'packages':
        return <AdminPackages />;
      case 'reservations':
        return <AdminReservations />;
      case 'leads':
        return <AdminReservations />; // Usando o mesmo componente para leads
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
