import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ProductManager from '../../utils/productManager';

interface InsightMetrics {
  highDemandProducts: {
    productName: string;
    totalSales: number;
    percentageGrowth: number;
  }[];
  salesByTimeframe: {
    date: string;
    sales: number;
    revenue: number;
  }[];
  categoryPerformance: {
    category: string;
    sales: number;
    revenue: number;
  }[];
  productPerformance: {
    productName: string;
    sales: number;
    revenue: number;
    stockLevel: number;
  }[];
}

interface ProductData {
  productName: string;
  category: string;
  subcategory: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const TIME_RANGES = ['Day', 'Week', 'Month', 'Year'] as const;
type TimeRange = typeof TIME_RANGES[number];

const CATEGORIES_WITH_SUBCATEGORIES = {
  Vegetables: {
    'Leafy Greens': ['Spinach', 'Lettuce', 'Cabbage'],
    'Root Vegetables': ['Potatoes', 'Carrots', 'Onions'],
    'Gourds': ['Cucumber', 'Pumpkin', 'Bottle Gourd'],
    'Exotic Vegetables': ['Broccoli', 'Zucchini', 'Bell Peppers'],
    'Seasonal Vegetables': ['Tomatoes', 'Green Peas', 'Cauliflower']
  },
  Fruits: {
    'Citrus': ['Oranges', 'Lemons', 'Sweet Lime'],
    'Tropical': ['Bananas', 'Mangoes', 'Pineapples'],
    'Berries': ['Strawberries', 'Blueberries', 'Raspberries'],
    'Stone Fruits': ['Peaches', 'Plums', 'Apricots'],
    'Exotic Fruits': ['Dragon Fruit', 'Kiwi', 'Avocado']
  },
  Grains: {
    'Rice': ['Basmati', 'Brown Rice', 'Jasmine Rice'],
    'Wheat': ['Whole Wheat', 'Refined Wheat', 'Semolina'],
    'Millets': ['Ragi', 'Jowar', 'Bajra'],
    'Pulses': ['Lentils', 'Chickpeas', 'Black Gram'],
    'Cereals': ['Oats', 'Corn', 'Quinoa']
  },
  Spices: {
    'Whole Spices': ['Black Pepper', 'Cardamom', 'Cinnamon'],
    'Ground Spices': ['Turmeric', 'Red Chili', 'Coriander'],
    'Masala Blends': ['Garam Masala', 'Curry Powder', 'Chaat Masala'],
    'Herbs': ['Mint', 'Basil', 'Rosemary'],
    'Exotic Spices': ['Saffron', 'Star Anise', 'Bay Leaves']
  },
  Dairy: {
    'Milk': ['Full Cream', 'Toned', 'Double Toned'],
    'Curd': ['Plain Curd', 'Greek Yogurt', 'Flavored Yogurt'],
    'Cheese': ['Paneer', 'Mozzarella', 'Cheddar'],
    'Butter': ['Salted', 'Unsalted', 'White Butter'],
    'Cream': ['Fresh Cream', 'Whipping Cream', 'Low Fat Cream']
  }
};

export default function Insights() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('Week');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState({
    productName: '',
    sales: '',
    revenue: '',
    stockLevel: ''
  });
  const [sortConfig, setSortConfig] = useState<{
    key: 'productName' | 'sales' | 'revenue' | 'stockLevel';
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: 'productName' | 'sales' | 'revenue' | 'stockLevel') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: 'productName' | 'sales' | 'revenue' | 'stockLevel') => {
    if (!sortConfig || sortConfig.key !== key) {
      return <i className="fas fa-sort text-gray-400 ml-1"></i>;
    }
    return sortConfig.direction === 'asc' 
      ? <i className="fas fa-sort-up text-green-500 ml-1"></i>
      : <i className="fas fa-sort-down text-green-500 ml-1"></i>;
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const [metrics, setMetrics] = useState<InsightMetrics>({
    highDemandProducts: [],
    salesByTimeframe: [],
    categoryPerformance: [],
    productPerformance: []
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filteredItems = metrics.productPerformance.filter(product => {
      return (
        product.productName.toLowerCase().includes(filters.productName.toLowerCase()) &&
        product.sales.toString().includes(filters.sales) &&
        product.revenue.toString().includes(filters.revenue) &&
        product.stockLevel.toString().includes(filters.stockLevel)
      );
    });

    if (sortConfig) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredItems;
  }, [metrics.productPerformance, filters, sortConfig]);

  useEffect(() => {
    const fetchInsightData = () => {
      const timeData = generateTimeData(timeRange);
      
      // Generate full product list with categories and subcategories
      const allProducts: ProductData[] = Object.entries(CATEGORIES_WITH_SUBCATEGORIES).flatMap(
        ([category, subcategories]) =>
          Object.entries(subcategories).flatMap(([subcategory, products]) =>
            products.map(product => ({
              productName: product,
              category,
              subcategory
            }))
          )
      );

      // Apply filters
      const filteredProducts = allProducts.filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) return false;
        if (selectedProduct !== 'all' && p.productName !== selectedProduct) return false;
        return true;
      });

      setMetrics({
        highDemandProducts: filteredProducts.map(p => ({
          productName: p.productName,
          totalSales: Math.floor(Math.random() * 500) + 300,
          percentageGrowth: Math.floor(Math.random() * 30) + 5
        })),
        salesByTimeframe: timeData,
        categoryPerformance: Object.keys(CATEGORIES_WITH_SUBCATEGORIES)
          .map(category => ({
            category,
            sales: Math.floor(Math.random() * 1000) + 500,
            revenue: (Math.floor(Math.random() * 1000) + 500) * 100
          }))
          .filter(c => selectedCategory === 'all' || c.category === selectedCategory),
        productPerformance: filteredProducts.map(p => ({
          productName: p.productName,
          sales: Math.floor(Math.random() * 200) + 300,
          revenue: (Math.floor(Math.random() * 200) + 300) * 100,
          stockLevel: Math.floor(Math.random() * 150) + 50
        }))
      });
    };

    fetchInsightData();
  }, [timeRange, selectedCategory, selectedSubcategory, selectedProduct]);

  // Generate sample data based on time range
  const generateTimeData = (range: TimeRange) => {
    switch (range) {
      case 'Day':
        return Array.from({ length: 24 }, (_, i) => ({
          date: `${i}:00`,
          sales: Math.floor(Math.random() * 50) + 10,
          revenue: (Math.floor(Math.random() * 50) + 10) * 100
        }));
      case 'Week':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
          date: day,
          sales: Math.floor(Math.random() * 300) + 100,
          revenue: (Math.floor(Math.random() * 300) + 100) * 100
        }));
      case 'Month':
        return Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          sales: Math.floor(Math.random() * 500) + 200,
          revenue: (Math.floor(Math.random() * 500) + 200) * 100
        }));
      case 'Year':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
          date: month,
          sales: Math.floor(Math.random() * 1000) + 500,
          revenue: (Math.floor(Math.random() * 1000) + 500) * 100
        }));
      default:
        return [];
    }
  };

  // Get available categories
  const categories = ['all', ...Object.keys(CATEGORIES_WITH_SUBCATEGORIES)];

  // Get available subcategories based on selected category
  const subcategories = useMemo(() => {
    if (selectedCategory === 'all') return ['all'];
    return ['all', ...Object.keys(CATEGORIES_WITH_SUBCATEGORIES[selectedCategory as keyof typeof CATEGORIES_WITH_SUBCATEGORIES] || {})];
  }, [selectedCategory]);

  // Get available products based on selected category and subcategory
  const products = useMemo(() => {
    if (selectedCategory === 'all') return ['all'];
    if (selectedSubcategory === 'all') {
      return ['all', ...Object.values(CATEGORIES_WITH_SUBCATEGORIES[selectedCategory as keyof typeof CATEGORIES_WITH_SUBCATEGORIES])
        .flatMap(subcategory => Object.values(subcategory))
        .flat()];
    }
    return ['all', ...(CATEGORIES_WITH_SUBCATEGORIES[selectedCategory as keyof typeof CATEGORIES_WITH_SUBCATEGORIES]?.[selectedSubcategory] || [])];
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">Seller Insights</h1>
            <button
              onClick={() => navigate('/seller/advanced-insights')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Advanced Analytics
            </button>
          </div>
          <div className="flex space-x-2">
            {TIME_RANGES.map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md ${
                  timeRange === range
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('all');
              setSelectedProduct('all');
            }}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={selectedSubcategory}
            onChange={(e) => {
              setSelectedSubcategory(e.target.value);
              setSelectedProduct('all');
            }}
            className="px-4 py-2 rounded-md border border-gray-300"
            disabled={selectedCategory === 'all'}
          >
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>
                {subcategory === 'all' ? 'All Subcategories' : subcategory}
              </option>
            ))}
          </select>

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300"
            disabled={selectedCategory === 'all'}
          >
            {products.map(product => (
              <option key={product} value={product}>
                {product === 'all' ? 'All Products' : product}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* High Demand Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">High Demand Products</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.highDemandProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSales" fill="#0088FE" name="Total Sales" />
                <Bar dataKey="percentageGrowth" fill="#00C49F" name="Growth %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Sales & Revenue Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.salesByTimeframe}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#0088FE"
                  name="Sales"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00C49F"
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Category Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.categoryPerformance}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {metrics.categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance Table */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[500px]">
          <h2 className="text-xl font-semibold mb-4">Product Performance</h2>
          <div className="overflow-y-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {/* Column Headers */}
                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <div 
                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center"
                        onClick={() => handleSort('productName')}
                      >
                        Product {getSortIcon('productName')}
                      </div>
                      <input
                        type="text"
                        placeholder="Filter products..."
                        value={filters.productName}
                        onChange={(e) => handleFilterChange('productName', e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <div 
                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center"
                        onClick={() => handleSort('sales')}
                      >
                        Sales {getSortIcon('sales')}
                      </div>
                      <input
                        type="text"
                        placeholder="Filter sales..."
                        value={filters.sales}
                        onChange={(e) => handleFilterChange('sales', e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <div 
                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center"
                        onClick={() => handleSort('revenue')}
                      >
                        Revenue {getSortIcon('revenue')}
                      </div>
                      <input
                        type="text"
                        placeholder="Filter revenue..."
                        value={filters.revenue}
                        onChange={(e) => handleFilterChange('revenue', e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <div 
                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center"
                        onClick={() => handleSort('stockLevel')}
                      >
                        Stock Level {getSortIcon('stockLevel')}
                      </div>
                      <input
                        type="text"
                        placeholder="Filter stock..."
                        value={filters.stockLevel}
                        onChange={(e) => handleFilterChange('stockLevel', e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stockLevel > 100
                            ? 'bg-green-100 text-green-800'
                            : product.stockLevel > 50
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stockLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
