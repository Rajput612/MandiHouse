export interface Seller {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalOrders: number;
  successRate: number;
  inventory: ProductInventory[];
}

export interface ProductInventory {
  productId: string;
  productName: string;
  quantity: number;
  quality: 'Premium' | 'Standard' | 'Economy';
  pricePerKg: number;
}

export interface OrderRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  location: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'Pending' | 'Allocated' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  pricePerKg: number;
  allocations: SellerAllocation[];
  remainingQuantity: number;
}

export interface SellerAllocation {
  sellerId: string;
  sellerName: string;
  quantity: number;
  pricePerKg: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export interface OrderAllocation {
  orderId: string;
  sellerId: string;
  products: {
    productId: string;
    quantity: number;
    pricePerKg: number;
  }[];
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
}
