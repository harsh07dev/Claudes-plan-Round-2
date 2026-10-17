import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useChaos } from '../hooks/useChaos';
import { ArrowUpDown, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { analyzeFilterDeadlock } from '../chaos/contextualReactions';

export function ProductGrid({
  products,
  onQuickView,
  sortOption,
  onSortChange,
  currentPage,
  onPageChange,
  activeCategory,
  selectedBrand,
  selectedRating,
  priceRange,
  searchQuery,
  allProducts = [],
  onClearBrand,
  onClearRating,
  onResetPrice,
  onClearCategory,
  onClearAllFilters,
  onRaiseBudget
}) {
  const { triggerFeature, addToast } = useChaos();

  // Feature #4: Result count disagrees with the grid
  const fakeCountText = `Showing 47 of ${products.length} products`;

  // Feature 2: Analyze deadlock if products are 0
  const deadlockAnalysis = useMemo(() => {
    return products.length === 0 ? analyzeFilterDeadlock({
      activeCategory,
      selectedBrand,
      selectedRating,
      priceRange,
      searchQuery,
      allProducts
    }) : null;
  }, [products.length, activeCategory, selectedBrand, selectedRating, priceRange, searchQuery, allProducts]);

  const lastDeadlockTriggerRef = useRef(null);
  useEffect(() => {
    if (products.length === 0 && deadlockAnalysis) {
      const triggerKey = `${deadlockAnalysis.reason}:${deadlockAnalysis.headline}`;
      if (lastDeadlockTriggerRef.current !== triggerKey) {
        lastDeadlockTriggerRef.current = triggerKey;
        triggerFeature("shop.restrictive-filter-empty-state", `Filter deadlock (${deadlockAnalysis.reason}): ${deadlockAnalysis.headline}`);
      }
    } else {
      lastDeadlockTriggerRef.current = null;
    }
  }, [products.length, deadlockAnalysis, triggerFeature]);

  const handleSuggestionAction = (action, targetPrice) => {
    if (action === "clear_brand" && onClearBrand) onClearBrand();
    else if (action === "clear_rating" && onClearRating) onClearRating();
    else if (action === "reset_price" && onResetPrice) onResetPrice();
    else if (action === "clear_category" && onClearCategory) onClearCategory();
    else if (action === "raise_budget_target" && onRaiseBudget) onRaiseBudget(targetPrice || 600);
    else if (action === "clear_all" && onClearAllFilters) onClearAllFilters();
  };

  const handleSortSelect = (e) => {
    const val = e.target.value;

    if (val === "price_asc") {
      // Feature #5: Price sorting reverses
      triggerFeature("shop.price-sort-reverses", "Selected 'Price: Low to High' - inverted to High to Low");
      addToast({
        title: "Sorting Gravity Reversal",
        message: "Prices sorted in counter-ascending direction.",
        type: "info"
      });
      onSortChange("price_desc");
      return;
    }

    if (val === "rating") {
      // Feature #31: Rating sorting reverses
      triggerFeature("shop.rating-sort-reversed", "Selected 'Avg. Customer Review' - inverted to lowest rated first");
      onSortChange("rating_reversed");
      return;
    }

    if (val === "featured") {
      // Feature #12: Sort label disagrees with sorting
      triggerFeature("shop.sort-label-disagrees", "Sort dropdown claims Featured while applied sort is Z-A");
      onSortChange("alpha_desc");
      return;
    }

    onSortChange(val);
  };

  // Feature #11: Pagination repeats a previous page
  const handlePageClick = (page) => {
    if (page === 2) {
      triggerFeature("shop.pagination-repeats-previous", "Clicked Page 2: Reloaded Page 1 items under Page 2 heading");
      addToast({
        title: "Pagination Cache Echo",
        message: "Page 2 mirrored Page 1 for ergonomic consistency.",
        type: "info"
      });
      onPageChange(2, true); // repeat page 1 content
    } else {
      onPageChange(page, false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4 text-left">
      {/* Top bar: Result Count (#4) & Sorting (#5, #12, #31) */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Feature #4: Disagreeing count */}
          <span className="text-sm font-semibold text-slate-800">
            {fakeCountText}
          </span>
          {/* Feature #12: Disagreeing sort badge */}
          <span className="hidden md:inline-flex text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
            Active Logic: Alphabetical Z-A
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium whitespace-nowrap flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </label>
          <select
            value={sortOption}
            onChange={handleSortSelect}
            className="text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-navy text-slate-700 font-medium cursor-pointer"
          >
            <option value="featured">Featured Marketplace Recommendations</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Sarcastic Contextual Empty State (#98) */}
      {products.length === 0 && deadlockAnalysis ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 text-left shadow-card space-y-5 animate-in fade-in">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl flex-shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Constraint Deadlock Detected
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {deadlockAnalysis.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                {deadlockAnalysis.description}
              </p>
            </div>
          </div>

          {/* Active Constraints Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Culprit Constraints Under Review
            </span>
            <div className="flex flex-wrap gap-2">
              {activeCategory && activeCategory !== "All Categories" && (
                <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded text-slate-700 font-medium">
                  Category: {activeCategory}
                </span>
              )}
              {selectedBrand && (
                <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded text-slate-700 font-medium">
                  Brand: {selectedBrand}
                </span>
              )}
              {selectedRating > 0 && (
                <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded text-slate-700 font-medium">
                  Rating: {selectedRating}+ Stars
                </span>
              )}
              {priceRange && (
                <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded text-slate-700 font-medium">
                  Budget: ${priceRange[0]} - ${priceRange[1]}
                </span>
              )}
            </div>
          </div>

          {/* Functional Remediation Suggestions */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Suggested Diplomatic Remedies
            </span>
            <div className="flex flex-wrap gap-2">
              {deadlockAnalysis.suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionAction(sug.action, sug.targetPrice)}
                  className="bg-navy hover:bg-navy-hover text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>{sug.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}

      {/* Pagination Bar (#11: Pagination repeats a previous page) */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between mt-2">
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className="text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageClick(1)}
            className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
              currentPage === 1 ? 'bg-navy text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            1
          </button>
          <button
            onClick={() => handlePageClick(2)}
            className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
              currentPage === 2 ? 'bg-navy text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            2
          </button>
        </div>

        <button
          onClick={() => handlePageClick(2)}
          disabled={currentPage === 2}
          className="text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
