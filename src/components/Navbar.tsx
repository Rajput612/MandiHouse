import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsAuthDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white py-3 px-4 sm:px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <i className="fas fa-store text-xl sm:text-2xl text-green-500"></i>
            <span className="text-base sm:text-lg font-semibold text-green-600">Mandi House</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-green-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && user?.userType === 'seller' ? (
              <>
                <Link to="/seller/dashboard" className="text-gray-600 hover:text-green-600">Dashboard</Link>
                <Link to="/seller/insights" className="text-gray-600 hover:text-green-600">Insights</Link>
                <Link to="/seller/advanced-insights" className="text-gray-600 hover:text-green-600">Advanced Analytics</Link>
                <Link to="/seller/orders" className="text-gray-600 hover:text-green-600">Orders</Link>
                <Link to="/seller/inventory" className="text-gray-600 hover:text-green-600">Inventory</Link>
              </>
            ) : (
              <>
                <Link to="/products" className="text-gray-600 hover:text-green-600">Products</Link>
                <Link to="/orders" className="text-gray-600 hover:text-green-600">Orders</Link>
                <Link to="/cart" className="text-gray-600 hover:text-green-600">Cart</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-600 hover:text-green-600">
              <i className="fas fa-search text-lg sm:text-xl"></i>
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600 relative">
              <i className="fas fa-shopping-cart text-lg sm:text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
            
            {/* Authentication Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-gray-600 hover:text-green-600"
              >
                <i className="fas fa-user text-lg sm:text-xl"></i>
                <span className="hidden sm:inline text-sm">
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
                      <Link
                        to="/auth/buyer/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsAuthDropdownOpen(false)}
                      >
                        <i className="fas fa-shopping-bag mr-2"></i>
                        Buyer
                      </Link>
                      <Link
                        to="/auth/seller/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsAuthDropdownOpen(false)}
                      >
                        <i className="fas fa-store mr-2"></i>
                        Seller
                      </Link>
                      <div className="border-t">
                        <div className="px-4 py-2 text-xs text-gray-500">New user?</div>
                        <Link
                          to="/auth/buyer/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAuthDropdownOpen(false)}
                        >
                          <i className="fas fa-user-plus mr-2"></i>
                          Sign up as Buyer
                        </Link>
                        <Link
                          to="/auth/seller/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAuthDropdownOpen(false)}
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {isAuthenticated && user?.userType === 'seller' ? (
                <>
                  <Link to="/seller/dashboard" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                  <Link to="/seller/insights" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Insights</Link>
                  <Link to="/seller/advanced-insights" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Advanced Analytics</Link>
                  <Link to="/seller/orders" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
                  <Link to="/seller/inventory" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Inventory</Link>
                </>
              ) : (
                <>
                  <Link to="/products" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                  <Link to="/orders" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
                  <Link to="/cart" className="text-gray-600 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}