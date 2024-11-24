import React from 'react';

const features = [
  {
    iconClass: 'fas fa-store-alt',
    title: 'Direct from Farmers',
    description: 'Connect directly with local farmers and get the best prices'
  },
  {
    iconClass: 'fas fa-apple-alt',
    title: 'Fresh & Organic',
    description: 'Quality assured fresh produce and organic options'
  },
  {
    iconClass: 'fas fa-truck-fast',
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery to your doorstep'
  },
  {
    iconClass: 'fas fa-hand-holding-dollar',
    title: 'Secure Payments',
    description: 'Safe and secure payment options'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">Why Choose Mandi House?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <i className={`${feature.iconClass} text-2xl text-green-500`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}