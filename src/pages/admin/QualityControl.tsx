import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

interface QualityCheck {
  id: string;
  productName: string;
  batchNumber: string;
  date: string;
  inspector: string;
  status: 'passed' | 'failed' | 'pending';
  score: number;
  notes: string;
}

const QualityControl: React.FC = () => {
  const { adminData } = useAdmin();
  const [qualityChecks] = useState<QualityCheck[]>([
    {
      id: '1',
      productName: 'Fresh Tomatoes',
      batchNumber: 'BATCH001',
      date: '2024-01-15',
      inspector: 'Rahul Verma',
      status: 'passed',
      score: 92,
      notes: 'Good quality, meets all standards'
    },
    {
      id: '2',
      productName: 'Organic Rice',
      batchNumber: 'BATCH002',
      date: '2024-01-16',
      inspector: 'Priya Singh',
      status: 'pending',
      score: 0,
      notes: 'Inspection in progress'
    },
    {
      id: '3',
      productName: 'Fresh Milk',
      batchNumber: 'BATCH003',
      date: '2024-01-17',
      inspector: 'Amit Kumar',
      status: 'passed',
      score: 88,
      notes: 'Acceptable quality, minor improvements needed'
    },
    {
      id: '4',
      productName: 'Wheat Flour',
      batchNumber: 'BATCH004',
      date: '2024-01-17',
      inspector: 'Sneha Patel',
      status: 'failed',
      score: 65,
      notes: 'High moisture content, below quality standards'
    },
    {
      id: '5',
      productName: 'Potatoes',
      batchNumber: 'BATCH005',
      date: '2024-01-16',
      inspector: 'Rajesh Sharma',
      status: 'passed',
      score: 95,
      notes: 'Excellent quality, proper size and freshness'
    },
    {
      id: '6',
      productName: 'Onions',
      batchNumber: 'BATCH006',
      date: '2024-01-17',
      inspector: 'Deepak Verma',
      status: 'pending',
      score: 0,
      notes: 'Sample collection in progress'
    },
    {
      id: '7',
      productName: 'Ghee',
      batchNumber: 'BATCH007',
      date: '2024-01-17',
      inspector: 'Meera Reddy',
      status: 'failed',
      score: 70,
      notes: 'Does not meet fat content requirements'
    },
    {
      id: '8',
      productName: 'Sugar',
      batchNumber: 'BATCH008',
      date: '2024-01-15',
      inspector: 'Vikram Singh',
      status: 'passed',
      score: 90,
      notes: 'Meets purity standards'
    }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Quality Control</h1>
        <p className="text-gray-600">Monitor and manage product quality standards</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            New Inspection
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Quality Reports
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
            Export Data
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search inspections..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Inspections</div>
          <div className="text-2xl font-semibold">256</div>
          <div className="text-xs text-green-500">+12% this month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Pass Rate</div>
          <div className="text-2xl font-semibold">94.2%</div>
          <div className="text-xs text-green-500">+2.1% this month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Pending Inspections</div>
          <div className="text-2xl font-semibold">12</div>
          <div className="text-xs text-yellow-500">5 high priority</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Average Score</div>
          <div className="text-2xl font-semibold">88.5</div>
          <div className="text-xs text-green-500">+1.5 this month</div>
        </div>
      </div>

      {/* Quality Score Chart Placeholder */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Quality Score Trends</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Quality score chart will be implemented here</p>
        </div>
      </div>

      {/* Quality Checks Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Quality Checks</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inspector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {qualityChecks.map((check) => (
              <tr key={check.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{check.productName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{check.batchNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{check.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{check.inspector}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    check.status === 'passed'
                      ? 'bg-green-100 text-green-800'
                      : check.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {check.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{check.score || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">View Details</button>
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
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

export default QualityControl;
