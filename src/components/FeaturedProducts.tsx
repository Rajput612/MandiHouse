import React, { useState } from 'react';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  minOrder: number;
}

interface OrderRequest {
  productId: number;
  quantity: number;
  totalPrice: number;
  advanceAmount: number;
}

const products: Product[] = [
  {
    id: 1,
    image: '/images/products/vegetables/tomatoes.jpg',
    title: 'Premium Tomatoes',
    description: 'Fresh, ripe tomatoes from Nashik farms',
    price: 40,
    unit: 'kg',
    minOrder: 100
  },
  {
    id: 2,
    image: '/images/products/vegetables/onions.jpg',
    title: 'Red Onions',
    description: 'Premium quality onions from Maharashtra',
    price: 35,
    unit: 'kg',
    minOrder: 200
  },
  {
    id: 3,
    image: '/images/products/vegetables/potatoes.jpg',
    title: 'Fresh Potatoes',
    description: 'Grade A potatoes from Punjab farms',
    price: 30,
    unit: 'kg',
    minOrder: 150
  }
];

interface OrderModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (request: OrderRequest) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState(product.minOrder);
  const totalPrice = quantity * product.price;
  const advanceAmount = totalPrice * 0.02; // 2% advance

  const handleSubmit = () => {
    onSubmit({
      productId: product.id,
      quantity,
      totalPrice,
      advanceAmount
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded mr-4" />
          <h3 className="text-xl font-semibold">Order Request - {product.title}</h3>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Minimum order: {product.minOrder} {product.unit}</p>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity ({product.unit})
          </label>
          <input
            type="number"
            value={quantity}
            min={product.minOrder}
            step={10}
            onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span>Price per {product.unit}:</span>
            <span>₹{product.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Amount:</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between font-semibold text-green-600">
            <span>Advance Payment (2%):</span>
            <span>₹{advanceAmount}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOrderSubmit = (request: OrderRequest) => {
    // Here you would typically send this to your backend
    console.log('Order Request:', request);
    alert(`Order request submitted!\nAdvance Payment Required: ₹${request.advanceAmount}\nAn admin will review your request shortly.`);
    setSelectedProduct(null);
  };

  return (
    <section className="py-8 sm:py-12 bg-gray-50" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Bulk orders with verified sellers</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-green-600 font-semibold">₹{product.price}/{product.unit}</p>
                  <p className="text-sm text-gray-500">Min. Order: {product.minOrder} {product.unit}</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Place Order Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </section>
  );
}