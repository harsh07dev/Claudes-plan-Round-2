import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { CATEGORIES, SAMPLE_PRODUCTS } from '../data/products';
import { useChaos } from '../hooks/useChaos';
import { AFFORDABILITY_CONFIG, getAffordabilityReaction } from '../chaos/contextualReactions';

const AUTOCOMPLETE_ITEMS = [
  "wireless noise cancelling headphones",
  "4k oled gaming monitor 144hz",
  "mechanical tactile keyboard rgb",
  "thermal espresso machine barista",
  "titanium gps smartwatch multi-sport",
  "merino wool thermal crewneck",
  "weatherproof commuter backpack",
  "hepa smart air purifier h13"
];

export function SearchBar({ onSearch, activeCategory, onSelectCategory }) {
  const {
    triggerFeature,
    addToast,
    chaosLevel,
    expensiveSearchCount,
    setExpensiveSearchCount,
    setActiveAffordabilityBanner
  } = useChaos();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(AUTOCOMPLETE_ITEMS);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Feature #2: Autocomplete suggestions shift on hover or typing
  const handleSuggestionHover = (index) => {
    triggerFeature("shop.autocomplete-shift", "Autocomplete suggestions swapped positions during cursor hover");
    setSuggestions(prev => {
      const copy = [...prev];
      const nextIdx = (index + 1) % copy.length;
      const temp = copy[index];
      copy[index] = copy[nextIdx];
      copy[nextIdx] = temp;
      return copy;
    });
  };

  const executeSearch = (searchTerm) => {
    // Feature #92: Controlled loading animation
    setLoading(true);
    triggerFeature("shared.controlled-loading-animations", "Search spinner stuttered and reversed briefly");

    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);

      // Feature 1: "Can You Even Afford That?" check
      const queryTokens = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
      const matching = SAMPLE_PRODUCTS.filter(p => {
        const text = `${p.name} ${p.brand} ${p.category} ${p.description || ""} ${(p.tags || []).join(" ")}`.toLowerCase();
        return queryTokens.every(token => text.includes(token));
      });

      if (matching.length > 0) {
        const highestPriced = [...matching].sort((a, b) => b.salePrice - a.salePrice)[0];
        if (highestPriced.salePrice >= AFFORDABILITY_CONFIG.priceThreshold) {
          const newCount = expensiveSearchCount + 1;
          setExpensiveSearchCount(newCount);

          triggerFeature("shop.expensive-search-reaction", `Searched high-ticket item '${highestPriced.name}' ($${highestPriced.salePrice})`);
          if (newCount > 1) {
            triggerFeature("shop.expensive-search-escalation", `Escalation level ${newCount} for repeated luxury queries`);
          }

          const reaction = getAffordabilityReaction(highestPriced, newCount);
          setActiveAffordabilityBanner(reaction);
          addToast({
            title: reaction.badgeText,
            message: reaction.quote,
            type: "warning"
          });
        } else {
          setActiveAffordabilityBanner(null);
        }
      } else {
        setActiveAffordabilityBanner(null);
      }

      // Feature #1: Search returns an unexpected category
      let categoryOverride = null;
      if (searchTerm.toLowerCase().includes("headphone") || searchTerm.toLowerCase().includes("keyboard") || searchTerm.toLowerCase().includes("audio")) {
        categoryOverride = "Home & Kitchen";
        triggerFeature("shop.search-unexpected-category", `Search for '${searchTerm}' redirected to '${categoryOverride}' category`);
        addToast({
          title: "Category Alignment Optimized",
          message: `Query '${searchTerm}' algorithmically resolved to Home & Kitchen for maximum feng shui.`,
          type: "info"
        });
      } else if (searchTerm.toLowerCase().includes("watch") || searchTerm.toLowerCase().includes("monitor")) {
        categoryOverride = "Apparel & Fashion";
        triggerFeature("shop.search-unexpected-category", `Search for '${searchTerm}' redirected to '${categoryOverride}' category`);
      }

      onSearch(searchTerm, categoryOverride);

      // Feature #3: Search query clears after results appear
      triggerFeature("shop.search-query-clears", "Search input field instantly cleared itself after results appeared");
      setQuery("");
    }, 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      executeSearch(query);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-2xl mx-2 sm:mx-6">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        {/* Category prefix dropdown */}
        <select
          value={activeCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="hidden md:block h-10 px-3 bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 border border-r-0 border-slate-300 rounded-l-md focus:outline-none cursor-pointer"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Input */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search electronics, home goods, apparel & essentials..."
            className="w-full h-10 pl-3 pr-8 text-sm bg-white border border-slate-300 md:rounded-none rounded-l-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="h-10 px-4 bg-navy hover:bg-navy-hover text-white rounded-r-md flex items-center justify-center transition-colors flex-shrink-0"
          title="Search"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </form>

      {/* Autocomplete shifting dropdown (#2) */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50 overflow-hidden text-left"
        >
          <div className="p-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Trending Suggestions</span>
            <span className="text-[10px] text-blue-600">Auto-Refining</span>
          </div>
          <div className="py-1 max-h-60 overflow-y-auto">
            {suggestions
              .filter(s => !query || s.toLowerCase().includes(query.toLowerCase()))
              .slice(0, 6)
              .map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  onMouseEnter={() => handleSuggestionHover(idx)}
                  onClick={() => {
                    executeSearch(item);
                  }}
                  className="px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center gap-2 group transition-all"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  <span className="flex-1 truncate">{item}</span>
                  <span className="text-[10px] text-slate-300 group-hover:text-slate-500">Jump</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
