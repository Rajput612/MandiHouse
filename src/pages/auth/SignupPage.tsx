import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SignupForm from '../../components/auth/SignupForm';

export default function SignupPage() {
  const { userType } = useParams<{ userType: string }>();

  // Validate user type
  if (userType !== 'buyer' && userType !== 'seller') {
    return <Navigate to="/auth/buyer/signup" replace />;
  }

  return <SignupForm userType={userType} />;
}
