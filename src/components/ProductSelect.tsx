import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import SessionManager from '../utils/sessionManager';
import ProductRequestManager from '../utils/productRequestManager';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  unit: string;
  category: string;
  lastUpdated: string;
}

interface ProductSelectProps {
  onSelect: (product: Product | null) => void;
  selectedProduct?: Product | null;
}

export default function ProductSelect({ onSelect, selectedProduct }: ProductSelectProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Vegetables',
    unit: 'kg'
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get all existing products
  const products = SessionManager.getProducts();

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle product selection
  const handleSelectProduct = (product: Product) => {
    onSelect(product);
    setSearchTerm(product.name);
    setIsDropdownOpen(false);
  };

  // Handle new product request
  const handleNewProductRequest = async () => {
    if (!user) return;

    // Check if a similar request is pending
    if (ProductRequestManager.hasPendingRequest(newProduct.name)) {
      alert('A similar product request is already pending approval.');
      return;
    }

    // Check if product already exists
    const productExists = products.some(
      p => p.name.toLowerCase() === newProduct.name.toLowerCase()
    );
    if (productExists) {
      alert('This product already exists in our catalog.');
      return;
    }

    // Submit request
    try {
      const request = await ProductRequestManager.addRequest({
        ...newProduct,
        requestedBy: user.id
      });

      alert('Your product request has been submitted for review.');
      setShowNewProductForm(false);
      setNewProduct({
        name: '',
        description: '',
        category: 'Vegetables',
        unit: 'kg'
      });
    } catch (error) {
      alert('Failed to submit product request. Please try again.');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Product Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search for a product..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Product Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-600">
                  Category: {product.category} | Unit: {product.unit}
                </div>
              </div>
            ))
          ) : searchTerm ? (
            <div className="p-2">
              <div className="text-gray-600">No products found</div>
              <button
                onClick={() => setShowNewProductForm(true)}
                className="mt-1 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Request to add "{searchTerm}" to catalog
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* New Product Request Form */}
      {showNewProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Request New Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name || searchTerm}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <select
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="l">Liter (l)</option>
                  <option value="ml">Milliliter (ml)</option>
                  <option value="piece">Piece</option>
                  <option value="dozen">Dozen</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewProductForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleNewProductRequest}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
