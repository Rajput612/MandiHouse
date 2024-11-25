import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface Buyer {
  id: string;
  name: string;
  location: string;
  purchaseCategories: string[];
  totalOrders: number;
  activeOrders: number;
  lastPurchase: string;
  status: 'Active' | 'Inactive';
  loyaltyScore: number;
  totalSpent: number;
}

const BuyerAnalytics: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const buyers: Buyer[] = [
    {
      id: 'BUY001',
      name: 'Metro Mart',
      location: 'Delhi',
      purchaseCategories: ['Vegetables', 'Fruits', 'Grains'],
      totalOrders: 250,
      activeOrders: 3,
      lastPurchase: '2024-01-24',
      status: 'Active',
      loyaltyScore: 92,
      totalSpent: 1250000
    },
    {
      id: 'BUY002',
      name: 'Fresh Foods Ltd',
      location: 'Mumbai',
      purchaseCategories: ['Fruits', 'Vegetables'],
      totalOrders: 180,
      activeOrders: 2,
      lastPurchase: '2024-01-23',
      status: 'Active',
      loyaltyScore: 88,
      totalSpent: 980000
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Buyer Analytics</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add New Buyer
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search buyers..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Buyer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Buyers</h3>
            <p className="text-2xl font-semibold">42</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Buyers</h3>
            <p className="text-2xl font-semibold text-green-600">35</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Avg Order Value</h3>
            <p className="text-2xl font-semibold text-blue-600">₹45,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Monthly Revenue</h3>
            <p className="text-2xl font-semibold text-yellow-600">₹12.5M</p>
          </div>
        </div>

        {/* Buyers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Buyer List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loyalty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buyers.map((buyer) => (
                  <tr key={buyer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{buyer.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{buyer.name}</div>
                        <div className="text-sm text-gray-500">Last purchase: {buyer.lastPurchase}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{buyer.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {buyer.purchaseCategories.map((category, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>Total: {buyer.totalOrders}</div>
                        <div className="text-sm text-gray-500">Active: {buyer.activeOrders}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{(buyer.totalSpent / 1000).toFixed(1)}K
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${buyer.loyaltyScore}%` }}
                          />
                        </div>
                        <span>{buyer.loyaltyScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        buyer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {buyer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Order History</button>
                      <button className="text-red-600 hover:text-red-900">Block</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerAnalytics;
