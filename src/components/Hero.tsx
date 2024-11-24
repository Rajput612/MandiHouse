import React from 'react';

export default function Hero() {
  return (
    <div className="bg-green-400 py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
          Welcome to Mandi House
        </h1>
        <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Your trusted marketplace for agricultural products. Connect directly with farmers and get fresh produce delivered to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button className="px-6 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base shadow-sm hover:shadow-md">
            Start Selling
          </button>
          <button className="px-6 py-2.5 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base shadow-sm hover:shadow-md">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}