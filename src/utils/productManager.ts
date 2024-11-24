import SessionManager from './sessionManager';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  unit: string;
  category: string;
  lastUpdated: string;
}

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
}

class ProductManager {
  private static readonly PRODUCTS_KEY = 'mandi_house_products';
  private static readonly ORDERS_KEY = 'mandi_house_orders';
  private static readonly ITEMS_PER_PAGE = 10;

  // Get all products from session storage
  static getProducts(): Product[] {
    const productsData = sessionStorage.getItem(this.PRODUCTS_KEY);
    return productsData ? JSON.parse(productsData) : [];
  }

  // Save products to session storage
  static setProducts(products: Product[]): void {
    sessionStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
  }

  // Get merged products with combined quantities
  static getMergedProducts(page: number = 1): { products: Product[], totalPages: number } {
    const products = this.getProducts();
    const mergedProducts = new Map<string, Product>();

    // Merge products with same name and unit
    products.forEach(product => {
      const key = `${product.name}_${product.unit}`;
      if (mergedProducts.has(key)) {
        const existing = mergedProducts.get(key)!;
        existing.stock += product.stock;
        if (new Date(product.lastUpdated) > new Date(existing.lastUpdated)) {
          existing.lastUpdated = product.lastUpdated;
        }
      } else {
        mergedProducts.set(key, { ...product });
      }
    });

    const allProducts = Array.from(mergedProducts.values());
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / this.ITEMS_PER_PAGE);
    
    // Calculate slice for current page
    const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
    const endIndex = startIndex + this.ITEMS_PER_PAGE;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      totalPages
    };
  }

  // Get all orders from session storage
  static getOrders(): Order[] {
    const ordersData = sessionStorage.getItem(this.ORDERS_KEY);
    return ordersData ? JSON.parse(ordersData) : [];
  }

  // Save orders to session storage
  static setOrders(orders: Order[]): void {
    sessionStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  // Get paginated orders
  static getPaginatedOrders(page: number = 1, filter?: 'active' | 'completed' | 'all'): { orders: Order[], totalPages: number } {
    const orders = this.getOrders();
    
    // Apply filter if specified
    const filteredOrders = filter && filter !== 'all'
      ? orders.filter(order => {
          if (filter === 'active') return order.status !== 'Delivered' && order.status !== 'Cancelled';
          if (filter === 'completed') return order.status === 'Delivered';
          return true;
        })
      : orders;

    // Calculate pagination
    const totalPages = Math.ceil(filteredOrders.length / this.ITEMS_PER_PAGE);
    const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
    const endIndex = startIndex + this.ITEMS_PER_PAGE;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      totalPages
    };
  }

  // Add new order and update product quantities
  static addOrder(order: Order): boolean {
    // Get current inventory and orders
    const inventory = this.getProducts();
    const orders = this.getOrders();

    // Check if we have enough stock for all items
    const canFulfillOrder = order.items.every(orderItem => {
      const product = inventory.find(p => p.name === orderItem.name);
      return product && product.stock >= orderItem.quantity;
    });

    if (!canFulfillOrder) {
      return false; // Cannot fulfill order due to insufficient stock
    }

    // Update product quantities
    const updatedInventory = inventory.map(product => {
      const orderItem = order.items.find(item => item.name === product.name);
      if (orderItem) {
        return {
          ...product,
          stock: product.stock - orderItem.quantity,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return product;
    });

    // Save updated inventory and new order
    this.setProducts(updatedInventory);
    this.setOrders([...orders, order]);

    return true;
  }

  // Update product stock considering merged products
  static updateProductStock(productName: string, unit: string, stockDiff: number): boolean {
    const products = this.getProducts();
    const matchingProducts = products.filter(
      p => p.name.toLowerCase() === productName.toLowerCase() && p.unit === unit
    );

    if (matchingProducts.length === 0) {
      return false;
    }

    // Calculate total available stock
    const totalStock = matchingProducts.reduce((sum, p) => sum + (p.stock || 0), 0);

    // Check if we have enough stock for reduction
    if (stockDiff < 0 && Math.abs(stockDiff) > totalStock) {
      return false;
    }

    // Distribute stock change proportionally
    let remainingDiff = stockDiff;
    const updatedProducts = products.map(product => {
      if (product.name.toLowerCase() === productName.toLowerCase() && product.unit === unit) {
        const currentStock = product.stock || 0;
        const proportion = currentStock / totalStock;
        const stockChange = Math.round(stockDiff * proportion);
        remainingDiff -= stockChange;

        return {
          ...product,
          stock: currentStock + stockChange,
          lastUpdated: new Date().toISOString()
        };
      }
      return product;
    });

    // Add any remaining difference to the first matching product
    if (remainingDiff !== 0) {
      const firstMatch = updatedProducts.find(
        p => p.name.toLowerCase() === productName.toLowerCase() && p.unit === unit
      );
      if (firstMatch) {
        firstMatch.stock = (firstMatch.stock || 0) + remainingDiff;
      }
    }

    this.setProducts(updatedProducts);
    return true;
  }

  // Update product stock (for sellers)
  static updateProductStockById(productId: string, newStock: number): boolean {
    const inventory = this.getProducts();
    const product = inventory.find(p => p.id === productId);

    if (!product) {
      return false;
    }

    const updatedProduct = {
      ...product,
      stock: product.stock + newStock, // Add to existing stock
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    this.setProducts(inventory.map(p => p.id === productId ? updatedProduct : p));
    return true;
  }

  // Check if product has enough stock
  static hasEnoughStock(productId: string, requestedQuantity: number): boolean {
    const inventory = this.getProducts();
    const product = inventory.find(p => p.id === productId);
    return product ? product.stock >= requestedQuantity : false;
  }

  // Get current stock level for a product
  static getProductStock(productId: string): number {
    const inventory = this.getProducts();
    const product = inventory.find(p => p.id === productId);
    return product ? product.stock : 0;
  }

  // Cancel order and restore product quantities
  static cancelOrder(orderId: string): boolean {
    const orders = this.getOrders();
    const orderToCancel = orders.find(o => o.id === orderId);

    if (!orderToCancel || orderToCancel.status === 'Delivered') {
      return false;
    }

    // Restore product quantities
    const inventory = this.getProducts();
    const updatedInventory = inventory.map(product => {
      const orderItem = orderToCancel.items.find(item => item.name === product.name);
      if (orderItem) {
        return {
          ...product,
          stock: product.stock + orderItem.quantity,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return product;
    });

    // Update order status to cancelled
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Cancelled' }
        : order
    );

    // Save updates
    this.setProducts(updatedInventory);
    this.setOrders(updatedOrders);

    return true;
  }

  // Get all products with low stock (below threshold)
  static getLowStockProducts(threshold: number = 10): Product[] {
    const inventory = this.getProducts();
    return inventory.filter(product => product.stock <= threshold);
  }
}

export default ProductManager;
