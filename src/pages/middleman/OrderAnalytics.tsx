import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface Order {
  id: string;
  date: string;
  product: string;
  quantity: number;
  amount: number;
  supplier: string;
  buyer: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
}

const OrderAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders: Order[] = [
    {
      id: 'ORD001',
      date: '2024-01-25',
      product: 'Tomatoes',
      quantity: 500,
      amount: 25000,
      supplier: 'Krishna Farms',
      buyer: 'Metro Mart',
      status: 'Delivered',
      paymentStatus: 'Completed'
    },
    {
      id: 'ORD002',
      date: '2024-01-25',
      product: 'Potatoes',
      quantity: 1000,
      amount: 18000,
      supplier: 'Organic Valley',
      buyer: 'Fresh Market',
      status: 'In Transit',
      paymentStatus: 'Pending'
    }
  ];

  const orderStats = {
    totalOrders: 45,
    pendingOrders: 12,
    completedOrders: 30,
    cancelledOrders: 3,
    totalRevenue: 250000,
    averageOrderValue: 5555
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Order Analytics</h1>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border rounded-lg"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Orders</span>
                <span className="font-semibold">{orderStats.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="text-yellow-500">{orderStats.pendingOrders}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="text-green-500">{orderStats.completedOrders}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancelled</span>
                <span className="text-red-500">{orderStats.cancelledOrders}</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Revenue</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Revenue</span>
                <span className="font-semibold">₹{orderStats.totalRevenue}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Order Value</span>
                <span>₹{orderStats.averageOrderValue}</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                Create New Order
              </button>
              <button className="w-full px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.quantity} kg</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.supplier}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.buyer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
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

export default OrderAnalytics;
