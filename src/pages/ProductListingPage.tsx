import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  image: string;
  attributes?: Record<string, string>;
}

// Sample product data with category-specific attributes
const sampleProducts: Product[] = [
  // Organic Vegetables
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 60,
    category: "Organic Vegetables",
    brand: "Local Farm",
    rating: 5,
    image: "/images/products/vegetables/tomatoes.jpg",
    attributes: {
      Type: "Fresh",
      Farming: "Organic",
      Package: "500g"
    }
  },
  {
    id: 2,
    name: "Green Spinach",
    price: 40,
    category: "Organic Vegetables",
    brand: "Organic Valley",
    rating: 4,
    image: "/images/products/vegetables/spinach.jpg",
    attributes: {
      Type: "Fresh",
      Farming: "Organic",
      Package: "250g bunch"
    }
  },
  {
    id: 3,
    name: "Red Onions",
    price: 45,
    category: "Organic Vegetables",
    brand: "Nature's Best",
    rating: 4,
    image: "/images/products/vegetables/onions.jpg",
    attributes: {
      Type: "Fresh",
      Farming: "Organic",
      Package: "1 kg"
    }
  },

  // Fresh Fruits
  {
    id: 4,
    name: "Sweet Mangoes",
    price: 199,
    category: "Fresh Fruits",
    brand: "Local Farm",
    rating: 5,
    image: "/images/products/fruits/mango.jpg",
    attributes: {
      Type: "Fresh",
      Origin: "Local",
      Package: "1 kg"
    }
  },
  {
    id: 5,
    name: "Red Apples",
    price: 149,
    category: "Fresh Fruits",
    brand: "Fresh Pick",
    rating: 4,
    image: "/images/products/fruits/apple.jpg",
    attributes: {
      Type: "Fresh",
      Origin: "Himachal",
      Package: "1 kg"
    }
  },
  {
    id: 6,
    name: "Ripe Bananas",
    price: 59,
    category: "Fresh Fruits",
    brand: "Fresh Valley",
    rating: 4,
    image: "/images/products/fruits/banana.jpg",
    attributes: {
      Type: "Fresh",
      Origin: "Local",
      Package: "1 dozen"
    }
  },

  // Fish
  {
    id: 7,
    name: "Fresh Rohu Fish",
    price: 299,
    category: "Fish",
    brand: "Fresh Catch",
    rating: 5,
    image: "/images/products/fish/rohu.jpg",
    attributes: {
      Type: "Freshwater",
      Cut: "Whole",
      Weight: "1 kg"
    }
  },
  {
    id: 8,
    name: "Pomfret",
    price: 599,
    category: "Fish",
    brand: "Sea Fresh",
    rating: 4,
    image: "/images/products/fish/pomfret.jpg",
    attributes: {
      Type: "Marine",
      Cut: "Whole",
      Weight: "500g"
    }
  },
  {
    id: 9,
    name: "Prawns",
    price: 449,
    category: "Fish",
    brand: "Ocean Delight",
    rating: 5,
    image: "/images/products/fish/prawns.jpg",
    attributes: {
      Type: "Seafood",
      Size: "Medium",
      Weight: "500g"
    }
  },

  // Seeds
  {
    id: 10,
    name: "Sunflower Seeds",
    price: 149,
    category: "Seeds",
    brand: "Nature's Best",
    rating: 5,
    image: "/images/products/seeds/sunflower.jpg",
    attributes: {
      Type: "Roasted",
      Package: "250g pack"
    }
  },
  {
    id: 11,
    name: "Flax Seeds",
    price: 199,
    category: "Seeds",
    brand: "Organic Valley",
    rating: 4,
    image: "/images/products/seeds/flax.jpg",
    attributes: {
      Type: "Raw",
      Package: "200g pack"
    }
  },

  // Herbs
  {
    id: 12,
    name: "Fresh Coriander",
    price: 30,
    category: "Herbs",
    brand: "Local Farm",
    rating: 5,
    image: "/images/products/herbs/coriander.jpg",
    attributes: {
      Type: "Fresh",
      Package: "100g bunch"
    }
  },
  {
    id: 13,
    name: "Mint Leaves",
    price: 30,
    category: "Herbs",
    brand: "Nature's Best",
    rating: 4,
    image: "/images/products/herbs/mint.jpg",
    attributes: {
      Type: "Fresh",
      Package: "100g bunch"
    }
  },

  // Spices
  {
    id: 14,
    name: "Red Chilli Powder",
    price: 199,
    category: "Spices",
    brand: "Organic Valley",
    rating: 5,
    image: "/images/products/spices/chilli.jpg",
    attributes: {
      Type: "Ground",
      Package: "200g pack"
    }
  },
  {
    id: 15,
    name: "Turmeric Powder",
    price: 159,
    category: "Spices",
    brand: "Spice Master",
    rating: 5,
    image: "/images/products/spices/turmeric.jpg",
    attributes: {
      Type: "Ground",
      Package: "200g pack"
    }
  },

  // Dairy
  {
    id: 16,
    name: "Fresh Paneer",
    price: 199,
    category: "Dairy",
    brand: "Local Farm",
    rating: 5,
    image: "/images/products/dairy/paneer.jpg",
    attributes: {
      Type: "Fresh",
      Package: "500g block"
    }
  },
  {
    id: 17,
    name: "Natural Curd",
    price: 89,
    category: "Dairy",
    brand: "Organic Valley",
    rating: 4,
    image: "/images/products/dairy/curd.jpg",
    attributes: {
      Type: "Fresh",
      Package: "500g pack"
    }
  },

  // Groceries
  {
    id: 18,
    name: "Toor Dal",
    price: 159,
    category: "Groceries",
    brand: "Nature's Best",
    rating: 5,
    image: "/images/products/groceries/toor-dal.jpg",
    attributes: {
      Type: "Pulses",
      Package: "1 kg pack"
    }
  },
  {
    id: 19,
    name: "Basmati Rice",
    price: 249,
    category: "Groceries",
    brand: "Royal Foods",
    rating: 5,
    image: "/images/products/groceries/basmati-rice.jpg",
    attributes: {
      Type: "Rice",
      Package: "1 kg pack"
    }
  }
];

interface FilterState {
  searchQuery: string;
  priceRange: [number, number];
  categories: string[];
  ratings: number[];
  brands: string[];
  attributes: Record<string, string[]>;
}

interface OrderState {
  quantity: number;
  selectedProduct: Product | null;
}

const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || undefined;
  
  // Filter products by category initially
  const initialProducts = selectedCategory 
    ? sampleProducts.filter(product => product.category === selectedCategory)
    : sampleProducts;
  
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Update products when category changes
  useEffect(() => {
    if (selectedCategory) {
      setProducts(sampleProducts.filter(product => product.category === selectedCategory));
    } else {
      setProducts(sampleProducts);
    }
  }, [selectedCategory]);

  const [orderState, setOrderState] = useState<OrderState>({
    quantity: 1,
    selectedProduct: null
  });

  // Add new state for order modal
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleFilterChange = (filters: FilterState) => {
    // Start with products filtered by current category
    let filteredProducts = selectedCategory 
      ? sampleProducts.filter(product => product.category === selectedCategory)
      : sampleProducts;

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim();
      filteredProducts = filteredProducts.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase() === query;
        const brandMatch = product.brand.toLowerCase() === query;
        
        // For exact attribute matches
        let attributeMatch = false;
        if (product.attributes) {
          attributeMatch = Object.values(product.attributes).some(value => 
            value.toLowerCase() === query
          );
        }
        
        return nameMatch || categoryMatch || brandMatch || attributeMatch;
      });
    }

    // Apply price filter (prices are in rupees)
    filteredProducts = filteredProducts.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply brand filter
    if (filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => filters.brands.includes(product.brand)
      );
    }

    // Apply rating filter
    if (filters.ratings.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => filters.ratings.includes(product.rating)
      );
    }

    // Apply attribute filters
    Object.entries(filters.attributes).forEach(([attributeName, selectedValues]) => {
      if (selectedValues.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          product.attributes?.[attributeName] && 
          selectedValues.includes(product.attributes[attributeName])
        );
      }
    });

    setProducts(filteredProducts);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setOrderState(prev => ({ ...prev, quantity: value }));
    }
  };

  const handleOrder = (product: Product) => {
    setOrderState(prev => ({ ...prev, selectedProduct: product }));
    setShowOrderModal(true);
  };

  const handlePlaceOrder = () => {
    if (orderState.selectedProduct) {
      // Here you would typically integrate with a payment gateway
      alert(`Order placed successfully!
Product: ${orderState.selectedProduct.name}
Quantity: ${orderState.quantity}
Total: ₹${orderState.selectedProduct.price * orderState.quantity}`);
      setShowOrderModal(false);
      setOrderState({ quantity: 1, selectedProduct: null });
    }
  };

  const ProductImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    
    const handleError = () => {
      setImgSrc('/images/placeholder.jpg'); // Fallback to placeholder image
    };

    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className="w-full h-48 object-cover rounded-t-lg"
      />
    );
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ProductImage src={product.image} alt={product.name} />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <i 
                key={index}
                className={`${
                  index < product.rating ? 'fas' : 'far'
                } fa-star text-yellow-400`}
              ></i>
            ))}
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold">₹{product.price.toFixed(2)}</span>
            <button 
              onClick={() => handleOrder(product)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Order Now
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <div className="mb-1">
              <span className="font-medium">Category:</span> {product.category}
            </div>
            <div className="mb-1">
              <span className="font-medium">Brand:</span> {product.brand}
            </div>
            {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
              <div key={key} className="mb-1">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar with filters */}
        <div className="w-1/4">
          <Filters onFilterChange={handleFilterChange} selectedCategory={selectedCategory} />
        </div>

        {/* Product grid */}
        <div className="w-3/4">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              {selectedCategory || 'All Products'}
              <span className="text-gray-500 text-lg ml-2">({products.length} items)</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && orderState.selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Place Order</h2>
            <div className="mb-4">
              <ProductImage src={orderState.selectedProduct.image} alt={orderState.selectedProduct.name} />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{orderState.selectedProduct.name}</h3>
              <p className="text-gray-600">Price: ₹{orderState.selectedProduct.price}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={orderState.quantity}
                onChange={handleQuantityChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">
                Total: ₹{orderState.selectedProduct.price * orderState.quantity}
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowOrderModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
