import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/overview', icon: '📊', label: 'Overview' },
    { path: '/inventory', icon: '📦', label: 'Inventory' },
    { path: '/orders', icon: '📝', label: 'Orders' },
    { path: '/suppliers', icon: '🚛', label: 'Suppliers' },
    { path: '/buyers', icon: '🏪', label: 'Buyers' },
    { path: '/prices', icon: '💰', label: 'Prices' },
    { path: '/quality', icon: '✅', label: 'Quality' },
    { path: '/transportation', icon: '🚚', label: 'Transport' },
    { path: '/finance', icon: '📈', label: 'Finance' },
    {
      path: '/supplier-management',
      icon: '👥',
      label: 'Supplier Management'
    },
    {
      path: '/middleman/financial-reports',
      icon: '💰',
      label: 'Financial Reports'
    },
  ];

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Mandi House</h1>
        <p className="text-sm text-gray-600">Middleman Dashboard</p>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
