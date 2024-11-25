import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  expiryDate: string;
  location: string;
  quality: 'High' | 'Medium' | 'Low';
}

const InventoryManagement: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryData: InventoryItem[] = [
    {
      id: 1,
      name: 'Tomatoes',
      category: 'Vegetables',
      quantity: 500,
      unit: 'kg',
      purchasePrice: 20,
      sellingPrice: 25,
      expiryDate: '2024-02-10',
      location: 'Warehouse A',
      quality: 'High'
    },
    {
      id: 2,
      name: 'Potatoes',
      category: 'Vegetables',
      quantity: 1000,
      unit: 'kg',
      purchasePrice: 15,
      sellingPrice: 18,
      expiryDate: '2024-03-15',
      location: 'Warehouse B',
      quality: 'Medium'
    },
    // Add more items as needed
  ];

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];

  const filteredInventory = inventoryData.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            + Add New Item
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full px-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.purchasePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.sellingPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.expiryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.quality === 'High' ? 'bg-green-100 text-green-800' :
                      item.quality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.quality}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Low Stock Alerts</h3>
            <p className="text-red-500">3 items below threshold</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Expiring Soon</h3>
            <p className="text-yellow-500">5 items expiring this week</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Inventory Value</h3>
            <p className="text-green-500">₹1,25,000</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InventoryManagement;
