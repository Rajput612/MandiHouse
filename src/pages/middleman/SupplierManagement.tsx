import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface Supplier {
  id: string;
  name: string;
  location: string;
  products: string[];
  rating: number;
  totalOrders: number;
  activeOrders: number;
  lastDelivery: string;
  status: 'Active' | 'Inactive';
  qualityScore: number;
  reliabilityScore: number;
}

const SupplierManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const suppliers: Supplier[] = [
    {
      id: 'SUP001',
      name: 'Krishna Farms',
      location: 'Punjab',
      products: ['Tomatoes', 'Potatoes', 'Onions'],
      rating: 4.5,
      totalOrders: 150,
      activeOrders: 5,
      lastDelivery: '2024-01-24',
      status: 'Active',
      qualityScore: 92,
      reliabilityScore: 88
    },
    {
      id: 'SUP002',
      name: 'Organic Valley',
      location: 'Haryana',
      products: ['Carrots', 'Cabbage', 'Cauliflower'],
      rating: 4.2,
      totalOrders: 120,
      activeOrders: 3,
      lastDelivery: '2024-01-23',
      status: 'Active',
      qualityScore: 89,
      reliabilityScore: 85
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Supplier Management</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            + Add New Supplier
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search suppliers..."
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

        {/* Supplier Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Suppliers</h3>
            <p className="text-2xl font-semibold">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Suppliers</h3>
            <p className="text-2xl font-semibold text-green-600">20</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Avg Quality Score</h3>
            <p className="text-2xl font-semibold text-blue-600">87%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Pending Orders</h3>
            <p className="text-2xl font-semibold text-yellow-600">15</p>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Supplier List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{supplier.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-gray-500">Last delivery: {supplier.lastDelivery}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{supplier.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {supplier.products.map((product, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {product}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        {supplier.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>Total: {supplier.totalOrders}</div>
                        <div className="text-sm text-gray-500">Active: {supplier.activeOrders}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${supplier.qualityScore}%` }}
                            />
                          </div>
                          <span>{supplier.qualityScore}%</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Reliability: {supplier.reliabilityScore}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {supplier.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                      <button className="text-green-600 hover:text-green-900 mr-2">Order</button>
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

export default SupplierManagement;
