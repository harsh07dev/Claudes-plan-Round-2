import React from 'react';
import { Trash2, Plus, Minus, AlertCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';
import { formatPrice } from '../utils/pricing';

export function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();
  const { triggerFeature, chaosLevel } = useChaos();

  // Feature #42: Quantity differs between cart and checkout display
  // In line item we display quantity + 1 if chaosLevel >= 1 to contrast with summary!
  const displayedLineQty = chaosLevel >= 1 ? item.quantity + 1 : item.quantity;

  const handleRemove = () => {
    // Feature #41: Removed item reappears!
    removeFromCart(item.id);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, 1, false);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, -1, true);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-slate-200 text-left items-start group">
      {/* Thumbnail */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border border-slate-200 flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
            {item.name}
          </h4>
          <span className="text-sm font-black text-slate-900 whitespace-nowrap">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>

        <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-700">{item.brand}</span>
          {item.variant && (
            <>
              <span>•</span>
              <span className="text-blue-700 font-medium">Edition: {item.variant.name}</span>
            </>
          )}
        </div>

        <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>In Stock • Ready for Simulated Fulfillment</span>
        </div>

        {/* Quantity Controls & Remove */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-slate-300 rounded bg-white">
            <button
              onClick={handleDecrement}
              className="p-1 px-2 text-slate-600 hover:bg-slate-100 rounded-l"
              title="Reduce Quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span
              className="px-3 py-0.5 text-xs font-bold text-slate-900 border-x border-slate-200"
              title="Quantity"
            >
              {/* Feature #42 note */}
              {displayedLineQty}
            </span>
            <button
              onClick={handleIncrement}
              className="p-1 px-2 text-slate-600 hover:bg-slate-100 rounded-r"
              title="Increase Quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 p-1 hover:bg-rose-50 rounded transition-colors"
            title="Remove item from order"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
