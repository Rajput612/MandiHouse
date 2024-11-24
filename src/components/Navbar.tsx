import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsAuthDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white py-3 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <i className="fas fa-store text-2xl text-green-500"></i>
          <span className="text-lg font-semibold text-green-600">Mandi House</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <a href="#featured" className="text-gray-600 hover:text-green-600">Featured</a>
          <a href="#categories" className="text-gray-600 hover:text-green-600">Categories</a>
          <a href="#features" className="text-gray-600 hover:text-green-600">About Us</a>
          <a href="#contact" className="text-gray-600 hover:text-green-600">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-green-600">
            <i className="fas fa-search text-xl"></i>
          </button>
          <button className="p-2 text-gray-600 hover:text-green-600 relative">
            <i className="fas fa-shopping-cart text-xl"></i>
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>
          
          {/* Authentication Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600"
            >
              <i className="fas fa-user text-xl"></i>
              <span className="text-sm">
                {isAuthenticated ? (
                  <>
                    {user?.userType === 'seller' ? 'Seller' : 'Account'}
                    <i className={`fas fa-chevron-down text-xs ml-2 transition-transform ${isAuthDropdownOpen ? 'rotate-180' : ''}`}></i>
                  </>
                ) : (
                  'Account'
                )}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isAuthDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                      {user?.phoneNumber}
                    </div>
                    <button
                      onClick={() => {
                        setIsAuthDropdownOpen(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-user-circle mr-2"></i>
                      Profile
                    </button>
                    {user?.userType === 'seller' ? (
                      <button
                        onClick={() => {
                          setIsAuthDropdownOpen(false);
                          navigate('/seller/dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-chart-line mr-2"></i>
                        Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsAuthDropdownOpen(false);
                          navigate('/buyer/orders');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-shopping-bag mr-2"></i>
                        Orders
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">Login as:</div>
                    <Link
                      to="/auth/buyer/login"
                      onClick={() => setIsAuthDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-shopping-bag mr-2"></i>
                      Buyer
                    </Link>
                    <Link
                      to="/auth/seller/login"
                      onClick={() => setIsAuthDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-store mr-2"></i>
                      Seller
                    </Link>
                    <div className="border-t">
                      <div className="px-4 py-2 text-xs text-gray-500">New user?</div>
                      <Link
                        to="/auth/buyer/signup"
                        onClick={() => setIsAuthDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-user-plus mr-2"></i>
                        Sign up as Buyer
                      </Link>
                      <Link
                        to="/auth/seller/signup"
                        onClick={() => setIsAuthDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-store-alt mr-2"></i>
                        Sign up as Seller
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}