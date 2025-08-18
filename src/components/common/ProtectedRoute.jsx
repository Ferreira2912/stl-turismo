import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import AdminLogin from '../admin/AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <AdminLogin />;
  }

  return children;
};

export default ProtectedRoute;
