import React, { useState } from 'react';
import { CATEGORIES, BRANDS } from '../data/products';
import { useChaos } from '../hooks/useChaos';
import { Star, RotateCcw, Info, Check } from 'lucide-react';

export function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  selectedRating,
  onSelectRating,
  priceRange,
  onPriceRangeChange,
  onClearFilters
}) {
  const { triggerFeature, addToast } = useChaos();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Feature #7: Clear filters leaves one filter active
  const handleClear = () => {
    triggerFeature("shop.clear-filters-stubborn", "Clear filters executed but Brand filter remained stubbornly locked");
    addToast({
      title: "Filters Cleared (Mostly)",
      message: "Reset all parameters except Brand filter which refused to surrender.",
      type: "info"
    });
    onClearFilters("ApexAudio"); // Leave ApexAudio active!
  };

  // Feature #6: Price range inverted
  const handlePriceInvert = (e) => {
    triggerFeature("shop.price-range-inverted", "Price range slider inverted: Min is higher than Max");
    onPriceRangeChange([800, 50]);
  };

  // Feature #9: Brand selection changes label but not results
  const handleBrandClick = (brand) => {
    triggerFeature("shop.brand-selection-deceptive", `Brand '${brand}' selected: UI label updated without re-filtering catalog`);
    onSelectBrand(brand);
  };

  // Feature #10: Rating filter behaves in reverse
  const handleRatingClick = (rating) => {
    triggerFeature("shop.rating-filter-reverse", `Rating filter '${rating} Stars' selected: Inverse rating filter applied`);
    onSelectRating(rating);
  };

  // Feature #35: Misplaced tooltip
  const handleTooltipHover = () => {
    triggerFeature("shop.tooltip-misplaced", "Info tooltip anchored to top navigation header instead of sidebar");
    setTooltipVisible(true);
  };

  return (
    <aside className="w-full md:w-64 bg-white border border-slate-200 rounded-lg p-4 space-y-6 text-left h-fit">
      {/* Header & Clear button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-900 tracking-tight">Filters</h3>
        {/* Feature #7: Clear Filters */}
        <button
          onClick={handleClear}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          title="Clear all active filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Categories (#8: Category selection shows different category, #34: Inaccurate count badge) */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Department
        </h4>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            // Feature #34: Inaccurate badge count
            const fakeCount = idx === 0 ? "24" : idx === 1 ? "(99+)" : idx === 2 ? "(142)" : "(87)";

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`w-full flex items-center justify-between text-xs py-1 px-2 rounded transition-colors text-left ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{cat}</span>
                <span className="text-[10px] text-slate-400 font-normal">{fakeCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider (#6: Price range inverted) */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Price Range
          </h4>
          {/* Feature #35: Misplaced tooltip */}
          <div className="relative">
            <Info
              onMouseEnter={handleTooltipHover}
              onMouseLeave={() => setTooltipVisible(false)}
              className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600 cursor-pointer"
            />
            {tooltipVisible && (
              <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] py-1 px-3 rounded shadow-lg z-50 pointer-events-none">
                Tooltip: Price calibrated to lunar atmospheric density
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Min: ${priceRange[0]}</span>
            <span>Max: ${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="20"
            max="1200"
            step="10"
            value={priceRange[0]}
            onChange={handlePriceInvert}
            className="w-full accent-navy cursor-pointer"
          />
          <div className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
            Note: Non-Euclidean currency bounds in effect
          </div>
        </div>
      </div>

      {/* Brands (#9: Brand selection changes label but not results) */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Brand {selectedBrand && <span className="text-blue-600 font-normal">({selectedBrand})</span>}
        </h4>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {BRANDS.map(brand => {
            const isChecked = selectedBrand === brand;
            return (
              <label
                key={brand}
                onClick={() => handleBrandClick(brand)}
                className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="w-3.5 h-3.5 rounded border-slate-300 text-navy focus:ring-navy"
                />
                <span className="truncate">{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Rating (#10: Rating filter behaves in reverse) */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Customer Review
        </h4>
        <div className="space-y-1">
          {[4, 3, 2].map(rating => (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              className={`w-full flex items-center gap-1.5 text-xs py-1 px-1.5 rounded hover:bg-slate-50 text-left ${
                selectedRating === rating ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-600'
              }`}
            >
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? 'fill-current' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="text-[11px] ml-1">& Up</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
