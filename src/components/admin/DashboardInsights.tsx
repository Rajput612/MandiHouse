import React, { useState, useEffect } from 'react';

interface DashboardMetrics {
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    activeSellers: number;
    averageOrderValue: number;
    orderCompletionRate: number;
    topPerformingCategories: Array<{
        category: string;
        revenue: number;
        growth: number;
    }>;
    sellerMetrics: {
        totalActive: number;
        newThisMonth: number;
        averageRating: number;
        topPerformers: Array<{
            name: string;
            revenue: number;
            rating: number;
            successRate: number;
        }>;
    };
    inventoryAlerts: Array<{
        productName: string;
        currentStock: number;
        minThreshold: number;
        category: string;
    }>;
    qualityMetrics: {
        averageQualityScore: number;
        rejectionRate: number;
        topQualityIssues: Array<{
            issue: string;
            count: number;
            trend: 'up' | 'down' | 'stable';
        }>;
    };
}

// Mock categories and subcategories
const categories = [
    {
        id: 1,
        name: 'Vegetables',
        subcategories: [
            { id: 1, name: 'Leafy Greens' },
            { id: 2, name: 'Root Vegetables' },
        ]
    },
    {
        id: 2,
        name: 'Fruits',
        subcategories: [
            { id: 3, name: 'Citrus' },
            { id: 4, name: 'Berries' },
        ]
    },
    {
        id: 3,
        name: 'Dairy',
        subcategories: [
            { id: 5, name: 'Milk Products' },
            { id: 6, name: 'Cheese' },
        ]
    }
];

const products = [
    { id: 1, name: 'Spinach', subcategoryId: 1 },
    { id: 2, name: 'Carrots', subcategoryId: 2 },
    { id: 3, name: 'Oranges', subcategoryId: 3 },
    { id: 4, name: 'Strawberries', subcategoryId: 4 },
    { id: 5, name: 'Milk', subcategoryId: 5 },
    { id: 6, name: 'Cheddar', subcategoryId: 6 },
];

const mockData: DashboardMetrics = {
    totalOrders: 1250,
    pendingOrders: 45,
    totalRevenue: 2850000,
    activeSellers: 128,
    averageOrderValue: 2280,
    orderCompletionRate: 94.5,
    topPerformingCategories: [
        { category: 'Vegetables', revenue: 980000, growth: 15.5 },
        { category: 'Fruits', revenue: 750000, growth: 12.8 },
        { category: 'Dairy', revenue: 620000, growth: 8.2 },
    ],
    sellerMetrics: {
        totalActive: 128,
        newThisMonth: 12,
        averageRating: 4.3,
        topPerformers: [
            { name: 'Krishna Farms', revenue: 280000, rating: 4.8, successRate: 98.5 },
            { name: 'Organic Valley', revenue: 245000, rating: 4.7, successRate: 97.2 },
            { name: 'Fresh Fields', revenue: 210000, rating: 4.6, successRate: 96.8 },
        ],
    },
    inventoryAlerts: [
        { productName: 'Tomatoes', currentStock: 250, minThreshold: 300, category: 'Vegetables' },
        { productName: 'Apples', currentStock: 180, minThreshold: 200, category: 'Fruits' },
        { productName: 'Milk', currentStock: 150, minThreshold: 200, category: 'Dairy' },
    ],
    qualityMetrics: {
        averageQualityScore: 4.2,
        rejectionRate: 3.5,
        topQualityIssues: [
            { issue: 'Product Freshness', count: 25, trend: 'down' },
            { issue: 'Packaging Damage', count: 18, trend: 'stable' },
            { issue: 'Size Mismatch', count: 12, trend: 'up' },
        ],
    },
};

interface FilterState {
    category: string;
    subcategory: string;
    product: string;
    timeRange: 'day' | 'week' | 'month' | 'year' | 'all';
}

const DashboardInsights: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        category: '',
        subcategory: '',
        product: '',
        timeRange: 'all'
    });

    const [filteredData, setFilteredData] = useState<DashboardMetrics>(mockData);
    const [availableSubcategories, setAvailableSubcategories] = useState<Array<{id: number, name: string}>>([]);
    const [availableProducts, setAvailableProducts] = useState<Array<{id: number, name: string}>>([]);

    // Update available subcategories when category changes
    useEffect(() => {
        if (filters.category) {
            const category = categories.find(c => c.name === filters.category);
            setAvailableSubcategories(category?.subcategories || []);
            setFilters(prev => ({ ...prev, subcategory: '', product: '' }));
        } else {
            setAvailableSubcategories([]);
        }
    }, [filters.category]);

    // Update available products when subcategory changes
    useEffect(() => {
        if (filters.subcategory) {
            const subcategory = availableSubcategories.find(s => s.name === filters.subcategory);
            const filteredProducts = products.filter(p => p.subcategoryId === subcategory?.id);
            setAvailableProducts(filteredProducts);
            setFilters(prev => ({ ...prev, product: '' }));
        } else {
            setAvailableProducts([]);
        }
    }, [filters.subcategory]);

    // Apply filters and update data
    useEffect(() => {
        // In a real application, this would make an API call with the filters
        // For now, we'll just simulate filtered data
        let filtered = { ...mockData };
        
        // Apply time range filter
        if (filters.timeRange !== 'all') {
            // Simulate time-filtered data
            const reductionFactor = 
                filters.timeRange === 'day' ? 0.1 :
                filters.timeRange === 'week' ? 0.3 :
                filters.timeRange === 'month' ? 0.6 :
                0.8; // year

            filtered = {
                ...filtered,
                totalOrders: Math.floor(filtered.totalOrders * reductionFactor),
                totalRevenue: Math.floor(filtered.totalRevenue * reductionFactor),
                pendingOrders: Math.floor(filtered.pendingOrders * reductionFactor),
            };
        }

        // Apply category/subcategory/product filters
        if (filters.category || filters.subcategory || filters.product) {
            // Simulate category-filtered data
            filtered.topPerformingCategories = filtered.topPerformingCategories
                .filter(cat => !filters.category || cat.category === filters.category);
            
            // Simulate other filtered metrics
            if (filters.product) {
                const reductionFactor = 0.2; // Simulate single product data
                filtered = {
                    ...filtered,
                    totalOrders: Math.floor(filtered.totalOrders * reductionFactor),
                    totalRevenue: Math.floor(filtered.totalRevenue * reductionFactor),
                    pendingOrders: Math.floor(filtered.pendingOrders * reductionFactor),
                };
            }
        }

        setFilteredData(filtered);
    }, [filters]);

    return (
        <div className="space-y-6">
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <select
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={filters.subcategory}
                        onChange={(e) => setFilters(prev => ({ ...prev, subcategory: e.target.value }))}
                        disabled={!filters.category}
                    >
                        <option value="">All Subcategories</option>
                        {availableSubcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.name}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={filters.product}
                        onChange={(e) => setFilters(prev => ({ ...prev, product: e.target.value }))}
                        disabled={!filters.subcategory}
                    >
                        <option value="">All Products</option>
                        {availableProducts.map(product => (
                            <option key={product.id} value={product.name}>
                                {product.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={filters.timeRange}
                        onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value as FilterState['timeRange'] }))}
                    >
                        <option value="all">All Time</option>
                        <option value="day">Last 24 Hours</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                    </select>

                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => setFilters({
                            category: '',
                            subcategory: '',
                            product: '',
                            timeRange: 'all'
                        })}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Active Filters Display */}
            {(filters.category || filters.subcategory || filters.product || filters.timeRange !== 'all') && (
                <div className="flex flex-wrap gap-2 px-4">
                    {filters.category && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Category: {filters.category}
                        </span>
                    )}
                    {filters.subcategory && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Subcategory: {filters.subcategory}
                        </span>
                    )}
                    {filters.product && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Product: {filters.product}
                        </span>
                    )}
                    {filters.timeRange !== 'all' && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Time: Last {filters.timeRange}
                        </span>
                    )}
                </div>
            )}

            {/* Dashboard Content - using filteredData instead of mockData */}
            <div className="p-6 space-y-6">
                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <QuickStatCard
                        icon="📦"
                        title="Total Orders"
                        value={filteredData.totalOrders}
                        subtext={`${filteredData.pendingOrders} pending`}
                    />
                    <QuickStatCard
                        icon="💰"
                        title="Total Revenue"
                        value={`₹${(filteredData.totalRevenue / 100000).toFixed(1)}L`}
                        subtext={`Avg. ₹${filteredData.averageOrderValue}/order`}
                    />
                    <QuickStatCard
                        icon="👥"
                        title="Active Sellers"
                        value={filteredData.activeSellers}
                        subtext={`${filteredData.sellerMetrics.newThisMonth} new this month`}
                    />
                    <QuickStatCard
                        icon="📈"
                        title="Completion Rate"
                        value={`${filteredData.orderCompletionRate}%`}
                        subtext="Last 30 days"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Categories */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Top Performing Categories</h3>
                        <div className="space-y-4">
                            {filteredData.topPerformingCategories.map((category, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <span className="font-medium">{category.category}</span>
                                            <span className={`ml-2 text-sm ${
                                                category.growth > 10 ? 'text-green-500' : 'text-yellow-500'
                                            }`}>
                                                ↑{category.growth}%
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ₹{(category.revenue / 100000).toFixed(1)}L revenue
                                        </div>
                                    </div>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="h-full bg-green-500 rounded-full"
                                            style={{
                                                width: `${(category.revenue / filteredData.totalRevenue) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Sellers */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Top Performing Sellers</h3>
                        <div className="space-y-4">
                            {filteredData.sellerMetrics.topPerformers.map((seller, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <span className="font-medium">{seller.name}</span>
                                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                                                {seller.rating}★
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ₹{(seller.revenue / 100000).toFixed(1)}L • {seller.successRate}% success
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            seller.successRate >= 97 ? 'bg-green-100 text-green-800' :
                                            seller.successRate >= 95 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {seller.successRate}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quality Metrics */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Quality Metrics</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-semibold text-green-600">
                                    {filteredData.qualityMetrics.averageQualityScore}/5
                                </div>
                                <div className="text-sm text-gray-500">Average Quality</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-semibold text-red-600">
                                    {filteredData.qualityMetrics.rejectionRate}%
                                </div>
                                <div className="text-sm text-gray-500">Rejection Rate</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {filteredData.qualityMetrics.topQualityIssues.map((issue, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span>⚠️</span>
                                        <span>{issue.issue}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">{issue.count}</span>
                                        <span className={`text-xs ${
                                            issue.trend === 'up' ? 'text-red-500' :
                                            issue.trend === 'down' ? 'text-green-500' :
                                            'text-yellow-500'
                                        }`}>
                                            {issue.trend === 'up' ? '↑' :
                                             issue.trend === 'down' ? '↓' : '→'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Inventory Alerts */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Inventory Alerts</h3>
                        <div className="space-y-4">
                            {filteredData.inventoryAlerts.map((alert, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <span className="font-medium">{alert.productName}</span>
                                            <span className="ml-2 text-sm text-gray-500">
                                                {alert.category}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Current: {alert.currentStock}kg • Min: {alert.minThreshold}kg
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            alert.currentStock < alert.minThreshold * 0.5 ? 'bg-red-100 text-red-800' :
                                            alert.currentStock < alert.minThreshold * 0.8 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {Math.round((alert.currentStock / alert.minThreshold) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable List Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <TopCategories data={filteredData.topPerformingCategories} />
                <TopSellers data={filteredData.sellerMetrics.topPerformers} />
                <InventoryAlerts data={filteredData.inventoryAlerts} />
            </div>
        </div>
    );
};

// Scrollable List Components
const TopCategories: React.FC<{ data: DashboardMetrics['topPerformingCategories'] }> = ({ data }) => (
  <div className="bg-white p-4 rounded-lg shadow-md h-[300px] overflow-hidden">
    <h3 className="text-lg font-semibold mb-3">Top Performing Categories 📈</h3>
    <div className="overflow-y-auto h-[calc(100%-3rem)]">
      {data.map((category, index) => (
        <div key={category.category} className="mb-3 p-2 border-b last:border-b-0">
          <div className="flex justify-between items-center">
            <span className="font-medium">{index + 1}. {category.category}</span>
            <span className="text-green-600">₹{(category.revenue / 1000).toFixed(1)}K</span>
          </div>
          <div className="text-sm text-gray-600 flex justify-between">
            <span>Growth</span>
            <span className={`${category.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {category.growth > 0 ? '↑' : '↓'} {Math.abs(category.growth)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TopSellers: React.FC<{ data: DashboardMetrics['sellerMetrics']['topPerformers'] }> = ({ data }) => (
  <div className="bg-white p-4 rounded-lg shadow-md h-[300px] overflow-hidden">
    <h3 className="text-lg font-semibold mb-3">Top Performing Sellers 🌟</h3>
    <div className="overflow-y-auto h-[calc(100%-3rem)]">
      {data.map((seller, index) => (
        <div key={seller.name} className="mb-3 p-2 border-b last:border-b-0">
          <div className="flex justify-between items-center">
            <span className="font-medium">{index + 1}. {seller.name}</span>
            <span className="text-green-600">₹{(seller.revenue / 1000).toFixed(1)}K</span>
          </div>
          <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
            <div>Rating: ⭐ {seller.rating}</div>
            <div>Success: {seller.successRate}%</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InventoryAlerts: React.FC<{ data: DashboardMetrics['inventoryAlerts'] }> = ({ data }) => (
  <div className="bg-white p-4 rounded-lg shadow-md h-[300px] overflow-hidden">
    <h3 className="text-lg font-semibold mb-3">Inventory Alerts ⚠️</h3>
    <div className="overflow-y-auto h-[calc(100%-3rem)]">
      {data.map((item, index) => (
        <div key={item.productName} className="mb-3 p-2 border-b last:border-b-0">
          <div className="flex justify-between items-center">
            <span className="font-medium">{index + 1}. {item.productName}</span>
            <span className={`${
              item.currentStock <= item.minThreshold ? 'text-red-500' : 'text-yellow-500'
            }`}>
              {item.currentStock} units
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <span>Category: {item.category}</span>
            <span className="ml-2">Min: {item.minThreshold}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickStatCard: React.FC<{
    icon: string;
    title: string;
    value: string | number;
    subtext: string;
}> = ({ icon, title, value, subtext }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{icon}</span>
            <span className="text-sm text-gray-500">{title}</span>
        </div>
        <div className="text-2xl font-semibold mb-1">{value}</div>
        <div className="text-sm text-gray-500">{subtext}</div>
    </div>
);

export default DashboardInsights;
