import React, { useState } from 'react';

interface Middleman {
  id: string;
  name: string;
  location: string;
  activeDeals: number;
  totalRevenue: number;
  rating: number;
  status: 'active' | 'inactive';
  specialization: string[];
  joinDate: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

interface Transaction {
  id: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  productName: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

interface Activity {
  id: string;
  userId: string;
  userType: 'seller' | 'buyer';
  userName: string;
  action: string;
  timestamp: string;
  details: string;
}

const MiddlemanPortal: React.FC = () => {
  const [middlemen] = useState<Middleman[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      activeDeals: 15,
      totalRevenue: 250000,
      rating: 4.8,
      status: 'active',
      specialization: ['Vegetables', 'Fruits'],
      joinDate: '2023-06-15',
      performance: 'excellent'
    },
    {
      id: '2',
      name: 'Amit Patel',
      location: 'Gujarat',
      activeDeals: 8,
      totalRevenue: 180000,
      rating: 4.5,
      status: 'active',
      specialization: ['Grains', 'Pulses'],
      joinDate: '2023-08-20',
      performance: 'good'
    },
    {
      id: '3',
      name: 'Priya Singh',
      location: 'Delhi',
      activeDeals: 12,
      totalRevenue: 220000,
      rating: 4.7,
      status: 'active',
      specialization: ['Dairy', 'Organic'],
      joinDate: '2023-07-10',
      performance: 'excellent'
    }
  ]);

  // Mock data for recent transactions
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TRX001',
      sellerId: 'S001',
      sellerName: 'Rajesh Farms',
      buyerId: 'B001',
      buyerName: 'Delhi Wholesale Market',
      productName: 'Organic Wheat',
      quantity: 1000,
      amount: 35000,
      status: 'completed',
      date: '2024-01-20'
    },
    {
      id: 'TRX002',
      sellerId: 'S002',
      sellerName: 'Krishna Dairy',
      buyerId: 'B002',
      buyerName: 'Mumbai Retail Chain',
      productName: 'Fresh Milk',
      quantity: 500,
      amount: 25000,
      status: 'pending',
      date: '2024-01-21'
    },
    {
      id: 'TRX003',
      sellerId: 'S003',
      sellerName: 'Punjab Growers',
      buyerId: 'B003',
      buyerName: 'Food Processing Co.',
      productName: 'Premium Rice',
      quantity: 2000,
      amount: 80000,
      status: 'completed',
      date: '2024-01-19'
    }
  ]);

  // Mock data for recent activities
  const [activities] = useState<Activity[]>([
    {
      id: 'ACT001',
      userId: 'S001',
      userType: 'seller',
      userName: 'Rajesh Farms',
      action: 'Listed new product',
      timestamp: '2024-01-21 09:30',
      details: 'Added 2000kg of Organic Wheat'
    },
    {
      id: 'ACT002',
      userId: 'B002',
      userType: 'buyer',
      userName: 'Mumbai Retail Chain',
      action: 'Placed order',
      timestamp: '2024-01-21 10:15',
      details: 'Ordered 500L of Fresh Milk'
    },
    {
      id: 'ACT003',
      userId: 'S002',
      userType: 'seller',
      userName: 'Krishna Dairy',
      action: 'Updated inventory',
      timestamp: '2024-01-21 11:00',
      details: 'Added 1000L of Fresh Milk'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'transactions' | 'activities'>('transactions');

  const stats = [
    {
      label: 'Active Sellers',
      value: '234',
      change: '+12%',
      trend: 'up'
    },
    {
      label: 'Active Buyers',
      value: '456',
      change: '+8%',
      trend: 'up'
    },
    {
      label: 'Total Volume',
      value: '₹2.4M',
      change: '+15%',
      trend: 'up'
    },
    {
      label: 'Success Rate',
      value: '94%',
      change: '+2%',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Middleman Portal</h1>
          <p className="text-gray-600">Monitor seller and buyer activities</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('transactions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'transactions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recent Transactions
          </button>
          <button
            onClick={() => setSelectedTab('activities')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'activities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User Activities
          </button>
          <button
            onClick={() => setSelectedTab('middlemen')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'middlemen'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Middlemen Directory
          </button>
        </nav>
      </div>

      {/* Content */}
      {selectedTab === 'transactions' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.sellerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.buyerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.productName} ({transaction.quantity} units)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedTab === 'activities' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.userType === 'seller'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {activity.userType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Middleman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Deals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {middlemen.map((middleman) => (
                <tr key={middleman.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {middleman.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {middleman.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {middleman.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {middleman.activeDeals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{(middleman.totalRevenue / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${middleman.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                        middleman.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                        middleman.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {middleman.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MiddlemanPortal;
