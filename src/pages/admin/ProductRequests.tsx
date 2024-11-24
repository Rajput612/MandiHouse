import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductRequestManager from '../../utils/productRequestManager';
import SessionManager from '../../utils/sessionManager';

export default function ProductRequests() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const requests = ProductRequestManager.getRequestsByStatus(activeTab);

  const handleApprove = async (request: any) => {
    if (!user) return;

    // Add product to catalog
    const newProduct = {
      id: `prod_${Date.now()}`,
      name: request.name,
      stock: 0,
      price: 0,
      unit: request.unit,
      category: request.category,
      lastUpdated: new Date().toISOString()
    };

    SessionManager.addProduct(newProduct);

    // Update request status
    ProductRequestManager.updateRequestStatus(
      request.id,
      'approved',
      user.id,
      reviewNotes
    );

    setReviewNotes('');
    setSelectedRequest(null);
  };

  const handleReject = (request: any) => {
    if (!user) return;

    ProductRequestManager.updateRequestStatus(
      request.id,
      'rejected',
      user.id,
      reviewNotes
    );

    setReviewNotes('');
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Product Requests</h1>

      {/* Status Tabs */}
      <div className="flex space-x-4 mb-6">
        {(['pending', 'approved', 'rejected'] as const).map(status => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-md ${
              activeTab === status
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map(request => (
          <div
            key={request.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{request.name}</h3>
                <p className="text-gray-600">Category: {request.category}</p>
                <p className="text-gray-600">Unit: {request.unit}</p>
                {request.description && (
                  <p className="text-gray-600 mt-2">{request.description}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Requested on: {new Date(request.requestDate).toLocaleDateString()}
                </p>
              </div>
              {activeTab === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Review
                  </button>
                </div>
              )}
            </div>

            {request.reviewNotes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-700">Review Notes:</p>
                <p className="text-gray-600">{request.reviewNotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Review Product Request</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Review Notes
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Add any notes about your decision..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedRequest)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
              <button
                onClick={() => handleApprove(selectedRequest)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
