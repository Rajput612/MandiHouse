import React from 'react';
import { Product } from '../data/products';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-sm text-gray-500 ml-1">/{product.unit}</span>
              </div>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Stock: {product.stock} {product.unit}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
