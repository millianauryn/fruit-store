export interface TasteProfile {
  sweet: number; // 1 to 5 scale
  tangy: number; // 1 to 5 scale
  fragrant: number; // 1 to 5 scale
}

export interface NutritionSpecs {
  calories: number;
  sugar: string;
  fiber: string;
  vitaminC: string;
  potassium: string;
  waterContent: string;
  benefits: string[];
}

export interface Fruit {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  unit: string;
  category: 'citrus_berries' | 'exotic_stone' | 'premium_orchard' | 'gift_bundles';
  image: string; // fallback SVG or Unsplash
  nutrition: NutritionSpecs;
  tasteProfile: TasteProfile;
  origin: string;
  stock: number;
  rating: number;
  isBestSeller?: boolean;
  colorCode: string; // Tailwind color name like "amber", "rose", "emerald" for beautiful glow rings
  iconName: string; // specific custom SVG styling in JSX
}

export interface GiftBoxItem {
  id: string;
  fruit: Fruit;
  quantity: number;
}

export interface GiftBoxConfig {
  items: GiftBoxItem[];
  crateStyle: 'rustic_wood' | 'gold_silk' | 'eco_hemp';
  giftCardText: string;
  ribbonColor: 'royal_gold' | 'emerald_green' | 'velvet_red';
  totalPrice: number;
}

export interface CartItem {
  id: string; // Fruit ID, or custom box ID
  type: 'single' | 'custom_gift_box' | 'preset_bundle';
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
  colorCode: string;
  customDetails?: {
    components: { fruitName: string; qty: number }[];
    crateStyle: string;
    cardText: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  verified: boolean;
}

export interface PRDSection {
  id: string;
  title: string;
  subtitle: string;
  content: string; // Markdown formatted description
  metrics?: { label: string; value: string }[];
}
