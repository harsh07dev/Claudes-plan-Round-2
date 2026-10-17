import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingCart, Truck, ShieldAlert, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';
import { formatPrice } from '../utils/pricing';

export function ProductCard({ product, onQuickView }) {
  const { addToCart, wishlist, toggleWishlist, compareList, toggleCompare } = useCart();
  const { triggerFeature, chaosLevel, perturbations } = useChaos();

  const [isHovered, setIsHovered] = useState(false);
  const [fleeOffset, setFleeOffset] = useState({ x: 0, y: 0 });

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.some(p => p.id === product.id);

  // Feature #13: Product image switches on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerFeature("shop.image-switches-on-hover", `Hovered ${product.name}: Image transitioned to alternate shot`);
  };

  // Feature #36: A selected button moves slightly on hover
  const handleButtonHover = (e) => {
    if (chaosLevel >= 1) {
      triggerFeature("shop.button-flees-on-hover", "Add to Cart button dodged pointer by 18 pixels");
      const randomX = (Math.random() - 0.5) * 36;
      const randomY = (Math.random() - 0.5) * 20;
      setFleeOffset({ x: randomX, y: randomY });
    }
  };

  // Feature #15: Product quick view opens another product
  const handleQuickViewClick = () => {
    triggerFeature("shop.quickview-wrong-product", `Clicked Quick View for ${product.name}: Opening swapped product target`);
    onQuickView(product);
  };

  // Feature #27: Discount badge contradicts displayed prices
  const displayedDiscountBadge = product.id === "prod-101" ? "7% OFF" : `${product.discountPercent}% OFF`;

  // Feature #14: Title and price mismatch
  const displayedPrice = (product.id === "prod-111" && chaosLevel >= 2) ? 49.99 : product.salePrice;

  // Feature #29: Delivery estimate changes after interactions
  const deliveryText = perturbations.deliveryDateLag
    ? "Estimated Delivery: Next Wednesday"
    : (product.deliveryDays === 1 ? "FREE One-Day Delivery by Tomorrow" : `FREE Delivery in ${product.deliveryDays} business days`);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setIsHovered(false);
        setFleeOffset({ x: 0, y: 0 });
      }}
      className="group relative bg-white border border-slate-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between hover:shadow-card hover:border-slate-300 transition-all duration-200"
    >
      {/* Top badges: Discount & Wishlist */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
              {product.badge}
            </span>
          )}
          {/* Feature #27: Discount badge contradicts prices */}
          <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded">
            {displayedDiscountBadge}
          </span>
        </div>

        {/* Feature #22: Wishlist toggle */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`p-1.5 rounded-full transition-colors ${
            isWishlisted ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image (#13: image switches on hover) */}
      <div
        onClick={handleQuickViewClick}
        className="relative aspect-square w-full bg-slate-50 rounded-md overflow-hidden cursor-pointer mb-3 flex items-center justify-center"
      >
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleQuickViewClick();
          }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Brand & Category */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
        <span className="font-semibold text-slate-600 uppercase tracking-wider">{product.brand}</span>
        <span className="truncate max-w-[120px]">{product.category}</span>
      </div>

      {/* Product Title */}
      <h3
        onClick={handleQuickViewClick}
        className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 line-clamp-2 text-left mb-2 cursor-pointer leading-snug"
        title={product.name}
      >
        {product.name}
      </h3>

      {/* Ratings & Reviews */}
      <div className="flex items-center gap-1.5 mb-2 text-left">
        <div className="flex items-center text-amber-500">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs font-bold text-slate-700 ml-1">{product.rating}</span>
        </div>
        <span className="text-[11px] text-slate-400">
          ({product.reviewCount.toLocaleString()} reviews)
        </span>
      </div>

      {/* Price section (#14: Title-price mismatch) */}
      <div className="flex items-baseline gap-2 mb-2 text-left">
        <span className="text-lg font-black text-slate-900">
          {formatPrice(displayedPrice)}
        </span>
        <span className="text-xs text-slate-400 line-through">
          {formatPrice(product.originalPrice)}
        </span>
      </div>

      {/* Stock indicators (#33: Stock indicators contradict one another) */}
      <div className="flex items-center justify-between text-[11px] mb-2 text-left">
        <span className="text-emerald-700 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          In Stock ({product.stockCount} available)
        </span>
        {/* Contradictory stock warning badge */}
        <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-1 rounded border border-amber-200">
          Backorder Pending
        </span>
      </div>

      {/* Delivery estimate (#29) */}
      <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-3 text-left">
        <Truck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
        <span className="truncate">{deliveryText}</span>
      </div>

      {/* Bottom Actions: Compare & Add to Cart (#36: button flees on hover) */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <label className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => toggleCompare(product)}
            className="w-3.5 h-3.5 rounded border-slate-300 text-navy focus:ring-navy"
          />
          <span>Compare</span>
        </label>

        {/* Feature #36: Fleeing button */}
        <button
          onClick={() => addToCart(product, 1)}
          onMouseEnter={handleButtonHover}
          style={{
            transform: `translate(${fleeOffset.x}px, ${fleeOffset.y}px)`,
            transition: 'transform 0.15s ease-out'
          }}
          className="flex-1 max-w-[140px] bg-navy hover:bg-navy-hover text-white text-xs font-semibold py-1.5 px-2.5 rounded-md flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
