import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface Shipment {
  id: string;
  orderNumber: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Delivered' | 'Delayed' | 'Scheduled';
  vehicle: string;
  driver: string;
  departureTime: string;
  estimatedArrival: string;
  temperature: number;
  humidity: number;
  trackingUpdates: {
    time: string;
    location: string;
    status: string;
  }[];
}

const TransportationTracking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const shipments: Shipment[] = [
    {
      id: 'SHIP001',
      orderNumber: 'ORD-2024-001',
      origin: 'Punjab Warehouse',
      destination: 'Delhi Market',
      status: 'In Transit',
      vehicle: 'DL-1TC-5543',
      driver: 'Amarjeet Singh',
      departureTime: '2024-01-24 06:00',
      estimatedArrival: '2024-01-24 14:00',
      temperature: 4.5,
      humidity: 85,
      trackingUpdates: [
        {
          time: '06:00',
          location: 'Punjab Warehouse',
          status: 'Departed from warehouse'
        },
        {
          time: '08:30',
          location: 'Panipat',
          status: 'Rest stop check - Temperature optimal'
        }
      ]
    },
    {
      id: 'SHIP002',
      orderNumber: 'ORD-2024-002',
      origin: 'Haryana Farm',
      destination: 'Gurgaon Market',
      status: 'Scheduled',
      vehicle: 'HR-2TC-8822',
      driver: 'Rajinder Kumar',
      departureTime: '2024-01-25 05:00',
      estimatedArrival: '2024-01-25 10:00',
      temperature: 5.0,
      humidity: 82,
      trackingUpdates: []
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transportation Tracking</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + Schedule New Shipment
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search shipments..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="delayed">Delayed</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        {/* Transportation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Shipments</h3>
            <p className="text-2xl font-semibold">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">On-Time Rate</h3>
            <p className="text-2xl font-semibold text-green-600">96%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Avg Transit Time</h3>
            <p className="text-2xl font-semibold text-blue-600">4.2 hrs</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Temperature Alerts</h3>
            <p className="text-2xl font-semibold text-yellow-600">2</p>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Active Shipments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle/Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{shipment.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{shipment.orderNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{shipment.origin}</div>
                        <div className="text-sm text-gray-500">→ {shipment.destination}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{shipment.vehicle}</div>
                        <div className="text-sm text-gray-500">{shipment.driver}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>Departure: {shipment.departureTime}</div>
                        <div className="text-sm text-gray-500">ETA: {shipment.estimatedArrival}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center">
                          <span className="text-blue-500 mr-1">🌡️</span>
                          {shipment.temperature}°C
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-1">💧</span>
                          {shipment.humidity}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        shipment.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : shipment.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : shipment.status === 'Delayed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Track</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Update</button>
                      <button className="text-red-600 hover:text-red-900">Alert</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Updates</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {shipments[0].trackingUpdates.map((update, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-500">📍</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">{update.status}</div>
                    <div className="text-sm text-gray-500">
                      {update.time} - {update.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TransportationTracking;
