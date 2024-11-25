import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface MiddlemanRouteProps {
  children: React.ReactNode;
}

const MiddlemanRoute: React.FC<MiddlemanRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'middleman') {
    return <Navigate to="/auth/middleman/login" replace />;
  }

  return <>{children}</>;
};

export default MiddlemanRoute;
