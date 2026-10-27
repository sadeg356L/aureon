export interface ProductVariant {
  id: string
  name: string
  price?: number
  color?: string
  storage?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: 'smartphones' | 'laptops' | 'cameras' | 'accessories' | 'audio' | 'smart-devices'
  description: string
  price: number
  compareAtPrice?: number
  currency: string
  images: string[]
  model3dPath?: string
  specifications: Record<string, string>
  variants?: ProductVariant[]
  stock: number
  featured: boolean
  createdAt: string
}

export const products: Product[] = [
  {
    id: 'iphone-13-pro',
    slug: 'iphone-13-pro',
    name: 'iPhone 13 Pro',
    brand: 'Apple',
    category: 'smartphones',
    description: 'The iPhone 13 Pro features a stunning Super Retina XDR display with ProMotion, A15 Bionic chip, and a pro camera system for incredible photos and videos.',
    price: 3999,
    compareAtPrice: 4299,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80'
    ],
    model3dPath: 'models/free_iphone_13_pro_2021.glb',
    specifications: {
      'Display': '6.1" Super Retina XDR OLED',
      'Chip': 'A15 Bionic',
      'Camera': 'Pro 12MP camera system',
      'Storage': '128GB',
      'Battery': 'Up to 22 hours video playback',
      'OS': 'iOS 15'
    },
    stock: 15,
    featured: true,
    createdAt: '2023-09-24'
  },
  {
    id: 'nokia-3310-classic',
    slug: 'nokia-3310-classic',
    name: 'Classic Nokia Phone',
    brand: 'Nokia',
    category: 'smartphones',
    description: 'The legendary Nokia 3310 returns with modern updates - long-lasting battery, durable build, and classic design.',
    price: 299,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
    ],
    model3dPath: '/models/old_nokia_phone_low_poly.glb',
    specifications: {
      'Display': '2.4" TFT',
      'Battery': '22 days standby',
      'Durability': 'Indestructible build',
      'Games': 'Snake included',
      'Network': '2G'
    },
    stock: 8,
    featured: true,
    createdAt: '2022-05-15'
  },
  {
    id: 'laptop-mouse-bundle',
    slug: 'laptop-mouse-bundle',
    name: 'Laptop and Mouse Bundle',
    brand: 'AUREON',
    category: 'laptops',
    description: 'Complete productivity bundle with premium laptop and wireless mouse. Perfect for work and creativity.',
    price: 3299,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80'
    ],
    model3dPath: '/models/laptop_and_mouse.glb',
    specifications: {
      'Screen': '15.6" Full HD',
      'Processor': 'Intel Core i5',
      'RAM': '16GB DDR4',
      'Storage': '512GB SSD',
      'Mouse': 'Wireless optical mouse included'
    },
    stock: 12,
    featured: true,
    createdAt: '2023-03-10'
  },
  {
    id: 'premium-laptop',
    slug: 'premium-laptop',
    name: 'Premium Laptop',
    brand: 'AUREON',
    category: 'laptops',
    description: 'Ultra-slim premium laptop with high-resolution display, powerful performance, and elegant design for professionals.',
    price: 4499,
    compareAtPrice: 4799,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80'
    ],
    model3dPath: '/models/laptop.glb',
    specifications: {
      'Screen': '14" 4K OLED',
      'Processor': 'Intel Core i7',
      'RAM': '32GB DDR5',
      'Storage': '1TB SSD',
      'Weight': '1.2kg',
      'Battery': '12 hours'
    },
    stock: 6,
    featured: true,
    createdAt: '2023-06-20'
  },
  {
    id: 'canon-at-1',
    slug: 'canon-at-1-retro-camera',
    name: 'Canon AT-1 Retro Camera',
    brand: 'Canon',
    category: 'cameras',
    description: 'Classic 35mm SLR camera with timeless design. A collector\'s piece that captures memories with vintage charm.',
    price: 1299,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&q=80'
    ],
    model3dPath: '/models/canon_at-1_retro_camera.glb',
    specifications: {
      'Type': '35mm SLR',
      'Lens Mount': 'Canon FD',
      'Shutter': 'Mechanical',
      'Focus': 'Manual',
      'Era': '1970s vintage'
    },
    stock: 3,
    featured: true,
    createdAt: '2021-11-05'
  },
  {
    id: 'wireless-earbuds',
    slug: 'wireless-earbuds-pro',
    name: 'Wireless Earbuds Pro',
    brand: 'AUREON',
    category: 'audio',
    description: 'True wireless earbuds with active noise cancellation, premium sound quality, and all-day comfort.',
    price: 899,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'
    ],
    specifications: {
      'Type': 'True Wireless',
      'ANC': 'Active Noise Cancellation',
      'Battery': '8h + 24h case',
      'Water Resistance': 'IPX5',
      'Connectivity': 'Bluetooth 5.2'
    },
    stock: 25,
    featured: false,
    createdAt: '2023-08-12'
  },
  {
    id: 'smart-watch',
    slug: 'smart-watch-series-x',
    name: 'Smart Watch Series X',
    brand: 'AUREON',
    category: 'smart-devices',
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and seamless connectivity.',
    price: 699,
    compareAtPrice: 799,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    ],
    specifications: {
      'Display': '1.9" AMOLED',
      'Battery': '7 days',
      'Health': 'Heart rate, SpO2, Sleep',
      'GPS': 'Built-in GPS',
      'Water Resistance': '5ATM'
    },
    stock: 18,
    featured: false,
    createdAt: '2023-07-08'
  },
  {
    id: 'phone-case-premium',
    slug: 'premium-phone-case',
    name: 'Premium Leather Phone Case',
    brand: 'AUREON',
    category: 'accessories',
    description: 'Handcrafted genuine leather phone case with wireless charging compatibility and elegant design.',
    price: 149,
    currency: 'TND',
    images: [
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80'
    ],
    specifications: {
      'Material': 'Genuine Leather',
      'Wireless Charging': 'Compatible',
      'Protection': 'Shock absorbing',
      'Finish': 'Matte premium'
    },
    stock: 40,
    featured: false,
    createdAt: '2023-09-01'
  }
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug)
}

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured)
}
