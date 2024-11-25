import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const OverviewDashboard: React.FC = () => {
  const quickStats = [
    { label: 'Active Orders', value: '45', change: '+12%', icon: '📦' },
    { label: 'Today\'s Revenue', value: '₹85,000', change: '+8%', icon: '💰' },
    { label: 'Pending Deliveries', value: '23', change: '-5%', icon: '🚚' },
    { label: 'Quality Issues', value: '3', change: '-2', icon: '⚠️' },
  ];

  const inventoryAlerts = [
    { product: 'Tomatoes', stock: '250 kg', alert: 'Low Stock', status: 'warning' },
    { product: 'Potatoes', stock: '100 kg', alert: 'Critical', status: 'danger' },
    { product: 'Onions', stock: '500 kg', alert: 'Optimal', status: 'success' },
  ];

  const recentTransactions = [
    { id: 1, type: 'Purchase', item: 'Tomatoes', quantity: '500 kg', amount: '₹25,000', supplier: 'Krishna Farms' },
    { id: 2, type: 'Sale', item: 'Potatoes', quantity: '300 kg', amount: '₹18,000', buyer: 'Metro Mart' },
    { id: 3, type: 'Purchase', item: 'Onions', quantity: '400 kg', amount: '₹20,000', supplier: 'Organic Valley' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Alerts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Inventory Alerts</h2>
            <div className="space-y-4">
              {inventoryAlerts.map((alert) => (
                <div key={alert.product} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="font-medium">{alert.product}</h3>
                    <p className="text-sm text-gray-600">Stock: {alert.stock}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    alert.status === 'danger' ? 'bg-red-100 text-red-700' :
                    alert.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {alert.alert}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="font-medium">{transaction.item}</h3>
                    <p className="text-sm text-gray-600">
                      {transaction.type} • {transaction.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p className="text-sm text-gray-600">
                      {transaction.supplier || transaction.buyer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Trends Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Today's Market Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Price Fluctuations</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Tomatoes</span>
                  <span className="text-red-500">↓ ₹5/kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Potatoes</span>
                  <span className="text-green-500">↑ ₹2/kg</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">High Demand</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Onions</span>
                  <span className="text-green-500">+20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Garlic</span>
                  <span className="text-green-500">+15%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Quality Metrics</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Avg. Quality Score</span>
                  <span className="font-medium">4.2/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Rejection Rate</span>
                  <span className="text-green-500">2.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OverviewDashboard;
