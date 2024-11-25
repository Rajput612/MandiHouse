import SessionManager from './sessionManager';
import { Product } from '../types/Product';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  seller: string;
  deliveryDate: string;
  paymentMethod: string;
  location: string;
  buyerId: string;
  sellerId: string;
}

class ProductManager {
  private static readonly PRODUCTS_KEY = 'mandi_house_products';
  private static readonly ORDERS_KEY = 'mandi_house_orders';
  private static readonly ITEMS_PER_PAGE = 10;

  // Basic product data for testing
  private static readonly dummyProducts = [
    {
      id: 'PROD001',
      name: 'Organic Tomatoes',
      price: 40,
      quantity: 100,
      unit: 'kg',
      category: 'Vegetables',
      sellerId: 'SELL001',
      image: 'https://example.com/tomato.jpg'
    },
    {
      id: 'PROD002',
      name: 'Fresh Carrots',
      price: 35,
      quantity: 150,
      unit: 'kg',
      category: 'Vegetables',
      sellerId: 'SELL001',
      image: 'https://example.com/carrot.jpg'
    },
    {
      id: 'PROD003',
      name: 'Green Peas',
      price: 60,
      quantity: 80,
      unit: 'kg',
      category: 'Vegetables',
      sellerId: 'SELL003',
      image: 'https://example.com/peas.jpg'
    }
  ];

  // Basic order data for testing
  private static readonly dummyOrders = [
    {
      id: 'ORD001',
      items: [
        {
          name: 'Organic Tomatoes',
          quantity: 5,
          unit: 'kg',
          price: 40
        },
        {
          name: 'Fresh Carrots',
          quantity: 3,
          unit: 'kg',
          price: 35
        }
      ],
      total: 305,
      status: 'Processing',
      date: '2024-02-24',
      deliveryDate: '2024-02-27',
      seller: 'Farm Fresh Vegetables',
      location: 'Sector 62, Noida',
      paymentMethod: 'UPI',
      buyerId: 'BUY001',
      sellerId: 'SELL001'
    },
    {
      id: 'ORD002',
      items: [
        {
          name: 'Fresh Potatoes',
          quantity: 10,
          unit: 'kg',
          price: 30
        }
      ],
      total: 300,
      status: 'Delivered',
      date: '2024-02-23',
      deliveryDate: '2024-02-26',
      seller: 'Green Harvest',
      location: 'Sector 18, Noida',
      paymentMethod: 'Cash on Delivery',
      buyerId: 'BUY002',
      sellerId: 'SELL002'
    },
    {
      id: 'ORD003',
      items: [
        {
          name: 'Green Peas',
          quantity: 2,
          unit: 'kg',
          price: 60
        },
        {
          name: 'Cauliflower',
          quantity: 1,
          unit: 'piece',
          price: 40
        }
      ],
      total: 160,
      status: 'Pending',
      date: '2024-02-24',
      deliveryDate: '2024-02-27',
      seller: 'Organic Farms',
      location: 'Sector 45, Noida',
      paymentMethod: 'Card',
      buyerId: 'BUY001',
      sellerId: 'SELL003'
    }
  ];

  // Dummy data for products
  private static readonly newDummyProducts: Product[] = [
    {
      id: 'p1',
      name: 'Fresh Tomatoes',
      description: 'Organic farm-fresh tomatoes',
      price: 40,
      quantity: 100,
      unit: 'kg',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1546470427-227c7369a9b0',
      sellerId: 'seller1'
    },
    {
      id: 'p2',
      name: 'Red Onions',
      description: 'Premium quality red onions',
      price: 35,
      quantity: 150,
      unit: 'kg',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31',
      sellerId: 'seller1'
    },
    {
      id: 'p3',
      name: 'Basmati Rice',
      description: 'Premium long-grain basmati rice',
      price: 85,
      quantity: 8,
      unit: 'kg',
      category: 'Grains',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
      sellerId: 'seller1'
    },
    {
      id: 'p4',
      name: 'Green Apples',
      description: 'Fresh and crispy green apples',
      price: 120,
      quantity: 75,
      unit: 'kg',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2',
      sellerId: 'seller1'
    },
    {
      id: 'p5',
      name: 'Organic Potatoes',
      description: 'Farm-fresh organic potatoes',
      price: 30,
      quantity: 5,
      unit: 'kg',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
      sellerId: 'seller1'
    }
  ];

  // Dummy data for orders
  private static readonly newDummyOrders = [
    {
      id: 'ord1',
      customerName: 'Rahul Kumar',
      items: [
        { name: 'Fresh Tomatoes', quantity: 5 },
        { name: 'Red Onions', quantity: 3 }
      ],
      total: 305,
      status: 'Delivered',
      date: '2024-01-15',
      sellerId: 'seller1'
    },
    {
      id: 'ord2',
      customerName: 'Priya Sharma',
      items: [
        { name: 'Basmati Rice', quantity: 10 },
        { name: 'Green Apples', quantity: 2 }
      ],
      total: 1090,
      status: 'Processing',
      date: '2024-01-16',
      sellerId: 'seller1'
    },
    {
      id: 'ord3',
      customerName: 'Amit Patel',
      items: [
        { name: 'Organic Potatoes', quantity: 8 },
        { name: 'Fresh Tomatoes', quantity: 2 }
      ],
      total: 320,
      status: 'Pending',
      date: '2024-01-16',
      sellerId: 'seller1'
    },
    {
      id: 'ord4',
      customerName: 'Sneha Reddy',
      items: [
        { name: 'Green Apples', quantity: 3 },
        { name: 'Red Onions', quantity: 4 }
      ],
      total: 500,
      status: 'Cancelled',
      date: '2024-01-14',
      sellerId: 'seller1'
    }
  ];

  // Product Methods
  static getProducts(): Product[] {
    const productsData = sessionStorage.getItem(this.PRODUCTS_KEY);
    return productsData ? JSON.parse(productsData) : [...this.dummyProducts, ...this.newDummyProducts];
  }

  static getProductsBySeller(sellerId: string): Product[] {
    return this.getProducts().filter(product => product.sellerId === sellerId);
  }

  static updateProductStock(productId: string, newQuantity: number): boolean {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return false;
    products[productIndex].quantity = newQuantity;
    this.setProducts(products);
    return true;
  }

  static setProducts(products: Product[]): void {
    sessionStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
  }

  // Order Methods
  static getOrders(): Order[] {
    const ordersData = sessionStorage.getItem(this.ORDERS_KEY);
    return ordersData ? JSON.parse(ordersData) : [...this.dummyOrders, ...this.newDummyOrders];
  }

  static getOrdersBySeller(sellerId: string): Order[] {
    return this.getOrders().filter(order => order.sellerId === sellerId);
  }

  static getOrdersByBuyer(buyerId: string): Order[] {
    return this.getOrders().filter(order => order.buyerId === buyerId);
  }

  static getPaginatedOrders(page: number = 1, filter?: 'active' | 'completed' | 'all'): { orders: Order[], totalPages: number } {
    let filteredOrders = this.getOrders();
    
    if (filter === 'active') {
      filteredOrders = this.getOrders().filter(order => 
        order.status === 'Processing' || order.status === 'Pending'
      );
    } else if (filter === 'completed') {
      filteredOrders = this.getOrders().filter(order => 
        order.status === 'Delivered' || order.status === 'Cancelled'
      );
    }

    const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
    const endIndex = startIndex + this.ITEMS_PER_PAGE;
    const totalPages = Math.ceil(filteredOrders.length / this.ITEMS_PER_PAGE);

    return {
      orders: filteredOrders.slice(startIndex, endIndex),
      totalPages
    };
  }

  static cancelOrder(orderId: string): boolean {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1 || orders[orderIndex].status === 'Delivered') {
      return false;
    }
    orders[orderIndex].status = 'Cancelled';
    this.setOrders(orders);
    return true;
  }

  static setOrders(orders: Order[]): void {
    sessionStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  static getProductById(productId: string): Product | undefined {
    return this.getProducts().find(product => product.id === productId);
  }

  static addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    this.setProducts(products);
  }

  static updateProduct(productId: string, updates: Partial<Product>): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.setProducts(products);
    }
  }

  static deleteProduct(productId: string): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      this.setProducts(products);
    }
  }

  static getOrderById(orderId: string) {
    return this.getOrders().find(order => order.id === orderId);
  }

  static updateOrderStatus(orderId: string, status: string) {
    const orders = this.getOrders();
    const order = orders.find(order => order.id === orderId);
    if (order) {
      order.status = status;
      this.setOrders(orders);
    }
  }
}

export default ProductManager;
