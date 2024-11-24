import React from 'react';

export default function Hero() {
  return (
    <div className="bg-green-400 py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Mandi House
        </h1>
        <p className="text-white/90 mb-8">
          Your trusted marketplace for agricultural products
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Start Selling
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}