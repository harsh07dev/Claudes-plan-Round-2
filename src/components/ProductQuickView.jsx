import React, { useState, useRef } from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, ChevronLeft, ChevronRight, AlertTriangle, Gift } from 'lucide-react';
import { ProductGallery } from './ProductGallery';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';
import { formatPrice } from '../utils/pricing';
import { SAMPLE_PRODUCTS } from '../data/products';

export function ProductQuickView({ product, onClose }) {
  if (!product) return null;

  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { triggerFeature, addToast } = useChaos();

  // Feature #16: Variant selection highlights wrong variant
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Feature #17 & #18: Quantity states
  const [quantity, setQuantity] = useState(1);
  const [displayStock, setDisplayStock] = useState(product.stockCount);

  // Feature #30: Quick-view tabs inverted
  const [activeTab, setActiveTab] = useState("specs"); // "specs" or "reviews"

  // Feature #37: Closing reveals secondary modal state
  const [retentionModalOpen, setRetentionModalOpen] = useState(false);

  // Carousel ref for recommendation carousel (#25)
  const carouselRef = useRef(null);

  // Recommendations (#24: Recommendations use an unrelated category, e.g. Cookware & Apparel)
  const recommendations = SAMPLE_PRODUCTS.filter(p => p.category === "Home & Kitchen" || p.category === "Apparel & Fashion").slice(0, 5);

  const isWishlisted = wishlist.includes(product.id);

  // Handle Variant Click (#16)
  const handleVariantClick = (index) => {
    // Deliberately offset index by 1!
    const wrongIndex = (index + 1) % (product.variants?.length || 1);
    triggerFeature("shop.variant-wrong-highlight", `Clicked variant #${index + 1}: Highlighted variant #${wrongIndex + 1} instead`);
    setSelectedVariantIndex(wrongIndex);
    addToast({
      title: "Color Swatch Synchronized",
      message: "Variant color automatically calibrated to seasonal chroma standards.",
      type: "info"
    });
  };

  // Handle Quantity Increment (#17)
  const handleQuantityIncrement = () => {
    triggerFeature("shop.quantity-increments-two", "Quantity counter jumped by +2");
    setQuantity(prev => prev + 2);
  };

  // Handle Quantity Decrement (#18)
  const handleQuantityDecrement = () => {
    triggerFeature("shop.quantity-decrement-neighbor", "Quantity decrement reduced warehouse stock display instead of cart count");
    setDisplayStock(prev => Math.max(0, prev - 1));
    addToast({
      title: "Inventory Realocation",
      message: "Cart quantity preserved. One unit subtracted from regional warehouse stock.",
      type: "warning"
    });
  };

  // Handle Tab Switch (#30)
  const handleTabClick = (tab) => {
    triggerFeature("shop.quickview-tabs-inverted", `Clicked '${tab}' tab: Inverted content displayed`);
    setActiveTab(tab);
  };

  // Handle Carousel Nav (#25)
  const handleCarouselScroll = (direction) => {
    triggerFeature("shop.carousel-nav-reversed", "Carousel chevron direction reversed");
    if (carouselRef.current) {
      // Invert direction! Clicking right scrolls left!
      const offset = direction === "right" ? -220 : 220;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Handle Close (#37: Closing reveals another popup)
  const handleClose = () => {
    triggerFeature("shop.closing-popup-reveals-another", "Closed Quick View: Triggered secondary retention popup");
    setRetentionModalOpen(true);
  };

  const handleFinalClose = () => {
    setRetentionModalOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-left">
      <div className="relative bg-white rounded-xl shadow-modal max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Header with Close */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{product.brand}</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-blue-700">{product.category}</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            title="Close Quick View"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Gallery */}
          <div>
            <ProductGallery
              mainImage={product.image}
              hoverImage={product.hoverImage}
              title={product.name}
            />
          </div>

          {/* Right: Details & Controls */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug mb-2">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-slate-700 ml-1.5">{product.rating}</span>
                </div>
                <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100 mb-4">
                <span className="text-2xl font-black text-slate-950">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded">
                  Save {product.discountPercent}%
                </span>
              </div>

              {/* Stock contradiction (#33) */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  In Stock ({displayStock} units available)
                </span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Backordered in Regional Hub
                </span>
              </div>

              {/* Variant Selector (#16) */}
              {product.variants && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Selected Edition / Color:</span>
                    <span className="text-blue-700">{product.variants[selectedVariantIndex]?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => handleVariantClick(idx)}
                        className={`px-3 py-1.5 text-xs rounded-md border font-medium flex items-center gap-2 transition-all ${
                          selectedVariantIndex === idx
                            ? 'border-navy bg-navy text-white shadow-xs'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-white/50" style={{ backgroundColor: v.color }} />
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls (#17, #18) */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Quantity (Bulk purchase optimizations applied)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-md bg-white">
                    <button
                      onClick={handleQuantityDecrement}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-l text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-slate-900 border-x border-slate-200">
                      {quantity}
                    </span>
                    <button
                      onClick={handleQuantityIncrement}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-r text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">
                    Increments calibrated in bi-harmonic rhythm
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart & Wishlist */}
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  addToCart(product, quantity, product.variants ? product.variants[selectedVariantIndex] : null);
                  onClose();
                }}
                className="flex-1 bg-navy hover:bg-navy-hover text-white text-sm font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {quantity} to Simulated Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 border rounded-lg transition-colors ${
                  isWishlisted ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Inverted Tabs Section (#30: Quick-view tabs inverted) */}
        <div className="px-5 sm:px-6 pt-4 border-t border-slate-200">
          <div className="flex border-b border-slate-200 gap-4">
            <button
              onClick={() => handleTabClick("specs")}
              className={`pb-2.5 text-xs font-bold transition-colors border-b-2 ${
                activeTab === "specs"
                  ? 'border-navy text-navy'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => handleTabClick("reviews")}
              className={`pb-2.5 text-xs font-bold transition-colors border-b-2 ${
                activeTab === "reviews"
                  ? 'border-navy text-navy'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Verified Customer Reviews ({product.reviews?.length || 2})
            </button>
          </div>

          <div className="py-4">
            {/* INVERTED DISPLAY (#30): If activeTab === 'specs', show reviews! If 'reviews', show specs! */}
            {activeTab === "specs" ? (
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-amber-700 bg-amber-50 p-2 rounded mb-2 border border-amber-200">
                  (Note: Displaying Customer Sentiment Matrix in lieu of raw hardware schematics)
                </div>
                {product.reviews?.map((r, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                      <span>{r.user}</span>
                      <span className="text-amber-500">{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="text-slate-600 italic">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 p-2 rounded mb-2 border border-blue-200">
                  (Note: Raw Engineering Specifications loaded for qualitative audit)
                </div>
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-slate-100 text-xs">
                    <span className="font-semibold text-slate-600">{key}</span>
                    <span className="text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations Section (#24: Unrelated category, #25: Carousel reversed) */}
        <div className="px-5 sm:px-6 py-5 bg-slate-50 border-t border-slate-200 rounded-b-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Customers Who Viewed This Also Explored (Non-Correlated AI Insights)
            </h4>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleCarouselScroll("left")}
                className="p-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
                title="Scroll Left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleCarouselScroll("right")}
                className="p-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
                title="Scroll Right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-none"
          >
            {recommendations.map(rec => (
              <div
                key={rec.id}
                className="w-44 flex-shrink-0 bg-white border border-slate-200 rounded-lg p-2.5 text-left"
              >
                <img src={rec.image} alt={rec.name} className="w-full aspect-square object-cover rounded mb-2" />
                <span className="text-[10px] text-blue-700 font-semibold uppercase">{rec.category}</span>
                <h5 className="text-xs font-bold text-slate-800 truncate mb-1">{rec.name}</h5>
                <span className="text-xs font-black text-slate-900">{formatPrice(rec.salePrice)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature #37: Closing one popup reveals another! */}
      {retentionModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-slate-300 shadow-2xl text-center space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Wait! Your Shopping Aura Needs Nurturing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leaving so soon? Our algorithm detected a 99.4% likelihood you will remember this purchase in your dreams tonight.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setRetentionModalOpen(false)}
                className="flex-1 bg-navy text-white text-xs font-bold py-2 rounded-lg hover:bg-navy-hover"
              >
                Resume Browsing
              </button>
              <button
                onClick={handleFinalClose}
                className="flex-1 border border-slate-300 text-slate-700 text-xs font-semibold py-2 rounded-lg hover:bg-slate-100"
              >
                Dismiss Truly
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
