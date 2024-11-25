import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

interface PriceData {
  id: number;
  product: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  weeklyHigh: number;
  weeklyLow: number;
  priceChange: number;
  demand: 'High' | 'Medium' | 'Low';
  marketTrend: 'Up' | 'Down' | 'Stable';
  lastUpdated: string;
}

const PriceAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const priceData: PriceData[] = [
    {
      id: 1,
      product: 'Tomatoes',
      category: 'Vegetables',
      currentPrice: 25,
      previousPrice: 30,
      weeklyHigh: 35,
      weeklyLow: 22,
      priceChange: -16.67,
      demand: 'High',
      marketTrend: 'Down',
      lastUpdated: '2024-01-25 09:00'
    },
    {
      id: 2,
      product: 'Onions',
      category: 'Vegetables',
      currentPrice: 18,
      previousPrice: 15,
      weeklyHigh: 20,
      weeklyLow: 15,
      priceChange: 20,
      demand: 'Medium',
      marketTrend: 'Up',
      lastUpdated: '2024-01-25 09:00'
    },
    // Add more items
  ];

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];
  const timeRanges = ['today', 'week', 'month', 'year'];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Price Analytics</h1>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border rounded-lg"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range} value={range}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Biggest Price Increase</h3>
            <div className="flex justify-between items-center">
              <span>Onions</span>
              <span className="text-green-500">+20%</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Biggest Price Decrease</h3>
            <div className="flex justify-between items-center">
              <span>Tomatoes</span>
              <span className="text-red-500">-16.67%</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Market Volatility</h3>
            <div className="flex justify-between items-center">
              <span>Medium</span>
              <span className="text-yellow-500">⚠️</span>
            </div>
          </div>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly High/Low</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {priceData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.currentPrice}/kg</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.previousPrice}/kg</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{item.weeklyHigh} / ₹{item.weeklyLow}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`${
                      item.priceChange > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {item.priceChange > 0 ? '↑' : '↓'} {Math.abs(item.priceChange)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.demand === 'High' ? 'bg-green-100 text-green-800' :
                      item.demand === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.demand}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`${
                      item.marketTrend === 'Up' ? 'text-green-500' :
                      item.marketTrend === 'Down' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>
                      {item.marketTrend === 'Up' ? '📈' :
                       item.marketTrend === 'Down' ? '📉' : '➡️'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Price Predictions</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Tomatoes (Next Week)</span>
                <span className="text-green-500">Expected ↑ 10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Onions (Next Week)</span>
                <span className="text-red-500">Expected ↓ 5%</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Market Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-center text-green-600">
                <span className="mr-2">🎯</span>
                <span>Stock up on tomatoes - price expected to rise</span>
              </div>
              <div className="flex items-center text-red-600">
                <span className="mr-2">⚠️</span>
                <span>Consider reducing onion inventory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PriceAnalytics;
