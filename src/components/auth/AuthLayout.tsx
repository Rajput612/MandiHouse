import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  userType: 'buyer' | 'seller';
  showToggle?: boolean;
  onToggleUserType?: (type: 'buyer' | 'seller') => void;
}

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  userType,
  showToggle = false,
  onToggleUserType 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <i className="fas fa-store text-4xl text-green-500"></i>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
        {showToggle && (
          <div className="mt-4">
            <div className="bg-white p-1 rounded-lg shadow-sm flex justify-center max-w-[240px] mx-auto">
              <button
                onClick={() => onToggleUserType?.('buyer')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  userType === 'buyer'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Buyer
              </button>
              <button
                onClick={() => onToggleUserType?.('seller')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  userType === 'seller'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-store mr-2"></i>
                Seller
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
