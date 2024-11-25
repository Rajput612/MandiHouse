import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface QualityCheck {
  id: string;
  productName: string;
  batchNumber: string;
  checkDate: string;
  inspector: string;
  status: 'Passed' | 'Failed' | 'Pending';
  qualityScore: number;
  parameters: {
    appearance: number;
    freshness: number;
    packaging: number;
    temperature: number;
  };
  notes: string;
}

const QualityControl: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const qualityChecks: QualityCheck[] = [
    {
      id: 'QC001',
      productName: 'Fresh Tomatoes',
      batchNumber: 'B2024-001',
      checkDate: '2024-01-24',
      inspector: 'Rajesh Kumar',
      status: 'Passed',
      qualityScore: 92,
      parameters: {
        appearance: 95,
        freshness: 90,
        packaging: 94,
        temperature: 89
      },
      notes: 'All parameters within acceptable range. Packaging intact.'
    },
    {
      id: 'QC002',
      productName: 'Organic Potatoes',
      batchNumber: 'B2024-002',
      checkDate: '2024-01-24',
      inspector: 'Priya Singh',
      status: 'Pending',
      qualityScore: 85,
      parameters: {
        appearance: 88,
        freshness: 82,
        packaging: 87,
        temperature: 83
      },
      notes: 'Minor appearance issues. Needs secondary inspection.'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quality Control</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            + New Quality Check
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search quality checks..."
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
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Quality Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Checks</h3>
            <p className="text-2xl font-semibold">156</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Pass Rate</h3>
            <p className="text-2xl font-semibold text-green-600">94%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Pending Checks</h3>
            <p className="text-2xl font-semibold text-yellow-600">12</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Avg Quality Score</h3>
            <p className="text-2xl font-semibold text-blue-600">88.5</p>
          </div>
        </div>

        {/* Quality Checks Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Quality Checks</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspector</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameters</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {qualityChecks.map((check) => (
                  <tr key={check.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{check.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{check.productName}</div>
                        <div className="text-sm text-gray-500">Date: {check.checkDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{check.batchNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{check.inspector}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <span className="w-20">Appearance:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${check.parameters.appearance}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="w-20">Freshness:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${check.parameters.freshness}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="w-20">Packaging:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: `${check.parameters.packaging}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${check.qualityScore}%` }}
                          />
                        </div>
                        <span>{check.qualityScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        check.status === 'Passed'
                          ? 'bg-green-100 text-green-800'
                          : check.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {check.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Report</button>
                      <button className="text-red-600 hover:text-red-900">Reject</button>
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

export default QualityControl;
