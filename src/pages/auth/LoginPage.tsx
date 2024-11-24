import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  const { userType } = useParams<{ userType: string }>();

  // Validate user type
  if (userType !== 'buyer' && userType !== 'seller') {
    return <Navigate to="/auth/buyer/login" replace />;
  }

  return <LoginForm userType={userType} />;
}
