import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const AdminOverview: React.FC = () => {
  const { adminData } = useAdmin();

  const stats = [
    {
      label: 'Total Users',
      value: '1,234',
      change: '+12%',
      trend: 'up'
    },
    {
      label: 'Active Products',
      value: '567',
      change: '+8%',
      trend: 'up'
    },
    {
      label: 'Middlemen',
      value: '89',
      change: '+5%',
      trend: 'up'
    },
    {
      label: 'Revenue',
      value: '₹12.4M',
      change: '+15%',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {adminData?.username}</h1>
          <p className="text-gray-600">Here's what's happening in your marketplace today</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/users"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mb-2 block">👥</span>
            <h3 className="font-medium text-gray-800">User Management</h3>
            <p className="text-sm text-gray-600">Manage users and roles</p>
          </Link>
          <Link
            to="/admin/products"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mb-2 block">📦</span>
            <h3 className="font-medium text-gray-800">Product Catalog</h3>
            <p className="text-sm text-gray-600">Manage products</p>
          </Link>
          <Link
            to="/admin/middlemen"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mb-2 block">🤝</span>
            <h3 className="font-medium text-gray-800">Middleman Portal</h3>
            <p className="text-sm text-gray-600">View middleman activity</p>
          </Link>
          <Link
            to="/admin/analytics"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mb-2 block">📈</span>
            <h3 className="font-medium text-gray-800">Analytics</h3>
            <p className="text-sm text-gray-600">View insights</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
