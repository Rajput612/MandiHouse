import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart,
  Scatter
} from 'recharts';

interface AdvancedMetrics {
  profitMargins: {
    product: string;
    margin: number;
    revenue: number;
    cost: number;
  }[];
  customerSegmentation: {
    segment: string;
    value: number;
    growth: number;
  }[];
  inventoryTurnover: {
    product: string;
    turnoverRate: number;
    restockFrequency: number;
    avgDaysToSell: number;
  }[];
  seasonalTrends: {
    month: string;
    sales: number;
    temperature: number;
    events: string[];
  }[];
  competitorAnalysis: {
    product: string;
    ourPrice: number;
    marketAvg: number;
    marketHigh: number;
    marketLow: number;
  }[];
  forecastedDemand: {
    date: string;
    predicted: number;
    actual: number;
    confidence: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function AdvancedInsights() {
  const [metrics, setMetrics] = useState<AdvancedMetrics>({
    profitMargins: [],
    customerSegmentation: [],
    inventoryTurnover: [],
    seasonalTrends: [],
    competitorAnalysis: [],
    forecastedDemand: []
  });

  useEffect(() => {
    // Simulated data - replace with actual API calls
    const fetchAdvancedMetrics = () => {
      setMetrics({
        profitMargins: [
          { product: 'Organic Tomatoes', margin: 45, revenue: 25000, cost: 13750 },
          { product: 'Premium Rice', margin: 35, revenue: 45000, cost: 29250 },
          { product: 'Fresh Milk', margin: 25, revenue: 15000, cost: 11250 },
          { product: 'Exotic Fruits', margin: 55, revenue: 35000, cost: 15750 },
          { product: 'Spice Blend', margin: 65, revenue: 20000, cost: 7000 }
        ],
        customerSegmentation: [
          { segment: 'Premium Buyers', value: 40, growth: 15 },
          { segment: 'Regular Customers', value: 35, growth: 8 },
          { segment: 'Occasional Buyers', value: 15, growth: 5 },
          { segment: 'Bulk Purchasers', value: 10, growth: 12 }
        ],
        inventoryTurnover: [
          { product: 'Fresh Vegetables', turnoverRate: 8.5, restockFrequency: 3, avgDaysToSell: 4 },
          { product: 'Dairy Products', turnoverRate: 7.2, restockFrequency: 4, avgDaysToSell: 5 },
          { product: 'Grains', turnoverRate: 4.1, restockFrequency: 14, avgDaysToSell: 12 },
          { product: 'Spices', turnoverRate: 2.8, restockFrequency: 30, avgDaysToSell: 25 }
        ],
        seasonalTrends: [
          { month: 'Jan', sales: 1200, temperature: 15, events: ['New Year'] },
          { month: 'Feb', sales: 1100, temperature: 18, events: ['Valentine\'s'] },
          { month: 'Mar', sales: 1300, temperature: 22, events: ['Spring'] },
          { month: 'Apr', sales: 1400, temperature: 25, events: ['Easter'] },
          { month: 'May', sales: 1600, temperature: 28, events: ['May Day'] },
          { month: 'Jun', sales: 1800, temperature: 32, events: ['Summer'] }
        ],
        competitorAnalysis: [
          { product: 'Premium Rice', ourPrice: 85, marketAvg: 90, marketHigh: 100, marketLow: 75 },
          { product: 'Organic Vegetables', ourPrice: 45, marketAvg: 50, marketHigh: 60, marketLow: 40 },
          { product: 'Fresh Milk', ourPrice: 35, marketAvg: 38, marketHigh: 45, marketLow: 32 },
          { product: 'Exotic Spices', ourPrice: 120, marketAvg: 125, marketHigh: 140, marketLow: 110 }
        ],
        forecastedDemand: [
          { date: 'Week 1', predicted: 1200, actual: 1180, confidence: 90 },
          { date: 'Week 2', predicted: 1300, actual: 1250, confidence: 85 },
          { date: 'Week 3', predicted: 1400, actual: 1420, confidence: 88 },
          { date: 'Week 4', predicted: 1500, actual: 1480, confidence: 92 }
        ]
      });
    };

    fetchAdvancedMetrics();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Advanced Analytics</h1>
        <p className="text-gray-600">Detailed insights and predictive analytics for your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profit Margins Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Profit Margins by Product</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={metrics.profitMargins}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="margin" fill="#8884d8" name="Margin %" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue" />
                <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ff7300" name="Cost" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segmentation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Segmentation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.customerSegmentation}
                  dataKey="value"
                  nameKey="segment"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {metrics.customerSegmentation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Turnover */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Turnover Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.inventoryTurnover}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="turnoverRate" fill="#8884d8" name="Turnover Rate" />
                <Bar dataKey="avgDaysToSell" fill="#82ca9d" name="Avg Days to Sell" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Seasonal Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.seasonalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="sales" fill="#8884d8" stroke="#8884d8" name="Sales" />
                <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Market Price Comparison</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={metrics.competitorAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="marketAvg" fill="#8884d8" name="Market Average" />
                <Line type="monotone" dataKey="ourPrice" stroke="#ff7300" name="Our Price" />
                <Scatter dataKey="marketHigh" fill="red" name="Market High" />
                <Scatter dataKey="marketLow" fill="green" name="Market Low" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand Forecasting */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Demand Forecast</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={metrics.forecastedDemand}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="predicted" stroke="#8884d8" name="Predicted" />
                <Line yAxisId="left" type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" />
                <Bar yAxisId="right" dataKey="confidence" fill="#ffc658" name="Confidence %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
