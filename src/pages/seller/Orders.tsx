import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  address: string;
  paymentMethod: string;
}

interface FilterState {
  column: string;
  value: string;
}

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState<FilterState>({ column: '', value: '' });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Order['status']>('Pending');

  // Fetch orders (mock data for now)
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'ORD001',
        customerName: 'John Doe',
        items: [{ name: 'Tomatoes', quantity: 2 }, { name: 'Potatoes', quantity: 3 }],
        total: 250,
        status: 'Processing',
        date: '2024-01-15',
        address: '123 Main St, City',
        paymentMethod: 'UPI'
      },
      {
        id: 'ORD002',
        customerName: 'Jane Smith',
        items: [{ name: 'Onions', quantity: 5 }, { name: 'Carrots', quantity: 2 }],
        total: 180,
        status: 'Pending',
        date: '2024-01-16',
        address: '456 Park Ave, Town',
        paymentMethod: 'Cash'
      },
      {
        id: 'ORD003',
        customerName: 'Mike Johnson',
        items: [{ name: 'Apples', quantity: 3 }, { name: 'Bananas', quantity: 6 }],
        total: 320,
        status: 'Shipped',
        date: '2024-01-14',
        address: '789 Grove St, Village',
        paymentMethod: 'Card'
      }
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  const handleSort = (key: keyof Order) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Order) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <i className="fas fa-sort text-gray-400 ml-1"></i>;
    }
    return sortConfig.direction === 'asc' 
      ? <i className="fas fa-sort-up text-green-500 ml-1"></i>
      : <i className="fas fa-sort-down text-green-500 ml-1"></i>;
  };

  const handleFilter = (column: string, value: string) => {
    setOrderFilter({ column, value });
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...orders];

    // Apply filters
    if (orderFilter.column && orderFilter.value) {
      const query = orderFilter.value.toLowerCase();
      result = result.filter(order => {
        switch (orderFilter.column) {
          case 'id':
            return order.id.toLowerCase().includes(query);
          case 'customer':
            return order.customerName.toLowerCase().includes(query);
          case 'status':
            return order.status.toLowerCase().includes(query);
          case 'date':
            return order.date.includes(query);
          case 'total':
            return order.total.toString().includes(query);
          default:
            return true;
        }
      });
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredOrders(result);
  }, [orders, orderFilter, sortConfig]);

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

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = () => {
    if (!selectedOrder) return;

    // Update the order status
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setIsStatusModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {/* Add export functionality */}}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <i className="fas fa-download mr-2"></i>
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('id')}
                    >
                      <span>Order ID</span>
                      {getSortIcon('id')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter ID..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleFilter('id', e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('customerName')}
                    >
                      <span>Customer</span>
                      {getSortIcon('customerName')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter customer..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleFilter('customer', e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('total')}
                    >
                      <span>Total</span>
                      {getSortIcon('total')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter total..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleFilter('total', e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('status')}
                    >
                      <span>Status</span>
                      {getSortIcon('status')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter status..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleFilter('status', e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('date')}
                    >
                      <span>Date</span>
                      {getSortIcon('date')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter date..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleFilter('date', e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{order.total}</div>
                    <div className="text-xs text-gray-500">{order.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => navigate(`/seller/orders/${order.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(order)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Order Status</h3>
              <button 
                onClick={() => setIsStatusModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Order ID: {selectedOrder?.id}</p>
              <p className="text-sm text-gray-600 mb-4">Customer: {selectedOrder?.customerName}</p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
