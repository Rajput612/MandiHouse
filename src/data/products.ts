export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 'veg-onion-1',
    name: 'Fresh Onions',
    category: 'vegetables',
    price: 40,
    unit: 'kg',
    image: '/images/products/vegetables/onions.jpg',
    description: 'Fresh and high-quality onions perfect for daily cooking',
    stock: 100
  },
  {
    id: 'veg-tomato-1',
    name: 'Ripe Tomatoes',
    category: 'vegetables',
    price: 60,
    unit: 'kg',
    image: '/images/products/vegetables/tomatoes.jpg',
    description: 'Fresh, ripe tomatoes ideal for curries and salads',
    stock: 80
  },
  {
    id: 'dairy-curd-1',
    name: 'Fresh Dahi (Curd)',
    category: 'dairy',
    price: 50,
    unit: 'kg',
    image: '/images/products/dairy/curd.jpg',
    description: 'Creamy and fresh homestyle dahi made from pure milk',
    stock: 50
  },
  {
    id: 'seeds-flax-1',
    name: 'Organic Flax Seeds',
    category: 'seeds',
    price: 120,
    unit: '250g',
    image: '/images/products/seeds/flax.jpg',
    description: 'Organic flax seeds rich in omega-3 fatty acids',
    stock: 30
  }
];
