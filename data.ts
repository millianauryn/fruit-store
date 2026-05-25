import React, { useState, useMemo } from 'react';
import { FRUIT_CATALOG, PRESET_BUNDLES, REVIEWS, HERO_IMAGE_PATH } from './data';
import { Fruit, CartItem } from './types';
import FruitCard from './components/FruitCard';
import FruitBoxBuilder from './components/FruitBoxBuilder';
import NutritionModal from './components/NutritionModal';
import CartSidebar from './components/CartSidebar';
import { 
  ShoppingCart, Search, Sparkles, Sprout, Compass, ShieldCheck, 
  ChevronRight, ArrowRight, Star, Heart, Leaf, HelpCircle, Gift 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  // Premium Obsidian Black / Alabaster Light theme mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('sunripe-dark-theme') === 'true';
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const nextVal = !prev;
      localStorage.setItem('sunripe-dark-theme', String(nextVal));
      return nextVal;
    });
  };

  // Core application lists
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modals & Panels visibility
  const [activeSpecFruit, setActiveSpecFruit] = useState<Fruit | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Computed Cart metrics
  const totalCartQty = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]);

  // Handle direct custom or individual fruit insertion
  const triggerNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleAddFruitToCart = (fruit: Fruit) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === fruit.id && item.type === 'single');
      if (existing) {
        return prev.map(item => 
          item.id === fruit.id && item.type === 'single'
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: fruit.id,
          type: 'single',
          name: fruit.name,
          price: fruit.price,
          quantity: 1,
          image: fruit.image,
          unit: fruit.unit,
          colorCode: fruit.colorCode
        }];
      }
    });
    triggerNotification(`Gently packed 1 unit of ${fruit.name} into your crate.`);
  };

  const handleAddBundleToCart = (bundle: typeof PRESET_BUNDLES[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === bundle.id && item.type === 'preset_bundle');
      if (existing) {
        return prev.map(item => 
          item.id === bundle.id && item.type === 'preset_bundle'
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: bundle.id,
          type: 'preset_bundle',
          name: bundle.name,
          price: bundle.price,
          quantity: 1,
          image: bundle.image,
          unit: bundle.unit,
          colorCode: bundle.colorCode
        }];
      }
    });
    triggerNotification(`Luxury Crate "${bundle.name}" appended to shopping basket.`);
  };

  const handleAddCustomBoxToCart = (boxItem: CartItem) => {
    setCart(prev => [...prev, boxItem]);
    triggerNotification(`Bespoke hand-wrapped gift crate loaded successfully.`);
  };

  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // ADVANCED FILTER & SEARCH logic matching medical metrics
  const filteredFruits = useMemo(() => {
    return FRUIT_CATALOG.filter(fruit => {
      // Category match
      const cMatch = selectedCategory === 'all' || fruit.category === selectedCategory;
      
      // Search query string validation (matching name, scientific profile or benefits)
      const query = searchQuery.trim().toLowerCase();
      if (!query) return cMatch;

      const nameMatch = fruit.name.toLowerCase().includes(query);
      const sciMatch = fruit.scientificName.toLowerCase().includes(query);
      const originMatch = fruit.origin.toLowerCase().includes(query);
      const benefitsMatch = fruit.nutrition.benefits.some(b => b.toLowerCase().includes(query));

      return cMatch && (nameMatch || sciMatch || originMatch || benefitsMatch);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 selection:bg-emerald-100 selection:text-emerald-950 ${isDarkMode ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      
      {/* GLOBAL TOAST NOTIFICATION BANNER */}
      {showNotification && (
        <div className="fixed bottom-6 left-6 z-50 p-4 bg-stone-900 border border-stone-800 rounded-2xl shadow-xl max-w-sm flex items-center gap-3 animate-slide-up text-white font-mono text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="flex-1 leading-normal">{showNotification}</span>
          <button 
            onClick={() => setShowNotification(null)}
            className="text-stone-500 hover:text-stone-300 font-extrabold text-[10px]"
          >
            ✕
          </button>
        </div>
      )}

      {/* HEADER NAVIGATION */}
      <header id="main-header" className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-850/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-2.5">
            <span className="text-3xl select-none" role="img" aria-label="store-logo">🌿</span>
            <div>
              <span className="block font-serif text-lg font-black text-stone-950 dark:text-white leading-none">
                SunRipe
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-[#15803d] dark:text-emerald-400 uppercase leading-none mt-1">
                ORGANIC FRUIT BOUTIQUE
              </span>
            </div>
          </div>

          {/* Quick link navigation on desktop */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider font-semibold text-stone-500 dark:text-stone-400">
            <a href="#hero-section" className="hover:text-[#15803d] dark:hover:text-emerald-450 transition-colors">PHILOSOPHY</a>
            <a href="#gifting-studio" className="hover:text-[#15803d] dark:hover:text-emerald-450 transition-colors">ARTISAN GIFT STUDIO</a>
            <a href="#store-grid" className="hover:text-[#15803d] dark:hover:text-emerald-450 transition-colors">ACTIVE CATALOG</a>
            <a href="#curated-bundles" className="hover:text-[#15803d] dark:hover:text-emerald-450 transition-colors">PRESETS</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* BLACK/DARK MODE TOGGLE BUTTON */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              className="h-11 w-11 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Toggle Black Mode"
              title={isDarkMode ? "Active Alabaster Light Mode" : "Activate Obsidian Black Mode"}
            >
              {isDarkMode ? (
                <span className="text-lg">☀️</span>
              ) : (
                <span className="text-lg">🌙</span>
              )}
            </button>

            {/* Checkout cart link indicator */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative h-11 px-5 border border-stone-200 dark:border-stone-800 hover:border-emerald-800 dark:hover:border-emerald-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 group shadow-sm"
              aria-label="Open your basket"
            >
              <ShoppingCart size={15} className="group-hover:text-emerald-800 dark:group-hover:text-emerald-500 transition-colors" />
              <span className="font-mono text-xs font-bold leading-none">Your Crate</span>
              {totalCartQty > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-emerald-800 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow shadow-emerald-900/20">
                  {totalCartQty}
                </span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-stone-300 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-colors" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* BODY CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
        
        {/* HERO FEATURE SPOTIFY COMPONENT - Utilizing generated high-end visual */}
        <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/80 p-6 md:p-10 rounded-3xl shadow-xs overflow-hidden relative">
          {/* Subtle ambient lighting reflections */}
          <div className="absolute -left-20 top-1/2 w-72 h-72 rounded-full bg-amber-400 blur-3xl opacity-10 ambient-glow" />
          <div className="absolute -right-20 top-0 w-72 h-72 rounded-full bg-emerald-500 blur-3xl opacity-10 ambient-glow" />

          {/* LEFT COLUMN: Deep content text */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/35 text-emerald-800 dark:text-emerald-400 font-mono text-[9px] uppercase font-bold tracking-widest rounded-full border border-emerald-200 dark:border-emerald-800/60">
              <Sparkles size={11} className="animate-pulse text-emerald-700 dark:text-emerald-450" />
              Direct From Volcanic & Forest Soils
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-white tracking-tight leading-none">
              Nourishment styled with <br />
              <span className="italic font-normal text-emerald-800 dark:text-emerald-400 underline decoration-amber-400 dark:decoration-amber-300 decoration-wavy pl-1">editorial grace</span>.
            </h1>

            <p className="max-w-xl text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
              We treat rare organic fruit specimens not as bulk commodities, but as biological artwork. Sourced from small micro-climate family orchards, hand-shielded individually, and shipped cooled to protect peak antioxidant levels of your cells. Matches custom wrapping for spectacular corporate and family gifting.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="#store-grid"
                className="h-12 px-6 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/10 transition-colors duration-200"
              >
                <span>Explore Botanical Specs Catalog</span>
                <ChevronRight size={14} />
              </a>
              <a
                href="#gifting-studio"
                className="h-12 px-6 bg-stone-900 hover:bg-stone-950 dark:bg-stone-850 dark:hover:bg-stone-800 text-white rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200"
              >
                <Gift size={14} />
                <span>Assemble A Custom Gift Crate</span>
              </a>
            </div>

            {/* Quick value badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100 dark:border-stone-850 max-w-lg">
              <div>
                <span className="block text-lg font-serif font-bold text-stone-900 dark:text-white leading-none">100%</span>
                <span className="block text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase mt-1">Chemical-Free</span>
              </div>
              <div className="border-l border-stone-200 dark:border-stone-800 pl-4">
                <span className="block text-lg font-serif font-bold text-stone-900 dark:text-white leading-none">-18°C</span>
                <span className="block text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase mt-1">Thermo Control</span>
              </div>
              <div className="border-l border-stone-200 dark:border-stone-800 pl-4">
                <span className="block text-lg font-serif font-bold text-stone-900 dark:text-white leading-none">Trace</span>
                <span className="block text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase mt-1">Direct Orchard</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The stunning generated hero photograph */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shadow-lg aspect-square relative group">
              <img 
                src={HERO_IMAGE_PATH} 
                alt="Premium fresh biological fruits collage in high-end studio lighting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                onError={(e) => {
                  // Fallback safe graphics container if background fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              {/* Overlay styling for extra premium touch */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-extrabold block">ORCHARD COVER SHOT</span>
                  <span className="text-xs font-serif font-extrabold text-stone-850 dark:text-stone-100 mt-0.5 block">SunRipe Botanical Assortment</span>
                </div>
                <span className="text-xs font-mono bg-stone-150 dark:bg-stone-800 px-2 py-0.5 rounded-md text-stone-600 dark:text-stone-300 font-bold border border-stone-200 dark:border-stone-750">
                  Aomori 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS BENTO GRID SUMMARY */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/80 rounded-2xl shadow-xs space-y-2">
            <span className="text-3xl select-none" role="img" aria-label="p1">🌡️</span>
            <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-white">Thermally Sealed Dispatch</h4>
            <p className="text-xs text-stone-500 dark:text-stone-300 leading-relaxed font-sans">
              Each order travels encapsulated in honeycomb paper cells surrounded of cooled, non-toxic bio-gel sheets.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/80 rounded-2xl shadow-xs space-y-2">
            <span className="text-3xl select-none" role="img" aria-label="p2">🌍</span>
            <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-white">Micro-Orchard Purity</h4>
            <p className="text-xs text-stone-500 dark:text-stone-300 leading-relaxed font-sans">
              We list the exact coordinate and farmer heritage of each batch, bypass complex global bulk distributors.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/80 rounded-2xl shadow-xs space-y-2">
            <span className="text-3xl select-none" role="img" aria-label="p3">🧪</span>
            <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-white">High-Antioxidant Sourcing</h4>
            <p className="text-xs text-stone-500 dark:text-stone-300 leading-relaxed font-sans">
              We prioritize physical recovery species like volcanic Moro oranges rich in tissue shielding anthocyanins.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/80 rounded-2xl shadow-xs space-y-2">
            <span className="text-3xl select-none" role="img" aria-label="p4">♻️</span>
            <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-white">Zero-Polyester Gifting</h4>
            <p className="text-xs text-stone-500 dark:text-stone-300 leading-relaxed font-sans">
              We pack strictly using recycled solid cedarwood crate boxes, real satin silk wraps, and biodegradable hemp fibers.
            </p>
          </div>
        </section>

        {/* ACTIVE BOUTIQUE CATALOG & PRODUCTS */}
        <section id="store-grid" className="space-y-6 pt-10">
          
          {/* SECTION HEADER AND CONTROL PANEL */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-5">
            <div>
              <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-extrabold">Active Specimen Storefront</span>
              <h2 className="text-3xl font-serif font-black text-stone-950 dark:text-white mt-1">
                The Sun-Cured Catalog
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Query specimens by name, scientific lineage, or micro-nutrition benefits.
              </p>
            </div>

            {/* SEARCH AND FILTERS BUTTON BAR */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              
              {/* Intelligent Benefit search */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="fruit-catalog-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query e.g., 'vitamin C', 'anitoxidant', 'fuji'..."
                  className="pl-9 pr-6 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 focus:border-stone-400 dark:focus:border-stone-550 focus:ring-0 text-stone-850 dark:text-white text-xs rounded-xl w-full sm:w-64 font-mono shadow-xs"
                />
              </div>

              {/* Category tabs */}
              <div className="bg-stone-200/60 dark:bg-stone-900/80 p-0.5 rounded-xl border border-stone-200 dark:border-stone-800 flex text-[11px] font-mono">
                {[
                  { id: 'all', label: 'All Samples' },
                  { id: 'citrus_berries', label: 'Citrus & Berries' },
                  { id: 'exotic_stone', label: 'Exotic & Stone' },
                  { id: 'premium_orchard', label: 'Orchard Fruits' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    id={`cat-filter-tab-${tab.id}`}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      selectedCategory === tab.id
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white font-bold shadow-xs'
                        : 'text-stone-500 dark:text-stone-450 hover:text-stone-850 dark:hover:text-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* ACTIVE GRID MAPPED */}
          {filteredFruits.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/80 rounded-2xl">
              <span className="text-4xl animate-pulse">🌾</span>
              <h4 className="text-sm font-serif font-bold text-stone-800 dark:text-stone-200 mt-3">No matching botanical spec</h4>
              <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1 leading-normal">
                No active fruit matches "{searchQuery}". Try searching for scientific properties like "Mangifera", bioactive tags like "digestion" or generic names.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 px-4 py-2 border border-stone-250 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 font-mono text-[11px] text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {filteredFruits.map((fruit) => (
                <FruitCard
                  key={fruit.id}
                  fruit={fruit}
                  onSelect={(f) => setActiveSpecFruit(f)}
                  onAddToCart={handleAddFruitToCart}
                />
              ))}
            </div>
          )}

        </section>

        {/* CUSTOM ARTISAN DIY GIFT CRATE BUILDER */}
        <section id="gifting-studio" className="pt-8">
          <div className="mb-6">
            <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-extrabold block">Bespoke Gifting Studio</span>
            <h2 className="text-3xl font-serif font-black text-stone-950 dark:text-white mt-1">Design A Natural Expression</h2>
            <p className="text-xs text-stone-550 dark:text-stone-400 max-w-xl mt-1">
              Perfect for anniversary milestones, corporate client retention, or wellness encouragement. Handpack cedarwood boxes with premium custom ribbons and cards.
            </p>
          </div>
          <FruitBoxBuilder onAddBoxToCart={handleAddCustomBoxToCart} />
        </section>

        {/* PREMIUM PRESET PACKAGES CAROUSEL */}
        <section id="curated-bundles" className="space-y-6 bg-emerald-500/5 dark:bg-emerald-950/5 border border-emerald-500/10 dark:border-emerald-950/20 p-6 md:p-8 rounded-3xl">
          <div>
            <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-extrabold block">Orchard Curations</span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-stone-950 dark:text-white mt-1">
              Bespoke Signature Bundles
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Pre-packed in natural packaging to capture seasonal sensory harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESET_BUNDLES.map((bundle) => (
              <div 
                key={bundle.id}
                id={`bundle-card-${bundle.id}`}
                className="bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all group duration-300"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-4xl select-none" role="img" aria-label="bundle logo">{bundle.image}</span>
                    <span className="text-[9px] font-mono bg-amber-50 dark:bg-amber-950/20 rounded-full border border-amber-250 dark:border-amber-900/40 text-amber-800 dark:text-amber-400 font-bold px-2.5 py-0.5 tracking-wider uppercase">
                      Orchard Preset
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-black text-stone-850 dark:text-stone-200 mt-4 leading-snug group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                    {bundle.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-2">
                    {bundle.description}
                  </p>

                  {/* Components breakdown */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap gap-2 text-[10px] font-mono">
                    {bundle.components.map((c, idx) => (
                      <span key={idx} className="bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md border border-stone-150 dark:border-stone-800">
                        • {c.name.split(' ')[0]} (x{c.qty})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest">ECO-MEDLEY BUNDLE</span>
                    <span className="text-2xl font-serif font-black text-stone-900 dark:text-white">${bundle.price.toFixed(2)}</span>
                  </div>

                  <button
                    id={`bundle-buy-${bundle.id}`}
                    onClick={() => handleAddBundleToCart(bundle)}
                    className="h-10 px-4 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-xl font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Load Bundle</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL TESTIMONIAL REVIEWS */}
        <section className="space-y-6">
          <div className="text-center max-w-md mx-auto">
            <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest block font-bold">Verifiable Social Trace</span>
            <h2 className="text-2xl font-serif font-black text-stone-950 dark:text-white mt-1">Praise From The Table</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/80 p-6 rounded-2xl shadow-xs relative">
                <span className="absolute -top-3.5 left-6 text-3xl opacity-15 font-serif font-black text-stone-800 dark:text-stone-400">“</span>
                <div className="flex gap-1.5 text-amber-400 mb-2.5">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={13} className="fill-current" />)}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans mb-4">
                  {rev.text}
                </p>
                <div className="flex items-center gap-3 border-t border-stone-100 dark:border-stone-800 pt-3">
                  <span className="text-2xl bg-stone-50 dark:bg-stone-950 h-8 w-8 rounded-full flex items-center justify-center select-none">{rev.avatar}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-stone-850 dark:text-stone-200">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 rounded" title="Verified specimen buyer">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500">{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



      </main>

      {/* FOOTER */}
      <footer id="main-footer" className="bg-stone-900 border-t border-stone-850 text-white py-12 mt-20 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl select-none" role="img" aria-label="logo footer">🌿</span>
              <span className="font-serif text-base font-bold text-white uppercase tracking-wider">SunRipe Orchards</span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm text-[11px]">
              Nature’s luxury, harvested with scientific tracing. Free cold-gel cargo dispatch on all bookings exceeding forty US dollars. Hand-assembled under clean protocols.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">BOUTIQUE LOCATIONS</span>
            <p className="text-stone-400 text-[11px]">
              • Seattle Reserve Orchards, WA, USA<br />
              • Santa Barbara Coastal Depot, CA, USA<br />
              • Aomori Premium Sorting Labs, Japan
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">HEALTH & SOIL NEWSLETTER</span>
            <div className="flex gap-2">
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Submit your botanical email..." 
                className="bg-stone-950 border border-stone-800 text-xs px-3 py-2 rounded-xl flex-1 text-stone-250 font-mono focus:border-stone-500 focus:ring-0" 
              />
              <button 
                onClick={() => setShowNotification("Premium bulletin registered down to Volcanic Soil news! Welcome.")}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-xl transition-colors"
              >
                Join
              </button>
            </div>
            <span className="block text-[9px] text-stone-500">
              Weekly bulletins detailing micro-enzymes, volcanic soil yields, and seasonal harvests.
            </span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-850 mt-12 pt-6 flex flex-col sm:flex-row justify-between text-[10px] text-stone-500 leading-normal">
          <span>COMPLIANCE STANDARD: ISO 22000 (ORGANIC CERTIFIED SYSTEMS)</span>
          <span className="mt-2 sm:mt-0">SUNRIPE FRUIT TRADING COMPANY INC © 2026. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

      {/* FIXED FLOATING ACTIONS - Cart Sidebar drawer and Nutrition Modals */}
      <NutritionModal
        fruit={activeSpecFruit}
        onClose={() => setActiveSpecFruit(null)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
