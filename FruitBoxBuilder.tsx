import { Fruit, Review, PRDSection } from './types';

// Export path to our premium generated main visual asset
export const HERO_IMAGE_PATH = "/src/assets/images/premium_organic_fruits_1779717809089.png";

export const FRUIT_CATALOG: Fruit[] = [
  {
    id: 'mango-01',
    name: 'Alphonso Gold Mango',
    scientificName: 'Mangifera indica',
    description: 'The global standard in mango pedigree. Revered for its buttery, fiberless saffron flesh and intense sweet aroma, each individual mango is hand-shielded to protect its velvet outer skin.',
    price: 6.99,
    unit: 'per piece',
    category: 'exotic_stone',
    image: '🥭',
    colorCode: 'amber',
    iconName: 'mango',
    origin: 'Ratnagiri Orchards, India',
    stock: 45,
    rating: 4.9,
    isBestSeller: true,
    nutrition: {
      calories: 60,
      sugar: '14g per 100g',
      fiber: '1.6g',
      vitaminC: '60% Reference Daily Intake (RDI)',
      potassium: '168mg',
      waterContent: '83%',
      benefits: ['Aids digestion with prebiotic enzymes', 'Supports eye wellness with rich Vitamin A', 'Boosts skin glow via essential carotenoids']
    },
    tasteProfile: {
      sweet: 5,
      tangy: 2,
      fragrant: 5
    }
  },
  {
    id: 'dragon-02',
    name: 'Ruby Blush Pitaya (Dragon Fruit)',
    scientificName: 'Hylocereus costaricensis',
    description: 'Vibrant scarlet skin with deep-magenta flesh. Its high betalain pigment content makes it an antioxidant marvel, offering a refreshing pear-kiwi flavor with a poppy sesame crunch.',
    price: 8.50,
    unit: 'per piece',
    category: 'exotic_stone',
    image: '🌵',
    colorCode: 'rose',
    iconName: 'dragon_fruit',
    origin: 'Cochin Coast, Vietnam',
    stock: 24,
    rating: 4.8,
    isBestSeller: false,
    nutrition: {
      calories: 52,
      sugar: '9g per 100g',
      fiber: '2.9g',
      vitaminC: '34% RDI',
      potassium: '272mg',
      waterContent: '87%',
      benefits: ['Promotes gut flora with rich prebiotics', 'Combats cellular aging with natural betalains', 'Assists oxygen transport with plant-based iron']
    },
    tasteProfile: {
      sweet: 3,
      tangy: 2,
      fragrant: 3
    }
  },
  {
    id: 'blood-orange-03',
    name: 'Moro Blood Orange',
    scientificName: 'Citrus sinensis Moro',
    description: 'Deep crimson interior with a bold citrus bite that hints of dark summer raspberries. Grown in volcanic soils, capturing the absolute height of winter sunshine.',
    price: 3.49,
    unit: 'per 500g',
    category: 'citrus_berries',
    image: '🍊',
    colorCode: 'orange',
    iconName: 'blood_orange',
    origin: 'Etna Slopes, Sicily',
    stock: 60,
    rating: 4.7,
    isBestSeller: true,
    nutrition: {
      calories: 43,
      sugar: '8.2g per 100g',
      fiber: '2.4g',
      vitaminC: '88% RDI',
      potassium: '181mg',
      waterContent: '86%',
      benefits: ['Anthocyanins shield arterial lining', 'Unrivaled collagen production catalyst', 'Lowers LDL cholesterol through flavanone content']
    },
    tasteProfile: {
      sweet: 4,
      tangy: 4,
      fragrant: 4
    }
  },
  {
    id: 'blueberry-04',
    name: 'Wild Cascade Blueberries',
    scientificName: 'Vaccinium corymbosum',
    description: 'Small, incredibly dense, and powdery-blue with natural protective bloom. Gathered during chilly mountain dawns to locking in their concentrated medicinal tang.',
    price: 7.99,
    unit: 'per 250g box',
    category: 'citrus_berries',
    image: '🫐',
    colorCode: 'blue',
    iconName: 'blueberries',
    origin: 'Oregon Highlands, USA',
    stock: 35,
    rating: 4.95,
    isBestSeller: true,
    nutrition: {
      calories: 57,
      sugar: '10g per 100g',
      fiber: '2.4g',
      vitaminC: '16% RDI',
      potassium: '77mg',
      waterContent: '84%',
      benefits: ['Enhances cognitive processing under stress', 'Protects DNA strand damage in active athletes', 'Rapid reduction of muscle soreness post-workout']
    },
    tasteProfile: {
      sweet: 3,
      tangy: 3,
      fragrant: 4
    }
  },
  {
    id: 'cherry-05',
    name: 'Rainier Sweet Cherries',
    scientificName: 'Prunus avium Rainier',
    description: 'A delicate bi-color yellow-blushed-red skin. They feature extraordinarily sweet cream-tempered flesh that contains up to 25% natural sugar content—nature’s pure confectionery candy.',
    price: 11.99,
    unit: 'per 500g box',
    category: 'exotic_stone',
    image: '🍒',
    colorCode: 'red',
    iconName: 'cherries',
    origin: 'Yakima Valley, Washington',
    stock: 20,
    rating: 4.9,
    isBestSeller: false,
    nutrition: {
      calories: 63,
      sugar: '13g per 100g',
      fiber: '2.1g',
      vitaminC: '12% RDI',
      potassium: '222mg',
      waterContent: '82%',
      benefits: ['Melatonin naturally aids circadian sleep prep', 'Highly effective natural anti-gout joint agent', 'Inhibits inflammatory COX enzymes']
    },
    tasteProfile: {
      sweet: 5,
      tangy: 1,
      fragrant: 3
    }
  },
  {
    id: 'passion-06',
    name: 'Maracujá Golden Passion Fruit',
    scientificName: 'Passiflora edulis',
    description: 'Wrinkled golden-purple armor holding deep nectar gelatin vesicles. Intensely floral and aromatic, this is a premium catalyst for modern mocktails and morning wellness bowls.',
    price: 4.25,
    unit: 'per piece',
    category: 'exotic_stone',
    image: '🟢',
    colorCode: 'yellow',
    iconName: 'passion_fruit',
    origin: 'Bahia Hinterlands, Brazil',
    stock: 40,
    rating: 4.85,
    isBestSeller: false,
    nutrition: {
      calories: 97,
      sugar: '11.2g per 100g',
      fiber: '10.4g (unrivaled!)',
      vitaminC: '50% RDI',
      potassium: '348mg',
      waterContent: '73%',
      benefits: ['Highest dietary fiber amongst orchard crops', 'Rich source of mood-calming harmala alkaloids', 'Regulates insulin sensitivity with piceatannol']
    },
    tasteProfile: {
      sweet: 2,
      tangy: 5,
      fragrant: 5
    }
  },
  {
    id: 'apple-07',
    name: 'Grown Fuji Reserve Apple',
    scientificName: 'Malus domestica Fuji',
    description: 'Crisp and satisfying snap leading to honeyed density. Individually wrapped in custom orchard paper to lock in the optimal moisture percentage before delivery.',
    price: 2.99,
    unit: 'per piece',
    category: 'premium_orchard',
    image: '🍎',
    colorCode: 'emerald',
    iconName: 'apple',
    origin: 'Aomori Sacred Slopes, Japan',
    stock: 80,
    rating: 4.75,
    isBestSeller: false,
    nutrition: {
      calories: 52,
      sugar: '10g per 100g',
      fiber: '2.4g',
      vitaminC: '8% RDI',
      potassium: '107mg',
      waterContent: '85%',
      benefits: ['Pectin fibers absorb environmental toxins', 'Slows glucose absorption dynamically', 'Quercetin reduces seasonal allergy response']
    },
    tasteProfile: {
      sweet: 4,
      tangy: 2,
      fragrant: 3
    }
  },
  {
    id: 'lemon-08',
    name: 'Bespoke Meyer Lemon',
    scientificName: 'Citrus x meyeri',
    description: 'A natural hybrid of sweet orange and mandarin. It has edible thin skin without the harsh acid bite of conventional commercial lemons, loaded with pristine herbal oils.',
    price: 1.99,
    unit: 'per piece',
    category: 'citrus_berries',
    image: '🍋',
    colorCode: 'lime',
    iconName: 'lemon',
    origin: 'Santa Barbara Coast, California',
    stock: 90,
    rating: 4.65,
    isBestSeller: false,
    nutrition: {
      calories: 29,
      sugar: '2.5g per 100g',
      fiber: '2.8g',
      vitaminC: '110% RDI',
      potassium: '138mg',
      waterContent: '89%',
      benefits: ['Deeply alkalizing to systemic body pH', 'Assists gallbladder bile flow elegantly', 'Rich d-limonene prevents gastric reflux']
    },
    tasteProfile: {
      sweet: 2,
      tangy: 4,
      fragrant: 5
    }
  }
];

export const PRESET_BUNDLES = [
  {
    id: 'bundle-01',
    name: 'Equinox Medley Gift Crate',
    description: 'The crowning gift option. An outstanding harvest blend combining Alphonso Mangos, Rainier Cherries, and Wild Cascade Blueberries. Accompanied by premium wild rosemary sprigs.',
    price: 49.99,
    unit: 'medium crate',
    image: '🎁',
    colorCode: 'amber',
    components: [
      { name: 'Alphonso Gold Mango', qty: 3 },
      { name: 'Rainier Sweet Cherries', qty: 2 },
      { name: 'Wild Cascade Blueberries', qty: 1 }
    ]
  },
  {
    id: 'bundle-02',
    name: 'Tropic Resonance Box',
    description: 'A sensory high-contrast box of volcanic ruby Pitaya, Golden Passion Fruit, and Alphonso Mangoes. Packed in standard luxury Royal Gold raw silk cushion wrapper.',
    price: 58.50,
    unit: 'luxury box',
    image: '🏝️',
    colorCode: 'rose',
    components: [
      { name: 'Alphonso Gold Mango', qty: 4 },
      { name: 'Ruby Blush Pitaya (Dragon Fruit)', qty: 3 },
      { name: 'Maracujá Golden Passion Fruit', qty: 2 }
    ]
  },
  {
    id: 'bundle-03',
    name: 'Solstice Citrus Detox Crate',
    description: 'The ultimate nutritional boost. Features volcanic-soil Blood Oranges, Meyer Lemons, and structural ginger roots. Beautifully framed in natural eco-friendly rustic raffia padding.',
    price: 36.00,
    unit: 'wooden basket',
    image: '🌿',
    colorCode: 'orange',
    components: [
      { name: 'Moro Blood Orange', qty: 6 },
      { name: 'Bespoke Meyer Lemon', qty: 6 }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Eleanor Vance',
    rating: 5,
    text: 'My corporate clients were astonished by the presentation. The Alphonso Mango smelled like fresh honey and arrived perfectly cooled. The custom Gold Silk layout inside the crate represents pure luxury.',
    date: '3 weeks ago',
    avatar: '👩',
    verified: true
  },
  {
    id: 'rev-02',
    author: 'Dr. Alistair Sterling',
    rating: 5,
    text: 'I buy the Solstice Citrus bundle every fortnight. Meyer Lemons are completely organic and the Moro oranges has that incredible volcano-mineral flavor profile. Seamless trace of exact origin orchards.',
    date: '1 week ago',
    avatar: '👨',
    verified: true
  }
];

export const PRD_DATA: PRDSection[] = [
  {
    id: 'prd-exec',
    title: '1. Product Vision & Market Problem',
    subtitle: 'Elevating fruit purchase from standard utility to meaningful wellness gifting.',
    content: `### Absolute Product Goal
SunRipe Fruit Boutique solves the "commodity problem" of grocery retail. Conventional commerce treats organic fruit as simple high-churn bulk items, compromising quality and environmental tracing. SunRipe positions fruit as **seasonal high-ticket visual poetry, premium giftware, and active wellness catalysts**.

### Core Value Propositions
* **Traceable Heritage**: Every fruit is linked to its historic volcanic, high-altitude, or coastal coastal orchard.
* **Gift-first Infrastructure**: Built-in 3D-styled wooden crate box simulator for personalized gifting wrappers.
* **Nutrient Scorecards**: Rich chemical specs (Melatonin, Anthocyanins, Limonene) displayed to target high-intent biohackers, athletes, and wellness connoisseurs.
`,
    metrics: [
      { label: 'Target Average Order Value (AOV)', value: '$55.00' },
      { label: 'Customer Acquisition Cost (CAC)', value: '$12.00 (via organic aesthetics)' }
    ]
  },
  {
    id: 'prd-personas',
    title: '2. Customer Persona Profiles',
    subtitle: 'Tailored paths for luxury gifting, performance nutrition, and aesthetic discovery.',
    content: `### High-Tier Persona Matrix

#### A. The Luxury Executive Gifter (Aesthetic-First)
* **Goal**: Provide an impressive, high-status healthy corporate gift that stands out from typical wine or chocolates.
* **Pain points**: Standard generic packaging, damaged fruit in transit, sterile aesthetic.
* **SunRipe UX Solution**: Bespoke "Gift Box Builder" with luxury wrap selections (Royal Gold Silk etc.).

#### B. The Biohacker & Wellness Connoisseur (Specs-First)
* **Goal**: Optimize physical recovery, circadian rhythms, or cellular antioxidants with exact species profiles.
* **Pain points**: Vague organic tags, zero information on antioxidant count, missing micronutrient scales.
* **SunRipe UX Solution**: Transparent nutrient cards highlighting active enzymes (D-Limonene, Pectins, Anthocyanins) paired with a clear sweet/tangy/fragrant radar slider.
`
  },
  {
    id: 'prd-features',
    title: '3. Functional Requirements (Phase 1)',
    subtitle: 'Engineering parameters for interactive design components.',
    content: `### Direct Engineering Spec

| Feature Area | Priority | Specific Behavior | Implementation Protocol |
| :--- | :--- | :--- | :--- |
| **Aesthetic Catalog** | High | Fluid card grid, color-coded ambient drop-shadow, dynamic category filtration. | React Tailwind standard tags with premium transitions. |
| **Nutritional Drawer** | High | Visual Sweet/Tangy/Fragrant radar and active botanical health bullet points. | Responsive relative percentage bars with high-contrast color keys. |
| **Custom DIY Crate Builder** | High | Select wrapper (Silk, Raffia, Hemp), click to append fruits, and monitor volumetric capacity. | Live recalculating state arrays supporting custom gift cards. |
| **Interactive Cart & Receipts** | High | Slideout drawer, schedule date picker, promo code logic, and a secure printable canvas receipt. | Responsive checkouts that generate simulated high-end serial receipts. |
`
  },
  {
    id: 'prd-nonfunc',
    title: '4. Non-Functional Specifications',
    subtitle: 'System boundaries for security, speed, and responsiveness.',
    content: `### Engineering Quality Safeguards
* **Performance Speed**: Maximum Interaction-to-Next-Paint (INP) under 100ms. Animated panels utilizing optimized layout hardware acceleration.
* **Responsive Fluidity**: Double column layouts on desktop reverting gracefully to single-column swipe grids on mobile. Touch targets are systematically constrained to at least **44x44px**.
* **Zero Api Key Exposure**: Safe local catalog state containing zero sensitive variables.
* **Theme Stability**: Locked to a high-contrast warm organic theme (Alabaster neutral tone and emerald greens) to protect organic authenticity and remove distracting dark-mode clashes.
`
  }
];
