import React from 'react';

const featuredCategories = [
  {
    iconClass: 'fas fa-carrot',
    name: 'Organic Vegetables',
    description: 'Fresh from local farms'
  },
  {
    iconClass: 'fas fa-apple-alt',
    name: 'Fresh Fruits',
    description: 'Seasonal & exotic fruits'
  },
  {
    iconClass: 'fas fa-seedling',
    name: 'Grains and Pulses',
    description: 'Organic & natural'
  }
];

const categories = [
  {
    iconClass: 'fas fa-wheat-awn',
    name: 'Seeds'
  },
  {
    iconClass: 'fas fa-leaf',
    name: 'Herbs'
  },
  {
    iconClass: 'fas fa-pepper-hot',
    name: 'Spices'
  },
  {
    iconClass: 'fas fa-egg',
    name: 'Dairy'
  },
  {
    iconClass: 'fas fa-basket-shopping',
    name: 'Groceries'
  },
  {
    iconClass: 'fas fa-tractor',
    name: 'Equipment'
  }
];

export default function Categories() {
  return (
    <>
      {/* Featured Categories Section */}
      <section className="py-12 bg-gray-50" id="featured">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-green-500 p-6 rounded-lg text-center hover:bg-green-600 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <i className="text-white text-4xl mb-4 block">
                  <i className={category.iconClass}></i>
                </i>
                <h3 className="text-white text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-green-50 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Categories Section */}
      <section className="py-12 bg-white" id="categories">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg text-center hover:bg-gray-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-gray-100"
              >
                <i className={`${category.iconClass} text-3xl mb-3 text-green-500`}></i>
                <p className="text-gray-600 font-medium">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}