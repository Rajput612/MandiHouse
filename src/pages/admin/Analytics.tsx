import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

interface SalesData {
  id: string;
  product: string;
  revenue: number;
  quantity: number;
  date: string;
  region: string;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  trend: number;
  status: 'up' | 'down' | 'neutral';
}

const Analytics: React.FC = () => {
  const { adminData } = useAdmin();
  
  const [salesData] = useState<SalesData[]>([
    {
      id: '1',
      product: 'Fresh Tomatoes',
      revenue: 25000,
      quantity: 500,
      date: '2024-01-15',
      region: 'North'
    },
    {
      id: '2',
      product: 'Organic Rice',
      revenue: 45000,
      quantity: 300,
      date: '2024-01-16',
      region: 'South'
    },
    {
      id: '3',
      product: 'Fresh Milk',
      revenue: 30000,
      quantity: 600,
      date: '2024-01-17',
      region: 'East'
    },
    {
      id: '4',
      product: 'Wheat Flour',
      revenue: 18000,
      quantity: 200,
      date: '2024-01-17',
      region: 'West'
    },
    {
      id: '5',
      product: 'Potatoes',
      revenue: 15000,
      quantity: 400,
      date: '2024-01-16',
      region: 'North'
    }
  ]);

  const [performanceMetrics] = useState<PerformanceMetric[]>([
    {
      id: '1',
      name: 'Total Revenue',
      value: 133000,
      trend: 12.5,
      status: 'up'
    },
    {
      id: '2',
      name: 'Average Order Value',
      value: 2500,
      trend: -3.2,
      status: 'down'
    },
    {
      id: '3',
      name: 'Customer Satisfaction',
      value: 4.2,
      trend: 0.3,
      status: 'up'
    },
    {
      id: '4',
      name: 'Order Fulfillment Rate',
      value: 94.5,
      trend: 1.5,
      status: 'up'
    }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor key performance metrics and trends</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {performanceMetrics.map((metric) => (
          <div key={metric.id} className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">{metric.name}</div>
            <div className="text-2xl font-semibold">
              {metric.name === 'Total Revenue' ? `₹${metric.value.toLocaleString()}` : metric.value}
              {metric.name === 'Customer Satisfaction' && '/5'}
              {metric.name === 'Order Fulfillment Rate' && '%'}
            </div>
            <div className={`text-xs ${
              metric.status === 'up' ? 'text-green-500' : 
              metric.status === 'down' ? 'text-red-500' : 
              'text-gray-500'
            }`}>
              {metric.trend > 0 ? '+' : ''}{metric.trend}% from last month
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Sales Trends</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Sales trend chart will be implemented here</p>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Regional Performance</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Regional performance chart will be implemented here</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Product Performance</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Product performance chart will be implemented here</p>
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Sales</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{sale.product}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{sale.revenue.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sale.quantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{sale.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{sale.region}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
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

export default Analytics;
