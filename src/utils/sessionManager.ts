interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  unit: string;
  category: string;
  lastUpdated: string;
}

class SessionManager {
  private static readonly INVENTORY_KEY = 'mandi_house_inventory';

  static getInventory(): Product[] {
    const inventoryData = sessionStorage.getItem(this.INVENTORY_KEY);
    return inventoryData ? JSON.parse(inventoryData) : [];
  }

  static setInventory(inventory: Product[]): void {
    sessionStorage.setItem(this.INVENTORY_KEY, JSON.stringify(inventory));
  }

  static addProduct(product: Product, currentInventory: Product[]): Product[] {
    const updatedInventory = [...currentInventory, product];
    this.setInventory(updatedInventory);
    return updatedInventory;
  }

  static updateProduct(updatedProduct: Product, currentInventory: Product[]): Product[] {
    const updatedInventory = currentInventory.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.setInventory(updatedInventory);
    return updatedInventory;
  }

  static deleteProduct(productId: string, currentInventory: Product[]): Product[] {
    const updatedInventory = currentInventory.filter(product => product.id !== productId);
    this.setInventory(updatedInventory);
    return updatedInventory;
  }

  static getProducts(): Product[] {
    return this.getInventory();
  }
}

export default SessionManager;
