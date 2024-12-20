import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAdminLoggedIn } = useAdmin();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
