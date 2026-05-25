import { useState } from 'react';
import { Fruit, GiftBoxConfig, GiftBoxItem, CartItem } from '../types';
import { FRUIT_CATALOG } from '../data';
import { Sparkles, Trash2, Gift, Check, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface FruitBoxBuilderProps {
  onAddBoxToCart: (cartItem: CartItem) => void;
}

export default function FruitBoxBuilder({ onAddBoxToCart }: FruitBoxBuilderProps) {
  // Config states
  const [items, setItems] = useState<GiftBoxItem[]>([]);
  const [crateStyle, setCrateStyle] = useState<'rustic_wood' | 'gold_silk' | 'eco_hemp'>('rustic_wood');
  const [ribbonColor, setRibbonColor] = useState<'royal_gold' | 'emerald_green' | 'velvet_red'>('royal_gold');
  const [giftCardText, setGiftCardText] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Constants
  const MAX_CAPACITY = 8; // maximum fruit slots to avoid crushing
  const PACKAGING_FEE = 12.00; // premium materials fee

  // Computed Values
  const currentQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const currentFruitsPrice = items.reduce((acc, curr) => acc + (curr.fruit.price * curr.quantity), 0);
  const totalPrice = currentFruitsPrice > 0 ? currentFruitsPrice + PACKAGING_FEE : 0;

  // Add fruit to builder
  const handleAddFruit = (fruit: Fruit) => {
    if (currentQuantity >= MAX_CAPACITY) {
      alert("Snug fit! We limit our boutique boxes to 8 premium fruits to prevent delicate fruits from touching and bruising in temperature-controlled transit.");
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.fruit.id === fruit.id);
      if (existing) {
        return prev.map(item => 
          item.fruit.id === fruit.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { id: `diy-${fruit.id}`, fruit, quantity: 1 }];
      }
    });
  };

  // Remove one unit of fruit
  const handleRemoveFruitUnit = (fruitId: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.fruit.id === fruitId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter(item => item.fruit.id !== fruitId);
      } else {
        return prev.map(item => 
          item.fruit.id === fruitId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
    });
  };

  // Clear Entire Box Builders
  const handleClear = () => {
    setItems([]);
    setGiftCardText('');
  };

  // Compile box details & add to Cart
  const handleAssembleAndCart = () => {
    if (items.length === 0) {
      alert("Your gift crate is empty! Add sweet individual fruits to begin assembly.");
      return;
    }

    // Prepare components listing for Cart detail
    const componentList = items.map(item => ({
      fruitName: item.fruit.name,
      qty: item.quantity
    }));

    // Text mapping for presentation
    const crateNameMap = {
      rustic_wood: 'Cedarwood Orchard Box',
      gold_silk: 'Royal Gold Silk Case',
      eco_hemp: 'Eco-Hemp Biodegradable Crate'
    };

    const cartItem: CartItem = {
      id: `custom-gift-box-${Date.now()}`,
      type: 'custom_gift_box',
      name: `Bespoke ${crateNameMap[crateStyle]}`,
      price: totalPrice,
      quantity: 1,
      image: '🎁',
      unit: 'crate combo',
      colorCode: 'amber',
      customDetails: {
        components: componentList,
        crateStyle: crateStyle,
        cardText: giftCardText || 'Handpicked organic wellness wishes!'
      }
    };

    onAddBoxToCart(cartItem);
    
    // Success animation triggered
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      handleClear();
    }, 2800);
  };

  return (
    <div id="diy-giftbox-builder" className="bg-stone-50 dark:bg-stone-900/30 border border-stone-200/60 dark:border-stone-800/80 p-6 md:p-8 rounded-3xl shadow-sm">
      <div className="max-w-4xl mx-auto">
        
        {/* Visual Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 font-mono text-[10px] uppercase font-bold tracking-widest rounded-full border border-amber-200 dark:border-amber-850/40 mb-2">
              <Sparkles size={11} className="animate-pulse" />
              Interactive Lab
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-black text-stone-900 dark:text-white">
              The Artisan Crate Builder
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              Select premium wrappers, write deep wishes, and handpick top specimens.
            </p>
          </div>
          
          {items.length > 0 && (
            <button
              id="clear-builder-btn"
              onClick={handleClear}
              className="px-3 py-1.5 border border-stone-200 dark:border-stone-800 hover:border-red-200 dark:hover:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/10 text-stone-500 dark:text-stone-400 hover:text-red-700 dark:hover:text-red-400 font-mono text-[11px] rounded-lg transition-colors flex items-center gap-1"
            >
              <Trash2 size={13} />
              Reset Studio
            </button>
          )}
        </div>

        {/* Builder Studio Inner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5 COLUMNS: Custom Visual Blueprint & Crate settings */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* VIRTUAL CRATE VIEW */}
            <div className="relative bg-amber-50/20 dark:bg-amber-950/10 border-2 border-dashed border-amber-600/35 rounded-2xl p-5 overflow-hidden shadow-inner flex flex-col justify-between min-h-[340px]">
              {/* Outer dynamic border color based on package choice */}
              <div className={`absolute inset-0.5 rounded-xl border pointer-events-none transition-all duration-300 ${
                crateStyle === 'gold_silk' ? 'border-amber-400 bg-amber-500/5' :
                crateStyle === 'eco_hemp' ? 'border-emerald-600/20 bg-emerald-600/5' :
                'border-stone-400/30'
              }`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900/70 dark:text-amber-400/80">
                    VIRTUAL ASSORTMENT
                  </span>
                  
                  {/* Snug capacity tracker */}
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full font-bold transition-colors ${
                    currentQuantity === MAX_CAPACITY ? 'bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-400' :
                    currentQuantity > 0 ? 'bg-amber-100 dark:bg-amber-900/35 text-amber-900 dark:text-amber-300' :
                    'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                  }`}>
                    {currentQuantity} / {MAX_CAPACITY} Fruits
                  </span>
                </div>

                {/* Display Fruit Grid inside the Box */}
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="text-4xl animate-bounce mb-3 select-none">🧺</span>
                    <span className="block text-xs font-mono text-amber-900/60 dark:text-amber-400/80 font-semibold uppercase">The basket is empty</span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-450 font-sans mt-1 max-w-[200px]">
                      Select fruits on the right to place them gently into the box.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-3 mt-6">
                    {items.map((item) => (
                      <div 
                        key={item.id} 
                        className="group relative bg-white/70 dark:bg-stone-900/80 backdrop-blur-xs border border-amber-200/50 dark:border-amber-900/25 p-2.5 rounded-xl shadow-xs hover:shadow transition-shadow flex flex-col items-center justify-center"
                      >
                        {/* Remove single fruit bubble */}
                        <button
                          onClick={() => handleRemoveFruitUnit(item.fruit.id)}
                          className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-full text-[9px] text-stone-600 dark:text-stone-300 font-extrabold flex items-center justify-center border border-stone-200 dark:border-stone-700"
                        >
                          ✕
                        </button>
                        <span className="text-3xl select-none" role="img" aria-label={item.fruit.name}>
                          {item.fruit.image}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-stone-700 dark:text-stone-300 truncate max-w-full text-center mt-1">
                          {item.fruit.name.split(' ')[0]}
                        </span>
                        <span className="text-[10px] font-mono bg-amber-100/60 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-sm font-bold text-amber-900 dark:text-amber-300 mt-1">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative Ribbon Wrap Representation at the bottom */}
              <div className="relative z-10 pt-4 border-t border-stone-200/40 dark:border-stone-800 mt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-500 dark:text-stone-450">Ribbon Knot:</span>
                <span className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${
                    ribbonColor === 'royal_gold' ? 'bg-amber-400' :
                    ribbonColor === 'emerald_green' ? 'bg-emerald-600' :
                    'bg-red-600'
                  }`} />
                  <span className="text-stone-700 dark:text-stone-300 font-bold capitalize">{ribbonColor.replace('_', ' ')}</span>
                </span>
              </div>
            </div>

            {/* PACKAGE STYLER SELECTORS */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  1. SELECT BOX WRAPPER STYLE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { style: 'rustic_wood', label: 'Cedarwood Crate', desc: 'Crafted solid wood' },
                    { style: 'gold_silk', label: 'Gold Saffron Silk', desc: 'Satin gloss sheets' },
                    { style: 'eco_hemp', label: 'Eco Organic Hemp', desc: 'Biodegradable twine' }
                  ].map((cfg) => (
                    <button
                      key={cfg.style}
                      id={`crate-style-${cfg.style}`}
                      onClick={() => setCrateStyle(cfg.style as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        crateStyle === cfg.style
                          ? 'border-emerald-800 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900/40 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <span className="block text-xs font-bold text-stone-800 dark:text-white">{cfg.label}</span>
                      <span className="block text-[9px] text-stone-400 dark:text-stone-500 font-mono mt-0.5">{cfg.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIBBON DECOR SELECTORS */}
              <div>
                <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  2. ATTACH VELVET DECORATIVE RIBBON
                </label>
                <div className="flex gap-4">
                  {[
                    { color: 'royal_gold', label: 'Gold Saffron', bg: 'bg-amber-400' },
                    { color: 'emerald_green', label: 'Fir Emerald', bg: 'bg-emerald-600' },
                    { color: 'velvet_red', label: 'Royal Crimson', bg: 'bg-red-600' }
                  ].map((rib) => (
                    <button
                      key={rib.color}
                      id={`ribbon-color-${rib.color}`}
                      onClick={() => setRibbonColor(rib.color as any)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                        ribbonColor === rib.color
                          ? 'border-emerald-800 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 ring-1 ring-emerald-800/10'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900/40 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${rib.bg}`} />
                      {rib.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* WISHLIST GIFT CARD TEXTAREA */}
              <div>
                <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 flex justify-between">
                  <span>3. HAND-INKED WISHLIST CARD</span>
                  <span className="text-[10px] text-stone-400 dark:text-stone-500 capitalize">{giftCardText.length}/120 chars</span>
                </label>
                <textarea
                  id="gift-card-textarea"
                  value={giftCardText}
                  onChange={(e) => setGiftCardText(e.target.value.substring(0, 120))}
                  placeholder="E.g., Sending cozy wishes of pristine health directly from organic soils! Share the joy of SunRipe."
                  className="w-full h-20 p-3 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 rounded-xl focus:border-stone-400 dark:focus:border-stone-700 focus:ring-0 resize-none font-serif placeholder-stone-400 dark:placeholder-stone-650"
                />
              </div>
            </div>

          </div>

          {/* RIGHT 7 COLUMNS: Fruit Specimen Picker & Core pricing */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="block text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                4. CHOOSE FROM ACTIVE SPECIMENS (TAP TO ADD)
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FRUIT_CATALOG.map((fruit) => {
                  const alreadyCount = items.find(i => i.fruit.id === fruit.id)?.quantity || 0;
                  return (
                    <button
                      key={fruit.id}
                      id={`builder-add-${fruit.id}`}
                      onClick={() => handleAddFruit(fruit)}
                      className={`group relative text-left p-3.5 bg-white dark:bg-stone-900 border rounded-xl transition-all flex items-center gap-3 ${
                        alreadyCount > 0 
                          ? 'border-amber-300 dark:border-amber-600 ring-2 ring-amber-400/10' 
                          : 'border-stone-200/80 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50/40 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      <span className="text-3.5xl group-hover:scale-110 transition-transform select-none">
                        {fruit.image}
                      </span>
                      <div className="min-w-0">
                        <span className="block font-serif font-bold text-stone-800 dark:text-stone-100 truncate leading-tight group-hover:text-stone-950 dark:group-hover:text-white">
                          {fruit.name.replace('Alphonso ', '').replace('Ruby Blush ', '').replace('Wild Cascade ', '').replace('Bespoke ', '')}
                        </span>
                        <span className="block text-[10px] font-mono text-stone-400 dark:text-stone-500 mt-0.5">
                          ${fruit.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Display floating counter bubble */}
                      {alreadyCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 h-4.5 min-w-4.5 px-1 bg-amber-500 text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center border border-white dark:border-stone-800">
                          {alreadyCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRICE STATEMENT SHEET & BUILD SUMMARY */}
            <div className="bg-stone-100 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 p-5 rounded-2xl">
              <h4 className="text-xs font-mono text-stone-500 dark:text-stone-450 uppercase tracking-widest mb-3 pb-2 border-b border-stone-200/60 dark:border-stone-800">
                BOX BREAKDOWN STATEMENT
              </h4>
              
              <div className="space-y-2 text-xs font-mono text-stone-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Standard Organic Materials Fee:</span>
                  <span>${PACKAGING_FEE.toFixed(2)}</span>
                </div>
                {items.length > 0 && (
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 italic pl-3 border-l border-stone-200 dark:border-stone-800">
                    <span>
                      Fruit specimens load ({currentQuantity} pcs):
                    </span>
                    <span>${currentFruitsPrice.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 border-t border-dashed border-stone-300 dark:border-stone-750 text-stone-800 dark:text-white font-bold">
                  <span className="flex items-center gap-1">
                    ESTIMATED TOTAL:
                    <Info size={12} className="text-stone-400 dark:text-stone-500 cursor-help" title="Includes protective gel-packs and wooden basket." />
                  </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* ACTION: ASSEMBLE & ADD TO MASTER CART */}
              <div className="mt-5">
                {successAnimation ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-emerald-800 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-mono text-xs font-bold shadow"
                  >
                    <Check size={14} className="animate-ping" />
                    <span>BOX SUCCESSFULLY ASSEMBLED & WRAPPED!</span>
                  </motion.div>
                ) : (
                  <button
                    id="finish-assembly-btn"
                    onClick={handleAssembleAndCart}
                    disabled={items.length === 0}
                    className={`w-full py-3 px-4 font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                      items.length === 0
                        ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
                        : 'bg-stone-900 dark:bg-stone-100 hover:bg-stone-950 dark:hover:bg-white text-white dark:text-stone-950 shadow-md active:scale-[0.98]'
                    }`}
                  >
                    <Gift size={14} />
                    <span>Complete Packing & Load Crate</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
