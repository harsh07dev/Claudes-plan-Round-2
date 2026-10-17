import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Terminal, RotateCcw, ShieldCheck, CheckSquare, Sparkles, Menu } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';
import { SearchBar } from './SearchBar';
import { ChaosMeter } from './ChaosMeter';
import { CATEGORIES } from '../data/products';
import { getDynamicSlogan } from '../chaos/chaosEngine';

export function Navbar({ onSearch, activeCategory, onSelectCategory }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartClickCount, wishlist, cartItems } = useCart();
  const {
    interactionCount,
    chaosLevel,
    setDevConsoleOpen,
    setChecklistOpen,
    resetDemo,
    triggerFeature,
    perturbations
  } = useChaos();

  const [logoSloganIndex, setLogoSloganIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feature #90: Dynamic logo slogan shifts on hover
  const handleLogoHover = () => {
    triggerFeature("shared.dynamic-logo", "Header logo slogan mutated dynamically on mouse hover");
    setLogoSloganIndex(prev => prev + 1);
  };

  const currentSlogan = getDynamicSlogan(interactionCount + logoSloganIndex, chaosLevel);

  return (
    <header className={`sticky top-0 z-40 bg-white border-b border-slate-200 transition-colors shadow-sm ${
      perturbations.themeGlitch ? 'bg-slate-900 text-white border-slate-700' : ''
    }`}>
      {/* Top alert / utility strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">AuraPrime 1-Day Delivery Network Active</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">Next Guaranteed Dispatch: Today 2:00 PM</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setChecklistOpen(true)}
            className="flex items-center gap-1 hover:text-white transition-colors text-blue-400 font-semibold"
            title="Inspect 95 Features & Test Matrix"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Feature Checklist (95/95)</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setDevConsoleOpen(true)}
            className="flex items-center gap-1 hover:text-white transition-colors text-slate-400 font-mono"
            title="Open Chaos Terminal (`~` key)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dev Console</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => {
              if (window.confirm("Reset all demo data and restore initial tranquil state?")) {
                resetDemo();
              }
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
            title="Reset Demo (Feature #95)"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Slogan (#90) */}
        <Link
          to="/"
          onMouseEnter={handleLogoHover}
          className="flex flex-col flex-shrink-0 group no-underline text-left"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-navy group-hover:text-blue-600 transition-colors">
              Aura<span className="text-slate-900">Market</span>
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              Prime
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium tracking-tight -mt-0.5 transition-all group-hover:text-amber-600">
            {currentSlogan}
          </span>
        </Link>

        {/* Realistic Search Bar (#1, #2, #3) */}
        <SearchBar
          onSearch={onSearch}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
        />

        {/* Right actions: Chaos Meter, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Chaos Meter (#40) */}
          <ChaosMeter />

          {/* Wishlist Link (#22) */}
          <button
            onClick={() => {
              triggerFeature("shop.wishlist-icon-state-disagrees", "Wishlist drawer clicked");
            }}
            className="relative p-2 text-slate-600 hover:text-navy hover:bg-slate-100 rounded-full transition-colors hidden sm:flex items-center justify-center"
            title={`Wishlist (${wishlist.length} saved)`}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon (#19: Click count badge, #21: Cart animation) */}
          <Link
            to="/checkout"
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy hover:bg-navy-hover text-white transition-all shadow-sm"
            title="Proceed to Simulated Checkout"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {/* Feature #19: Badge displays click count instead of canonical items count! */}
              <span className="absolute -top-2 -right-2.5 bg-amber-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-navy shadow-sm animate-pulse">
                {cartClickCount}
              </span>
            </div>
            <div className="hidden md:flex flex-col text-left leading-none">
              <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">Simulated</span>
              <span className="text-xs font-bold text-white">Cart</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Category sub-navigation bar (#8: Category selection swap) */}
      <nav className="bg-slate-100 border-t border-slate-200 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-xs py-1.5 whitespace-nowrap">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1 font-bold text-slate-700 px-2 py-1 rounded hover:bg-slate-200 mr-2 md:hidden"
          >
            <Menu className="w-4 h-4" />
            <span>Categories</span>
          </button>

          {CATEGORIES.map(category => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  isActive
                    ? 'bg-navy text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            );
          })}

          <div className="ml-auto hidden lg:flex items-center gap-4 text-[11px] text-slate-500 font-medium">
            <span className="hover:text-blue-600 cursor-pointer">Today's Deals</span>
            <span className="hover:text-blue-600 cursor-pointer">Customer Service</span>
            <span className="hover:text-blue-600 cursor-pointer">Registry</span>
            <span className="hover:text-blue-600 cursor-pointer">Gift Cards</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
