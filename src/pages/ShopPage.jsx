import React, { useState, useMemo } from 'react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductGrid } from '../components/ProductGrid';
import { PromoBanner } from '../components/PromoBanner';
import { ProductQuickView } from '../components/ProductQuickView';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';
import { formatPrice } from '../utils/pricing';
import { Eye, X, ArrowRight, Layers, Sparkles } from 'lucide-react';

export function ShopPage({ searchQuery, selectedCategory, onSelectCategory }) {
  const { compareList, toggleCompare, recentViews, addToCart } = useCart();
  const { triggerFeature, chaosLevel, perturbations } = useChaos();

  // Local filter states
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([20, 1200]);
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [repeatPageOne, setRepeatPageOne] = useState(false);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filtering products
  const filteredProducts = useMemo(() => {
    let list = [...SAMPLE_PRODUCTS];

    // Category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Feature #10: Rating filter behaves in reverse
    if (selectedRating > 0) {
      // If user selected 4+ stars, reverse it to show LOWER rating items!
      list = list.filter(p => p.rating <= 4.6);
    }

    // Feature #6: Inverted price range
    if (priceRange[0] > priceRange[1]) {
      // inverted! e.g. min 800, max 50
      list = list.filter(p => p.salePrice >= priceRange[0] || p.salePrice <= priceRange[1]);
    } else {
      list = list.filter(p => p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1]);
    }

    // Sorting
    if (sortOption === "price_desc") {
      list.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortOption === "price_asc") {
      list.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortOption === "rating_reversed") {
      // Feature #31: Rating sorting reverses (lowest rating first)
      list.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "alpha_desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [selectedCategory, searchQuery, selectedRating, priceRange, sortOption]);

  // Pagination slice (#11: repeat previous page)
  const pageSize = 9;
  const paginatedProducts = useMemo(() => {
    if (repeatPageOne && currentPage === 2) {
      // Feature #11: Returns page 1 items even on page 2!
      return filteredProducts.slice(0, pageSize);
    }
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, repeatPageOne]);

  // Clear filters (#7)
  const handleClearFilters = (stubbornBrand) => {
    setSelectedBrand(stubbornBrand); // leaves brand active!
    setSelectedRating(0);
    setPriceRange([20, 1200]);
    onSelectCategory("All Categories");
  };

  // Quick view opener (#15: opens swapped product)
  const handleOpenQuickView = (product) => {
    let target = product;
    // Feature #15: Swapped product target
    if (product.swappedId && chaosLevel >= 1) {
      const swapped = SAMPLE_PRODUCTS.find(p => p.id === product.swappedId);
      if (swapped) {
        target = swapped;
      }
    }
    setQuickViewProduct(target);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Promotional Top Banner (#26, #28) */}
      <PromoBanner onSelectCategory={onSelectCategory} />

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          selectedRating={selectedRating}
          onSelectRating={setSelectedRating}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          onClearFilters={handleClearFilters}
        />

        <ProductGrid
          products={paginatedProducts}
          onQuickView={handleOpenQuickView}
          sortOption={sortOption}
          onSortChange={setSortOption}
          currentPage={currentPage}
          onPageChange={(pg, repeat) => {
            setCurrentPage(pg);
            setRepeatPageOne(repeat);
          }}
        />
      </div>

      {/* Feature #23: Comparison drawer with substituted item */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-navy shadow-2xl p-4 z-40 animate-in slide-in-from-bottom text-left">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-navy" />
                <span>Side-by-Side Product Matrix ({compareList.length} items)</span>
              </h4>
              <p className="text-xs text-slate-500">
                AI cross-category harmonization applied. Direct comparisons normalized across dimensions.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {compareList.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md text-xs">
                  <img src={item.image} alt={item.name} className="w-6 h-6 object-cover rounded" />
                  <span className="font-semibold text-slate-800 max-w-[140px] truncate">{item.name}</span>
                  <button onClick={() => toggleCompare(item)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  triggerFeature("shop.compare-substitutes-item", "Launched comparison dialog");
                  alert("Comparison Matrix generated! Note: Espresso Pressure vs Screen Refresh Rate inconclusive.");
                }}
                className="bg-navy hover:bg-navy-hover text-white text-xs font-bold px-4 py-2 rounded-md"
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature #32: Recently Viewed Tray (Includes unexpected Butter Churn) */}
      <div className="mt-12 pt-8 border-t border-slate-200 text-left">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Recently Viewed by Your Session</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              Live Cache
            </span>
          </h3>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Persisted in biometric sensory profile
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentViews.map(item => (
            <div
              key={item.id}
              onClick={() => {
                triggerFeature("shop.recently-viewed-unexpected", `Clicked unexpected item: ${item.name}`);
                handleOpenQuickView(item);
              }}
              className="bg-white border border-slate-200 rounded-lg p-3 flex gap-3 items-center hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group"
            >
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">{item.badge || item.category}</span>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 truncate">{item.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-slate-900">{formatPrice(item.salePrice)}</span>
                  <span className="text-[11px] text-slate-400 line-through">{formatPrice(item.originalPrice)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
