import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import ProductManager from '../../utils/productManager';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
}

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: string;
  date: string;
}

interface FilterState {
  column: string;
  value: string;
}

interface NewProduct {
  name: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  subcategory: string;
  image: File | null;
}

const CATEGORIES_WITH_SUBCATEGORIES = {
  vegetables: [
    'Leafy Greens',
    'Root Vegetables',
    'Gourds',
    'Exotic Vegetables',
    'Seasonal Vegetables'
  ],
  fruits: [
    'Citrus',
    'Tropical',
    'Berries',
    'Stone Fruits',
    'Exotic Fruits'
  ],
  grains: [
    'Rice',
    'Wheat',
    'Millets',
    'Pulses',
    'Cereals'
  ],
  spices: [
    'Whole Spices',
    'Ground Spices',
    'Masala Blends',
    'Herbs',
    'Exotic Spices'
  ],
  dairy: [
    'Milk',
    'Curd',
    'Cheese',
    'Butter',
    'Paneer'
  ]
};

const initialNewProduct: NewProduct = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  category: '',
  subcategory: '',
  image: null
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [productFilter, setProductFilter] = useState<FilterState>({ column: '', value: '' });
  const [orderFilter, setOrderFilter] = useState<FilterState>({ column: '', value: '' });
  const [productSort, setProductSort] = useState<{
    column: keyof Product | '';
    direction: 'asc' | 'desc';
  }>({ column: '', direction: 'asc' });
  const [orderSort, setOrderSort] = useState<{
    column: keyof Order | '';
    direction: 'asc' | 'desc';
  }>({ column: '', direction: 'asc' });
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>(initialNewProduct);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0
  });
  const sellerId = "seller1"; // Hardcoded for now, should come from auth

  useEffect(() => {
    const sellerProducts = ProductManager.getProductsBySeller(sellerId);
    const sellerOrders = ProductManager.getOrdersBySeller(sellerId);
    
    setProducts(sellerProducts);
    setFilteredProducts(sellerProducts);
    setOrders(sellerOrders);
    setFilteredOrders(sellerOrders);
    
    // Calculate dashboard stats
    setStats({
      totalProducts: sellerProducts.length,
      totalOrders: sellerOrders.length,
      totalRevenue: sellerOrders.reduce((sum, order) => sum + order.total, 0),
      lowStockProducts: sellerProducts.filter(p => p.quantity < 10).length
    });
  }, []);

  // Filter products based on column and value
  useEffect(() => {
    if (!productFilter.column || !productFilter.value) {
      setFilteredProducts(products);
      return;
    }

    const query = productFilter.value.toLowerCase();
    const filtered = products.filter(product => {
      switch (productFilter.column) {
        case 'name':
          return product.name.toLowerCase().includes(query);
        case 'price':
          return product.price.toString().includes(query);
        case 'quantity':
          return product.quantity.toString().includes(query);
        case 'category':
          return product.category.toLowerCase().includes(query);
        case 'status':
          const status = product.quantity > 10 ? 'in stock' : 'low stock';
          return status.toLowerCase().includes(query);
        default:
          return true;
      }
    });
    setFilteredProducts(filtered);
  }, [productFilter, products]);

  // Filter orders based on column and value
  useEffect(() => {
    if (!orderFilter.column || !orderFilter.value) {
      setFilteredOrders(orders);
      return;
    }

    const query = orderFilter.value.toLowerCase();
    const filtered = orders.filter(order => {
      switch (orderFilter.column) {
        case 'id':
          return order.id.toLowerCase().includes(query);
        case 'customer':
          return order.customerName.toLowerCase().includes(query);
        case 'items':
          return order.items.some(item => 
            item.name.toLowerCase().includes(query) || 
            item.quantity.toString().includes(query)
          );
        case 'total':
          return order.total.toString().includes(query);
        case 'status':
          return order.status.toLowerCase().includes(query);
        case 'date':
          return order.date.toLowerCase().includes(query);
        default:
          return true;
      }
    });
    setFilteredOrders(filtered);
  }, [orderFilter, orders]);

  useEffect(() => {
    if (!productSort.column) {
      setFilteredProducts(products);
      return;
    }

    const sorted = products.sort((a, b) => {
      if (productSort.direction === 'asc') {
        return a[productSort.column] < b[productSort.column] ? -1 : 1;
      } else {
        return a[productSort.column] > b[productSort.column] ? -1 : 1;
      }
    });
    setFilteredProducts(sorted);
  }, [productSort, products]);

  useEffect(() => {
    if (!orderSort.column) {
      setFilteredOrders(orders);
      return;
    }

    const sorted = orders.sort((a, b) => {
      if (orderSort.direction === 'asc') {
        return a[orderSort.column] < b[orderSort.column] ? -1 : 1;
      } else {
        return a[orderSort.column] > b[orderSort.column] ? -1 : 1;
      }
    });
    setFilteredOrders(sorted);
  }, [orderSort, orders]);

  const handleColumnFilter = (column: string, value: string, type: 'product' | 'order') => {
    if (type === 'product') {
      setProductFilter({ column, value });
    } else {
      setOrderFilter({ column, value });
    }
  };

  const handleSort = (column: string, type: 'product' | 'order') => {
    if (type === 'product') {
      setProductSort(prev => ({
        column: column as keyof Product,
        direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      setOrderSort(prev => ({
        column: column as keyof Order,
        direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    }
  };

  const getSortIcon = (column: string, type: 'product' | 'order') => {
    const sort = type === 'product' ? productSort : orderSort;
    if (sort.column !== column) {
      return <i className="fas fa-sort text-gray-400 ml-1"></i>;
    }
    return sort.direction === 'asc' 
      ? <i className="fas fa-sort-up text-green-500 ml-1"></i>
      : <i className="fas fa-sort-down text-green-500 ml-1"></i>;
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to add the product
    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity),
      category: newProduct.category,
      subcategory: newProduct.subcategory,
      image: imagePreview // In a real app, you'd handle image upload separately
    };

    setProducts(prev => [...prev, product]);
    setIsAddProductModalOpen(false);
    setNewProduct(initialNewProduct);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProduct(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setNewProduct(prev => ({
      ...prev,
      category,
      subcategory: '' // Reset subcategory when category changes
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Low Stock Products</h3>
          <p className="text-2xl font-bold text-red-600">{stats.lowStockProducts}</p>
        </div>
      </div>
      
      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-2">Add New Product</div>
            <p className="text-gray-600">Add new products to your inventory</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/seller/insights')}
          className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-2">View Insights</div>
            <p className="text-gray-600">Analyze your sales and performance metrics</p>
          </div>
        </button>
      </div>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Product</h3>
              <button 
                onClick={() => setIsAddProductModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    min="0"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      value={newProduct.category}
                      onChange={handleCategoryChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                      required
                    >
                      <option value="">Select a category</option>
                      {Object.keys(CATEGORIES_WITH_SUBCATEGORIES).map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                    <select
                      name="subcategory"
                      value={newProduct.subcategory}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                      required
                      disabled={!newProduct.category}
                    >
                      <option value="">Select a subcategory</option>
                      {newProduct.category && CATEGORIES_WITH_SUBCATEGORIES[newProduct.category as keyof typeof CATEGORIES_WITH_SUBCATEGORIES].map(subcategory => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('name', 'product')}
                    >
                      <span>Product</span>
                      {getSortIcon('name', 'product')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter product..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('name', e.target.value, 'product')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('price', 'product')}
                    >
                      <span>Price</span>
                      {getSortIcon('price', 'product')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter price..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('price', e.target.value, 'product')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('quantity', 'product')}
                    >
                      <span>Quantity</span>
                      {getSortIcon('quantity', 'product')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter quantity..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('quantity', e.target.value, 'product')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('category', 'product')}
                    >
                      <span>Category</span>
                      {getSortIcon('category', 'product')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter category..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('category', e.target.value, 'product')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('status', 'product')}
                    >
                      <span>Status</span>
                      {getSortIcon('status', 'product')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter status..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('status', e.target.value, 'product')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={product.image || '/placeholder.jpg'} 
                          alt={product.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.quantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.quantity > 10 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('id', 'order')}
                    >
                      <span>Order ID</span>
                      {getSortIcon('id', 'order')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter ID..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('id', e.target.value, 'order')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('customerName', 'order')}
                    >
                      <span>Customer</span>
                      {getSortIcon('customerName', 'order')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter customer..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('customer', e.target.value, 'order')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('items', 'order')}
                    >
                      <span>Items</span>
                      {getSortIcon('items', 'order')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter items..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('items', e.target.value, 'order')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('total', 'order')}
                    >
                      <span>Total</span>
                      {getSortIcon('total', 'order')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter total..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('total', e.target.value, 'order')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('status', 'order')}
                    >
                      <span>Status</span>
                      {getSortIcon('status', 'order')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter status..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('status', e.target.value, 'order')}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('date', 'order')}
                    >
                      <span>Date</span>
                      {getSortIcon('date', 'order')}
                    </div>
                    <input
                      type="text"
                      placeholder="Filter date..."
                      className="mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      onChange={(e) => handleColumnFilter('date', e.target.value, 'order')}
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.map((item, index) => (
                        <div key={index} className="whitespace-nowrap">
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{order.total}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                    <button className="text-green-600 hover:text-green-900">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
