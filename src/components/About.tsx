import React from 'react';

export default function About() {
  const features = [
    {
      icon: 'fas fa-box-open',
      title: 'Wide Range of Products',
      description: 'From fresh vegetables and fruits to premium-quality fish, poultry, and dairy, we offer an extensive selection of products.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Trusted Suppliers',
      description: 'We partner with reliable farmers, producers, and distributors to ensure you get only the best.'
    },
    {
      icon: 'fas fa-tags',
      title: 'Competitive Pricing',
      description: 'Bulk purchases mean better deals, and we pass the savings directly to you.'
    },
    {
      icon: 'fas fa-mobile-screen-button',
      title: 'Convenient Platform',
      description: 'Browse, compare, and order products from the comfort of your location with just a few clicks.'
    },
    {
      icon: 'fas fa-truck-fast',
      title: 'On-Time Delivery',
      description: 'Our logistics network ensures timely delivery so you can focus on running your business without worries.'
    }
  ];

  const audiences = [
    { icon: 'fas fa-utensils', text: 'Restaurant Owners' },
    { icon: 'fas fa-store', text: 'Retailers' },
    { icon: 'fas fa-calendar-days', text: 'Event Organizers' },
    { icon: 'fas fa-kitchen-set', text: 'Community Kitchens' }
  ];

  return (
    <section className="py-16 bg-white" id="about">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Mandiwaley</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl">
          Welcome to Mandiwaley – your trusted partner for bulk purchasing of high-quality products. 
          We specialize in connecting buyers with the freshest and most reliable suppliers of fish, 
          dairy products, eggs, chicken, vegetables, and more.
        </p>
        <p className="text-gray-600 max-w-3xl">
          At Mandiwaley, we understand the needs of businesses, caterers, and wholesalers who rely 
          on consistent quality and competitive pricing. Our platform is designed to make bulk buying 
          simple, efficient, and trustworthy.
        </p>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-12">Why Choose Mandiwaley?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <i className={`${feature.icon} text-2xl text-green-500 mb-4`}></i>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To bridge the gap between suppliers and bulk buyers by providing a seamless, 
              transparent, and reliable platform that prioritizes quality, affordability, 
              and customer satisfaction.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading marketplace for bulk purchases, empowering businesses 
              with access to fresh and affordable products while supporting local farmers 
              and producers.
            </p>
          </div>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="bg-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-12 text-center">Who We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {audiences.map((audience, index) => (
              <div key={index} className="text-center">
                <i className={`${audience.icon} text-3xl mb-4`}></i>
                <p className="font-medium">{audience.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Join the growing Mandiwaley community today
        </h2>
        <p className="text-gray-600 mb-8">
          Experience hassle-free bulk shopping like never before.
        </p>
        <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors">
          Contact Us
        </button>
      </div>
    </section>
  );
}
