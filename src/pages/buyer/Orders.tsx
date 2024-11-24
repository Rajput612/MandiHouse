import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const orderHistory = [
  {
    id: 'ORD001',
    date: '2024-02-24',
    items: [
      { name: 'Organic Tomatoes', quantity: 5, price: 40, unit: 'kg' },
      { name: 'Fresh Potatoes', quantity: 3, price: 30, unit: 'kg' },
      { name: 'Green Chilies', quantity: 0.5, price: 80, unit: 'kg' }
    ],
    total: 350,
    status: 'Processing',
    seller: 'Farm Fresh Vegetables',
    deliveryDate: '2024-02-26',
    paymentMethod: 'UPI',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 'ORD002',
    date: '2024-02-23',
    items: [
      { name: 'Green Peas', quantity: 2, price: 60, unit: 'kg' },
      { name: 'Carrots', quantity: 1.5, price: 45, unit: 'kg' }
    ],
    total: 187,
    status: 'Delivered',
    seller: 'Organic Farms Co.',
    deliveryDate: '2024-02-24',
    paymentMethod: 'Cash on Delivery',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 'ORD003',
    date: '2024-02-22',
    items: [
      { name: 'Cauliflower', quantity: 2, price: 40, unit: 'kg' },
      { name: 'Onions', quantity: 5, price: 35, unit: 'kg' },
      { name: 'Garlic', quantity: 0.5, price: 160, unit: 'kg' }
    ],
    total: 335,
    status: 'Delivered',
    seller: 'Local Farmers Market',
    deliveryDate: '2024-02-23',
    paymentMethod: 'Card',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 'ORD004',
    date: '2024-02-24',
    items: [
      { name: 'Mixed Vegetables Pack', quantity: 1, price: 299, unit: 'pack' },
      { name: 'Organic Mushrooms', quantity: 0.25, price: 400, unit: 'kg' }
    ],
    total: 399,
    status: 'Pending',
    seller: 'Premium Organics',
    deliveryDate: '2024-02-25',
    paymentMethod: 'UPI',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 'ORD005',
    date: '2024-02-21',
    items: [
      { name: 'Red Bell Peppers', quantity: 1, price: 120, unit: 'kg' },
      { name: 'Yellow Bell Peppers', quantity: 1, price: 120, unit: 'kg' },
      { name: 'Broccoli', quantity: 0.5, price: 160, unit: 'kg' }
    ],
    total: 320,
    status: 'Delivered',
    seller: 'Premium Organics',
    deliveryDate: '2024-02-22',
    paymentMethod: 'UPI',
    location: 'Mumbai, Maharashtra'
  }
];

export default function BuyerOrders() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  React.useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'buyer') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const filteredOrders = orderHistory.filter(order => {
    if (activeTab === 'active') return order.status !== 'Delivered';
    if (activeTab === 'completed') return order.status === 'Delivered';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500">View and track your orders</p>
        </div>

        {/* Order Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'active'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Orders
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed Orders
            </button>
          </nav>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString()} • 
                      Expected delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-500">Seller: {order.seller}</p>
                    <p className="text-sm text-gray-500">Payment: {order.paymentMethod}</p>
                  </div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({item.quantity} {item.unit} × ₹{item.price})
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">₹{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Delivery to: {order.location}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 text-right mb-1">
                      Total Amount
                    </div>
                    <div className="text-lg font-medium text-gray-900">
                      ₹{order.total}
                    </div>
                  </div>
                </div>

                {order.status !== 'Delivered' && (
                  <div className="mt-4 flex justify-end space-x-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Track Order
                    </button>
                    <button className="text-sm text-red-600 hover:text-red-800">
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
