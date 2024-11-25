import React, { useState, useEffect } from 'react';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  selectedCategory?: string;
}

interface FilterState {
  searchQuery: string;
  priceRange: [number, number];
  categories: string[];
  ratings: number[];
  brands: string[];
  attributes: Record<string, string[]>;
}

// Category-specific configurations
const categoryConfigs: Record<string, {
  brands: string[];
  priceRange: [number, number];
  attributes: {
    name: string;
    options: string[];
  }[];
}> = {
  'Organic Vegetables': {
    brands: ['Local Farm', 'Organic Valley', 'Nature\'s Best'],
    priceRange: [0, 500],
    attributes: [
      { name: 'Type', options: ['Fresh'] },
      { name: 'Farming', options: ['Organic', 'Hydroponic', 'Traditional'] },
      { name: 'Package', options: ['1 lb bundle', '5 oz bag', '1 lb pack'] }
    ]
  },
  'Fresh Fruits': {
    brands: ['Local Farm', 'Fresh Pick', 'Fresh Valley'],
    priceRange: [0, 800],
    attributes: [
      { name: 'Type', options: ['Fresh'] },
      { name: 'Origin', options: ['Local', 'Imported'] },
      { name: 'Package', options: ['3 lb bag', '1 lb container', '2 lb bunch'] }
    ]
  },
  'Grains and Pulses': {
    brands: ['Nature\'s Best', 'Organic Valley', 'Local Farm'],
    priceRange: [0, 600],
    attributes: [
      { name: 'Type', options: ['Grain', 'Pulse'] },
      { name: 'Package', options: ['1 lb bag', '2 lb bag', '3 lb bag'] },
      { name: 'Origin', options: ['Local', 'Imported'] }
    ]
  },
  'Seeds': {
    brands: ['Garden Pro', 'Seed Master'],
    priceRange: [0, 800],
    attributes: [
      { name: 'Type', options: ['Superfood', 'Snack'] },
      { name: 'Package', options: ['12 oz bag', '8 oz bag'] }
    ]
  },
  'Herbs': {
    brands: ['Local Farm', 'Nature\'s Best'],
    priceRange: [0, 500],
    attributes: [
      { name: 'Type', options: ['Live Plant', 'Fresh Cut'] },
      { name: 'Size', options: ['4-inch pot', '1 oz bundle'] }
    ]
  },
  'Spices': {
    brands: ['Organic Valley', 'Spice Master'],
    priceRange: [0, 700],
    attributes: [
      { name: 'Type', options: ['Ground', 'Whole'] },
      { name: 'Package', options: ['4 oz jar', '6 oz jar'] }
    ]
  },
  'Dairy': {
    brands: ['Local Farm', 'Organic Valley'],
    priceRange: [0, 600],
    attributes: [
      { name: 'Type', options: ['Fresh', 'Plain'] },
      { name: 'Size', options: ['1 gallon', '32 oz tub'] }
    ]
  },
  'Groceries': {
    brands: ['Organic Valley', 'Nature\'s Best'],
    priceRange: [0, 1200],
    attributes: [
      { name: 'Type', options: ['Oil', 'Sweetener'] },
      { name: 'Size', options: ['500ml bottle', '12 oz jar'] }
    ]
  }
};

const defaultConfig = {
  brands: ['Generic Brand'],
  priceRange: [0, 1000],
  attributes: []
};

const Filters: React.FC<FiltersProps> = ({ onFilterChange, selectedCategory }) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    priceRange: [0, 1000],
    categories: selectedCategory ? [selectedCategory] : [],
    ratings: [],
    brands: [],
    attributes: {}
  });

  // Get the configuration for the current category
  const currentConfig = selectedCategory 
    ? (categoryConfigs[selectedCategory] || defaultConfig)
    : defaultConfig;

  useEffect(() => {
    if (selectedCategory) {
      setFilters(prev => ({
        ...prev,
        categories: [selectedCategory],
        priceRange: currentConfig.priceRange,
        brands: [], // Reset brands when category changes
        attributes: {} // Reset attributes when category changes
      }));
    }
  }, [selectedCategory]);

  const handleSearchChange = (value: string) => {
    const updatedFilters = { ...filters, searchQuery: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const newValue = parseInt(value) || 0;
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[type === 'min' ? 0 : 1] = newValue;
    
    const updatedFilters = { ...filters, priceRange: newPriceRange };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    const updatedFilters = { ...filters, brands: newBrands };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    
    const updatedFilters = { ...filters, ratings: newRatings };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleAttributeChange = (attributeName: string, value: string) => {
    const currentValues = filters.attributes[attributeName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    const updatedFilters = {
      ...filters,
      attributes: {
        ...filters.attributes,
        [attributeName]: newValues
      }
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
      {/* Search Field */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Search</h3>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-24 p-2 border rounded"
            value={filters.priceRange[0]}
            min={currentConfig.priceRange[0]}
            max={currentConfig.priceRange[1]}
            onChange={(e) => handlePriceChange('min', e.target.value)}
          />
          <span className="self-center">-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-24 p-2 border rounded"
            value={filters.priceRange[1]}
            min={currentConfig.priceRange[0]}
            max={currentConfig.priceRange[1]}
            onChange={(e) => handlePriceChange('max', e.target.value)}
          />
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
          {currentConfig.brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="rounded"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.ratings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="rounded"
              />
              <div className="flex items-center">
                {[...Array(rating)].map((_, index) => (
                  <i key={index} className="fas fa-star text-yellow-400"></i>
                ))}
                {[...Array(5 - rating)].map((_, index) => (
                  <i key={index + rating} className="far fa-star text-yellow-400"></i>
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Category-specific attributes */}
      {currentConfig.attributes.map((attribute) => (
        <div key={attribute.name}>
          <h3 className="text-lg font-semibold mb-3">{attribute.name}</h3>
          <div className="space-y-2">
            {attribute.options.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.attributes[attribute.name]?.includes(option) || false}
                  onChange={() => handleAttributeChange(attribute.name, option)}
                  className="rounded"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filters;
