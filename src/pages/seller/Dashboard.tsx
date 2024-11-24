import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const recentOrders = [
  { 
    id: '1', 
    customer: 'John Doe', 
    product: 'Organic Tomatoes', 
    amount: 2500, 
    status: 'Pending',
    date: '2024-02-24',
    location: 'Mumbai, Maharashtra'
  },
  { 
    id: '2', 
    customer: 'Jane Smith', 
    product: 'Fresh Potatoes', 
    amount: 1800, 
    status: 'Delivered',
    date: '2024-02-23',
    location: 'Delhi, NCR'
  },
  { 
    id: '3', 
    customer: 'Mike Johnson', 
    product: 'Green Peas', 
    amount: 3200, 
    status: 'Processing',
    date: '2024-02-24',
    location: 'Bangalore, Karnataka'
  },
  { 
    id: '4', 
    customer: 'Sarah Wilson', 
    product: 'Mixed Vegetables', 
    amount: 4500, 
    status: 'Pending',
    date: '2024-02-24',
    location: 'Chennai, Tamil Nadu'
  },
  { 
    id: '5', 
    customer: 'Raj Patel', 
    product: 'Organic Onions', 
    amount: 1200, 
    status: 'Delivered',
    date: '2024-02-23',
    location: 'Ahmedabad, Gujarat'
  }
];

const productInventory = [
  { 
    id: '1', 
    name: 'Organic Tomatoes', 
    stock: 150, 
    price: 40, 
    unit: 'kg',
    category: 'Vegetables',
    lastUpdated: '2024-02-24'
  },
  { 
    id: '2', 
    name: 'Fresh Potatoes', 
    stock: 300, 
    price: 30, 
    unit: 'kg',
    category: 'Vegetables',
    lastUpdated: '2024-02-24'
  },
  { 
    id: '3', 
    name: 'Green Peas', 
    stock: 100, 
    price: 60, 
    unit: 'kg',
    category: 'Vegetables',
    lastUpdated: '2024-02-23'
  },
  { 
    id: '4', 
    name: 'Organic Onions', 
    stock: 250, 
    price: 35, 
    unit: 'kg',
    category: 'Vegetables',
    lastUpdated: '2024-02-24'
  },
  { 
    id: '5', 
    name: 'Red Carrots', 
    stock: 180, 
    price: 45, 
    unit: 'kg',
    category: 'Vegetables',
    lastUpdated: '2024-02-23'
  },
  { 
    id: '6', 
    name: 'Fresh Cauliflower', 
    stock: 120, 
    price: 40, 
    unit: 'kg',
    category: 'Vegetables',
    lastUpdated: '2024-02-24'
  }
];

export default function SellerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  React.useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'seller') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const stats = [
    { 
      title: 'Total Sales', 
      value: '₹45,000', 
      change: '+12%', 
      changeType: 'positive',
      subtext: 'Last 30 days'
    },
    { 
      title: 'Active Orders', 
      value: '23', 
      change: '+5', 
      changeType: 'positive',
      subtext: 'Pending delivery'
    },
    { 
      title: 'Products Listed', 
      value: '15', 
      change: '0', 
      changeType: 'neutral',
      subtext: 'In stock'
    },
    { 
      title: 'Customer Rating', 
      value: '4.8', 
      change: '+0.2', 
      changeType: 'positive',
      subtext: 'Based on 156 reviews'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-500">Welcome back, manage your products and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <span className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 
                  'text-gray-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-500">{stat.subtext}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Inventory Management</h2>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productInventory.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock} {product.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{product.price}/{product.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.lastUpdated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
