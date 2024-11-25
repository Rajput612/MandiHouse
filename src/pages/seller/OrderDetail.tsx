import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  address: string;
  paymentMethod: string;
  phoneNumber: string;
  email: string;
  notes?: string;
}

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch - replace with actual API call
    const fetchOrder = () => {
      // Simulating API call
      setTimeout(() => {
        const mockOrder: Order = {
          id: orderId || '',
          customerName: 'John Doe',
          items: [
            { name: 'Tomatoes', quantity: 2, price: 80 },
            { name: 'Potatoes', quantity: 3, price: 60 },
            { name: 'Onions', quantity: 1, price: 30 }
          ],
          total: 250,
          status: 'Processing',
          date: '2024-01-15',
          address: '123 Main St, City, State, 12345',
          paymentMethod: 'UPI',
          phoneNumber: '+91 98765 43210',
          email: 'john.doe@example.com',
          notes: 'Please deliver in the evening'
        };
        setOrder(mockOrder);
        setLoading(false);
      }, 500);
    };

    fetchOrder();
  }, [orderId]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Order not found</h2>
          <button
            onClick={() => navigate('/seller/orders')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-sm text-gray-600">Order ID: {order.id}</p>
        </div>
        <button
          onClick={() => navigate('/seller/orders')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back to Orders
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Order Date</span>
                <span className="text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Payment Method</span>
                <span className="text-gray-900">{order.paymentMethod}</span>
              </div>
              <div className="mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">₹{item.price}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">Total</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">₹{order.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-sm text-gray-900">{order.customerName}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-sm text-gray-900">{order.phoneNumber}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{order.email}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                <p className="mt-1 text-sm text-gray-900">{order.address}</p>
              </div>
              {order.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="mt-1 text-sm text-gray-900">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6">
            <button
              onClick={() => navigate(`/seller/orders`)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-3"
            >
              Update Status
            </button>
            <button
              onClick={() => window.print()}
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
