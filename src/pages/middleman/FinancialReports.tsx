import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface Transaction {
  id: string;
  date: string;
  type: 'Purchase' | 'Sale' | 'Expense' | 'Other';
  category: string;
  amount: number;
  party: string;
  status: 'Completed' | 'Pending' | 'Failed';
  paymentMethod: string;
  reference: string;
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  grossProfit: number;
  accountsReceivable: number;
  accountsPayable: number;
  cashFlow: number;
}

const FinancialReports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const financialSummary: FinancialSummary = {
    totalRevenue: 2850000,
    totalExpenses: 1950000,
    grossProfit: 900000,
    accountsReceivable: 450000,
    accountsPayable: 380000,
    cashFlow: 520000
  };

  const transactions: Transaction[] = [
    {
      id: 'TRX001',
      date: '2024-01-24',
      type: 'Sale',
      category: 'Vegetables',
      amount: 125000,
      party: 'Metro Mart',
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      reference: 'INV-2024-001'
    },
    {
      id: 'TRX002',
      date: '2024-01-24',
      type: 'Purchase',
      category: 'Fruits',
      amount: 85000,
      party: 'Krishna Farms',
      status: 'Pending',
      paymentMethod: 'NEFT',
      reference: 'PO-2024-002'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Financial Reports</h1>
          <div className="space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              + New Transaction
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Download Reports
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search transactions..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Revenue & Profit</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-2xl font-semibold text-green-600">
                  ₹{(financialSummary.totalRevenue / 100000).toFixed(1)}L
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Expenses</div>
                <div className="text-2xl font-semibold text-red-600">
                  ₹{(financialSummary.totalExpenses / 100000).toFixed(1)}L
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Gross Profit</div>
                <div className="text-2xl font-semibold text-blue-600">
                  ₹{(financialSummary.grossProfit / 100000).toFixed(1)}L
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Accounts</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Accounts Receivable</div>
                <div className="text-2xl font-semibold text-yellow-600">
                  ₹{(financialSummary.accountsReceivable / 100000).toFixed(1)}L
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Accounts Payable</div>
                <div className="text-2xl font-semibold text-purple-600">
                  ₹{(financialSummary.accountsPayable / 100000).toFixed(1)}L
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Cash Flow</div>
                <div className="text-2xl font-semibold text-green-600">
                  ₹{(financialSummary.cashFlow / 100000).toFixed(1)}L
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                📊 Generate Monthly Report
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                💰 Reconcile Accounts
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                📥 Import Transactions
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                📤 Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'Sale'
                          ? 'bg-green-100 text-green-800'
                          : transaction.type === 'Purchase'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{transaction.category}</td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${
                        transaction.type === 'Sale' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{(transaction.amount / 1000).toFixed(1)}K
                      </div>
                      <div className="text-sm text-gray-500">{transaction.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{transaction.party}</div>
                        <div className="text-sm text-gray-500">{transaction.reference}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Void</button>
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

export default FinancialReports;
