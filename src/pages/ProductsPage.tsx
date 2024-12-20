import React from 'react';
import { ProductGrid } from '../components/ProductGrid';
import FeaturedProducts from '../components/FeaturedProducts';
import { products } from '../data/products';

export const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Mandi House Products</h1>
        </div>
      </header>
      <main>
        <FeaturedProducts />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">All Products</h2>
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
    </div>
  );
};
