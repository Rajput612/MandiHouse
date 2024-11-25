import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminDashboard: React.FC = () => {
  const { adminData } = useAdmin();
  const location = useLocation();

  const navItems = [
    {
      path: '/admin/users',
      name: 'User Management',
      icon: '👥',
      description: 'Manage users, roles, and permissions'
    },
    {
      path: '/admin/products',
      name: 'Product Catalog',
      icon: '📦',
      description: 'Manage products and categories'
    },
    {
      path: '/admin/middlemen',
      name: 'Middleman Portal',
      icon: '🤝',
      description: 'Oversee middleman operations'
    },
    {
      path: '/admin/finances',
      name: 'Financial Reports',
      icon: '💰',
      description: 'Track revenue and transactions'
    },
    {
      path: '/admin/quality',
      name: 'Quality Control',
      icon: '✅',
      description: 'Monitor product quality'
    },
    {
      path: '/admin/inventory',
      name: 'Inventory',
      icon: '📊',
      description: 'Manage stock levels'
    },
    {
      path: '/admin/analytics',
      name: 'Analytics',
      icon: '📈',
      description: 'View performance metrics'
    },
    {
      path: '/admin/settings',
      name: 'Settings',
      icon: '⚙️',
      description: 'System configuration'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600">Welcome, {adminData?.username}</p>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
