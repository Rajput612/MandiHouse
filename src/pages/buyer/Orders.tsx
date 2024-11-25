import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductManager from '../../utils/productManager';
import Pagination from '../../components/Pagination';

const ITEMS_PER_PAGE = 10;

export default function BuyerOrders() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);

  // Get paginated orders
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const allOrders = ProductManager.getOrders();
      
      // Filter orders based on active tab
      const filteredOrders = allOrders.filter(order => {
        if (activeTab === 'active') return order.status !== 'Delivered' && order.status !== 'Cancelled';
        if (activeTab === 'completed') return order.status === 'Delivered';
        return true;
      });

      setTotalOrders(filteredOrders.length);

      // Calculate pagination
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

      setOrders(paginatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, activeTab]);

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'buyer') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Reset to first page when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const success = ProductManager.cancelOrder(orderId);
      if (success) {
        fetchOrders();
      } else {
        alert('Could not cancel the order. It may have already been delivered.');
      }
    }
  };

  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {/* Status Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'all'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'active'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active Orders
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed Orders
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          {/* Orders List */}
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
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
                    {order.items.map((item: any, index: number) => (
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
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Orders Message */}
          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
