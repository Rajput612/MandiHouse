import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  reorderPoint: number;
}

const Inventory: React.FC = () => {
  const { adminData } = useAdmin();
  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      quantity: 500,
      unit: 'kg',
      location: 'Warehouse A',
      lastUpdated: '2024-01-15',
      status: 'in-stock',
      reorderPoint: 100
    },
    {
      id: '2',
      name: 'Organic Rice',
      category: 'Grains',
      quantity: 50,
      unit: 'kg',
      location: 'Warehouse B',
      lastUpdated: '2024-01-16',
      status: 'low-stock',
      reorderPoint: 100
    },
    {
      id: '3',
      name: 'Fresh Milk',
      category: 'Dairy',
      quantity: 200,
      unit: 'L',
      location: 'Cold Storage A',
      lastUpdated: '2024-01-17',
      status: 'in-stock',
      reorderPoint: 50
    },
    {
      id: '4',
      name: 'Wheat Flour',
      category: 'Grains',
      quantity: 10,
      unit: 'kg',
      location: 'Warehouse C',
      lastUpdated: '2024-01-17',
      status: 'out-of-stock',
      reorderPoint: 100
    },
    {
      id: '5',
      name: 'Potatoes',
      category: 'Vegetables',
      quantity: 300,
      unit: 'kg',
      location: 'Warehouse A',
      lastUpdated: '2024-01-16',
      status: 'in-stock',
      reorderPoint: 150
    },
    {
      id: '6',
      name: 'Onions',
      category: 'Vegetables',
      quantity: 25,
      unit: 'kg',
      location: 'Warehouse A',
      lastUpdated: '2024-01-17',
      status: 'low-stock',
      reorderPoint: 100
    },
    {
      id: '7',
      name: 'Ghee',
      category: 'Dairy',
      quantity: 0,
      unit: 'L',
      location: 'Cold Storage B',
      lastUpdated: '2024-01-17',
      status: 'out-of-stock',
      reorderPoint: 30
    },
    {
      id: '8',
      name: 'Sugar',
      category: 'Essentials',
      quantity: 400,
      unit: 'kg',
      location: 'Warehouse B',
      lastUpdated: '2024-01-15',
      status: 'in-stock',
      reorderPoint: 200
    }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>
        <p className="text-gray-600">Track and manage product inventory levels</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Item
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Stock Update
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
            Generate Report
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search inventory..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Items</div>
          <div className="text-2xl font-semibold">1,234</div>
          <div className="text-xs text-green-500">+5% from last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Low Stock Items</div>
          <div className="text-2xl font-semibold">23</div>
          <div className="text-xs text-yellow-500">Needs attention</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Out of Stock</div>
          <div className="text-2xl font-semibold">7</div>
          <div className="text-xs text-red-500">Critical</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Value</div>
          <div className="text-2xl font-semibold">₹2.5M</div>
          <div className="text-xs text-green-500">+2.3% this week</div>
        </div>
      </div>

      {/* Inventory Level Chart Placeholder */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Inventory Levels</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Inventory level chart will be implemented here</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Current Inventory</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item.quantity} {item.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'in-stock'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'low-stock'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.lastUpdated}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Update</button>
                  <button className="text-blue-600 hover:text-blue-900">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">20</span> results
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
