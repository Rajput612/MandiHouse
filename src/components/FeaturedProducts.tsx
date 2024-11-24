import React from 'react';

const products = [
  {
    icon: (
      <svg className="h-12 w-12 text-white mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 15C7 15 12 20 17 15" />
        <path d="M12 3C12 3 8 6 7 11C6 16 7 15 7 15" />
        <path d="M12 3C12 3 16 6 17 11C18 16 17 15 17 15" />
      </svg>
    ),
    title: 'Organic Vegetables',
    description: 'Fresh from local farmers',
    price: '₹50/kg'
  },
  {
    icon: (
      <svg className="h-12 w-12 text-white mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4C12 4 8 6 8 11C8 16 12 20 12 20" />
        <path d="M12 4C12 4 16 6 16 11C16 16 12 20 12 20" />
        <path d="M12 2C12 2 10 3 9 5" />
      </svg>
    ),
    title: 'Fresh Fruits',
    description: 'Seasonal selections',
    price: '₹150/kg'
  },
  {
    icon: (
      <svg className="h-12 w-12 text-white mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3C12 3 8 6 8 12C8 18 12 21 12 21" />
        <path d="M12 3C12 3 16 6 16 12C16 18 12 21 12 21" />
      </svg>
    ),
    title: 'Grains & Pulses',
    description: 'Premium quality',
    price: '₹140/kg'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-12" id="featured">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-green-400 p-8 rounded-lg text-center">
              {product.icon}
              <h3 className="text-lg font-semibold text-white mb-2">{product.title}</h3>
              <p className="text-white/90 text-sm mb-4">{product.description}</p>
              <p className="text-white font-medium">Starting from {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}