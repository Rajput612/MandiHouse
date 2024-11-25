import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

interface Transaction {
  id: string;
  date: string;
  type: 'sale' | 'purchase' | 'commission';
  amount: number;
  party: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

const FinancialReports: React.FC = () => {
  const { adminData } = useAdmin();
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'sale',
      amount: 25000,
      party: 'Farmer Group A',
      status: 'completed',
      reference: 'TXN123456'
    },
    {
      id: '2',
      date: '2024-01-16',
      type: 'commission',
      amount: 2500,
      party: 'Middleman B',
      status: 'pending',
      reference: 'TXN123457'
    },
    // Add more mock transactions as needed
  ]);

  const totalRevenue = 450000; // ₹4.5L
  const totalExpenses = 320000; // ₹3.2L
  const netProfit = totalRevenue - totalExpenses;
  const growthRate = 15.3;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Financial Reports</h1>
        <p className="text-gray-600">View financial analytics and reports</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Download Report
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Export Excel
          </button>
          <select className="bg-white border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-semibold">₹{(totalRevenue / 100000).toFixed(1)}L</div>
          <div className="text-xs text-green-500">+{growthRate}% from last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Expenses</div>
          <div className="text-2xl font-semibold">₹{(totalExpenses / 100000).toFixed(1)}L</div>
          <div className="text-xs text-red-500">+8.2% from last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Net Profit</div>
          <div className="text-2xl font-semibold">₹{(netProfit / 100000).toFixed(1)}L</div>
          <div className="text-xs text-green-500">+12.5% from last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Profit Margin</div>
          <div className="text-2xl font-semibold">{((netProfit / totalRevenue) * 100).toFixed(1)}%</div>
          <div className="text-xs text-green-500">+2.3% from last month</div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Trends</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Revenue chart will be implemented here</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Party
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 capitalize">{transaction.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{transaction.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{transaction.party}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.reference}
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

export default FinancialReports;
