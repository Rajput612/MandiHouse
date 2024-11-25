import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    iconClass: 'fas fa-fish',
    name: 'Fish'
  }
];

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      {/* Featured Categories Section */}
      <section className="py-8 sm:py-12 bg-gray-50" id="featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 sm:mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-green-500 p-4 sm:p-6 rounded-lg text-center hover:bg-green-600 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => handleCategoryClick(category.name)}
              >
                <i className="text-white text-3xl sm:text-4xl mb-3 sm:mb-4 block">
                  <i className={category.iconClass}></i>
                </i>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">{category.name}</h3>
                <p className="text-green-50 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Categories Section */}
      <section className="py-8 sm:py-12 bg-white" id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 sm:mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white p-3 sm:p-4 md:p-6 rounded-lg text-center hover:bg-gray-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-gray-100"
                onClick={() => handleCategoryClick(category.name)}
              >
                <i className={`${category.iconClass} text-2xl sm:text-3xl mb-2 sm:mb-3 text-green-500`}></i>
                <p className="text-gray-600 font-medium text-sm sm:text-base">
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