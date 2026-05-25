import React from 'react';
import { Fruit } from '../types';
import { Star, ShieldCheck, HeartPulse, Eye, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface FruitCardProps {
  key?: any;
  fruit: Fruit;
  onSelect: (fruit: Fruit) => void;
  onAddToCart: (fruit: Fruit) => void;
}

export default function FruitCard({ fruit, onSelect, onAddToCart }: FruitCardProps) {
  // Dynamically map tailwind color codes for glowing border ring & accents on hover
  const getGlowStyles = (code: string) => {
    switch (code) {
      case 'amber':
        return 'hover:border-amber-300 dark:hover:border-amber-600/70 hover:shadow-amber-100/55 dark:hover:shadow-amber-900/10 group-hover:bg-amber-100/40 dark:group-hover:bg-amber-950/20 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-stone-900';
      case 'rose':
        return 'hover:border-rose-300 dark:hover:border-rose-600/70 hover:shadow-rose-100/55 dark:hover:shadow-rose-900/10 group-hover:bg-rose-100/40 dark:group-hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-stone-900';
      case 'orange':
        return 'hover:border-orange-300 dark:hover:border-orange-600/70 hover:shadow-orange-100/55 dark:hover:shadow-orange-900/10 group-hover:bg-orange-100/40 dark:group-hover:bg-orange-950/20 text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-stone-900';
      case 'blue':
        return 'hover:border-blue-300 dark:hover:border-blue-600/70 hover:shadow-blue-100/55 dark:hover:shadow-blue-900/10 group-hover:bg-blue-100/40 dark:group-hover:bg-blue-950/20 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-stone-900';
      case 'red':
        return 'hover:border-red-300 dark:hover:border-red-600/70 hover:shadow-red-100/55 dark:hover:shadow-red-900/10 group-hover:bg-red-100/40 dark:group-hover:bg-red-950/20 text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-stone-900';
      case 'yellow':
        return 'hover:border-yellow-300 dark:hover:border-yellow-600/70 hover:shadow-yellow-100/55 dark:hover:shadow-yellow-900/10 group-hover:bg-yellow-100/40 dark:group-hover:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 bg-yellow-50/50 dark:bg-stone-900';
      case 'emerald':
        return 'hover:border-emerald-300 dark:hover:border-emerald-600/70 hover:shadow-emerald-100/55 dark:hover:shadow-emerald-900/10 group-hover:bg-emerald-100/40 dark:group-hover:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-stone-900';
      case 'lime':
        return 'hover:border-lime-300 dark:hover:border-lime-600/70 hover:shadow-lime-100/55 dark:hover:shadow-lime-900/10 group-hover:bg-lime-100/40 dark:group-hover:bg-lime-950/20 text-lime-600 dark:text-lime-400 bg-lime-50/50 dark:bg-stone-900';
      default:
        return 'hover:border-stone-300 dark:hover:border-stone-600/70 hover:shadow-stone-100/55 dark:hover:shadow-stone-900/10 group-hover:bg-stone-100/40 dark:group-hover:bg-stone-900/20 text-stone-600 dark:text-stone-300 bg-stone-50/50 dark:bg-stone-900';
    }
  };

  const glowClass = getGlowStyles(fruit.colorCode);

  return (
    <motion.div
      layout
      id={`fruit-card-${fruit.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/75 dark:border-stone-800 p-5 rounded-2xl shadow-sm transition-all duration-300 ${glowClass}`}
    >
      {/* Best Seller or Reserve badge */}
      {fruit.isBestSeller && (
        <span className="absolute top-4 left-4 z-10 px-2.5 py-0.5 text-[9px] font-mono tracking-wider text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 rounded-full border border-amber-200/60 dark:border-amber-850/65 font-semibold uppercase">
          Best Seller
        </span>
      )}

      {/* Origin country (top right) */}
      <span className="absolute top-4 right-4 text-[9px] font-mono uppercase text-stone-400 dark:text-stone-500 font-semibold tracking-wider bg-stone-50 dark:bg-stone-950 px-2 py-0.5 rounded border border-stone-100 dark:border-stone-850">
        {fruit.origin.split(',')[1] || fruit.origin}
      </span>

      {/* Main product visual context (Emoji styled inside a gorgeous ambient circle container) */}
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <div className={`relative h-24 w-24 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-inner group-hover:shadow-md ${glowClass.split(' ')[2]}`}>
          {/* Subtle colored shadow ring */}
          <div className="absolute inset-0 rounded-full border border-stone-200/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-5xl select-none" role="img" aria-label={fruit.name}>
            {fruit.image}
          </span>
        </div>
      </div>

      {/* Text Details */}
      <div className="mt-2 space-y-1">
        <div className="flex justify-between items-start gap-1">
          <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-white group-hover:text-stone-950 dark:group-hover:text-stone-100 transition-colors duration-200 truncate">
            {fruit.name}
          </h4>
        </div>
        <p className="text-[11px] font-mono text-stone-400 dark:text-stone-500 italic">
          {fruit.scientificName}
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-300 leading-relaxed line-clamp-2 pt-1 h-8">
          {fruit.description}
        </p>

        {/* Nutritional Highlight Spec Tag */}
        <div className="flex gap-2 items-center pt-2.5 text-[10px] text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800 mt-2">
          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-900/35">
            <HeartPulse size={12} />
            {fruit.nutrition.benefits[0].length > 30 
              ? fruit.nutrition.benefits[0].substring(0, 28) + '...' 
              : fruit.nutrition.benefits[0]}
          </span>
        </div>
      </div>

      {/* Interactive controls and price indicators */}
      <div className="mt-4 pt-3 border-t border-stone-100/85 dark:border-stone-800 flex items-center justify-between">
        <div>
          <span className="block text-[8px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest leading-none">ORGANIC PRICE</span>
          <span className="text-xl font-serif font-extrabold text-stone-900 dark:text-white">${fruit.price.toFixed(2)}</span>
          <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 ml-1/2">{fruit.unit}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Inspect biochemical specs sheet action */}
          <button
            id={`inspect-spec-${fruit.id}`}
            onClick={() => onSelect(fruit)}
            className="p-2 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700/70 border border-stone-200 dark:border-stone-750 text-stone-600 dark:text-stone-300 rounded-xl transition-all duration-200 flex items-center justify-center group/btn"
            title="Inspect biochemical specs sheet"
            aria-label={`View nutritional profile for ${fruit.name}`}
          >
            <Eye size={15} className="group-hover/btn:scale-105" />
          </button>

          {/* Quick Add To Crate action */}
          <button
            id={`quick-add-${fruit.id}`}
            onClick={() => onAddToCart(fruit)}
            className="h-9 px-3 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-xl font-sans text-xs font-semibold flex items-center gap-1 transition-all duration-200 leading-none shadow-sm hover:shadow active:scale-95"
            title="Assemble to gift box"
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
