import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  seller: string;
  quality: 'high' | 'medium' | 'low';
  status: 'available' | 'low-stock' | 'out-of-stock';
}

const ProductCatalog: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: 40,
      stock: 500,
      seller: 'Farm Fresh Ltd',
      quality: 'high',
      status: 'available'
    },
    {
      id: '2',
      name: 'Organic Rice',
      category: 'Grains',
      price: 75,
      stock: 1000,
      seller: 'Organic Foods Co',
      quality: 'high',
      status: 'available'
    },
    {
      id: '3',
      name: 'Green Chilies',
      category: 'Vegetables',
      price: 30,
      stock: 50,
      seller: 'Spice Traders',
      quality: 'medium',
      status: 'low-stock'
    }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Product Catalog</h1>
        <p className="text-gray-600">Manage and monitor product inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-semibold">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Low Stock Items</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {products.filter(p => p.status === 'low-stock').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Out of Stock</div>
          <div className="text-2xl font-semibold text-red-600">
            {products.filter(p => p.status === 'out-of-stock').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">High Quality Products</div>
          <div className="text-2xl font-semibold text-green-600">
            {products.filter(p => p.quality === 'high').length}
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Categories Overview</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Vegetables</h3>
            <div className="text-sm text-gray-600">
              <div>Total Items: 2</div>
              <div>Avg Price: ₹35</div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Grains</h3>
            <div className="text-sm text-gray-600">
              <div>Total Items: 1</div>
              <div>Avg Price: ₹75</div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Add Category</h3>
            <button className="text-blue-600 text-sm hover:text-blue-800">
              + Add New Category
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Product List</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Product
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (₹/kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.seller}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${product.quality === 'high' ? 'bg-green-100 text-green-800' :
                      product.quality === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {product.quality}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${product.status === 'available' ? 'bg-green-100 text-green-800' :
                      product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCatalog;
