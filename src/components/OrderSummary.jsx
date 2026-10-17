import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';
import { calculateCanonicalPricing, calculateDisplayPricing, formatPrice } from '../utils/pricing';
import { ShieldCheck, Truck, HelpCircle, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';

export function OrderSummary({ onProceedToPayment, isStepThree }) {
  const { cartItems, appliedCoupons, shippingOption, paymentMethod } = useCart();
  const { triggerFeature, perturbations, setPerturbations, chaosLevel } = useChaos();

  const [expanded, setExpanded] = useState(true);
  const [itemsReordered, setItemsReordered] = useState(false);
  const [totalJitter, setTotalJitter] = useState(false);

  // Canonical calculations
  const canonical = calculateCanonicalPricing(cartItems, appliedCoupons, shippingOption);

  // Display perturbed pricing
  const pricing = calculateDisplayPricing(canonical, perturbations);

  // Feature #47: Free shipping progress bar slips backward
  const freeShippingThreshold = 100;
  const canonicalDistance = Math.max(0, freeShippingThreshold - canonical.subtotal);
  // If chaos > 0, make progress slip backward (e.g. slips from $15 away to $25 away)
  const displayedDistance = chaosLevel >= 1 ? canonicalDistance + 10 : canonicalDistance;
  const progressPercent = Math.min(100, Math.max(10, ((freeShippingThreshold - displayedDistance) / freeShippingThreshold) * 100));

  // Feature #57: Order summary items rearrange
  const handleToggleSummary = () => {
    triggerFeature("checkout.order-summary-rearranges", "Order summary items rearranged order on expand/collapse");
    setItemsReordered(prev => !prev);
    setExpanded(prev => !prev);
  };

  // Feature #68: Displayed total fluctuates on hover
  const handleTotalHover = () => {
    triggerFeature("checkout.order-total-unexpected-shift", "Order total amount shifted by $0.05 on mouse hover");
    setPerturbations(prev => ({ ...prev, totalQuantumShift: !prev.totalQuantumShift }));
    setTotalJitter(true);
    setTimeout(() => setTotalJitter(false), 500);
  };

  // Feature #61: Summary layout flip for Cash on Delivery (COD)
  const isCodFlipped = paymentMethod === "cod";

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 text-left shadow-xs space-y-5">
      {/* Free Shipping Progress (#47) */}
      <div className="space-y-1.5 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-800 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>AuraPrime Free Delivery</span>
          </span>
          <span className="text-[11px] font-bold text-amber-700">
            {displayedDistance > 0 ? `$${displayedDistance.toFixed(2)} Away` : 'Unlocked!'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400">
          *Threshold calculations dynamically adjust based on cloud humidity
        </p>
      </div>

      {/* Header with Rearrange Action (#57) */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Order Summary ({cartItems.length} items)
        </h3>
        <button
          onClick={handleToggleSummary}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
        >
          <span>{expanded ? 'Collapse' : 'Expand'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Line Items List (#57: rearranged order) */}
      {expanded && (
        <div className="space-y-2 py-2 border-y border-slate-100 max-h-48 overflow-y-auto">
          {(itemsReordered ? [...cartItems].reverse() : cartItems).map(item => (
            <div key={item.id} className="flex justify-between items-center text-xs">
              <span className="text-slate-600 truncate max-w-[190px]">
                {item.quantity}x {item.name}
              </span>
              <span className="font-semibold text-slate-800">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Calculations Breakdown */}
      <div className="space-y-2.5 text-xs text-slate-600">
        {/* If COD flipped (#61), Total renders on top! */}
        {isCodFlipped && (
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900 font-bold mb-3">
            <span className="text-[10px] block uppercase text-amber-700">Cash On Delivery Inverted Summary</span>
            <div className="flex justify-between text-base font-black">
              <span>Grand Total:</span>
              <span>{formatPrice(pricing.displayTotal)}</span>
            </div>
          </div>
        )}

        {/* Subtotal (#43: Disagrees with line items) */}
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <span>Items Subtotal:</span>
            {perturbations.subtotalMismatch && (
              <span className="text-[10px] text-amber-600 bg-amber-50 px-1 rounded font-bold" title="Phantom +$12.49">
                (+ $12.49 drift)
              </span>
            )}
          </span>
          <span className="font-semibold text-slate-900">
            {formatPrice(pricing.displaySubtotal)}
          </span>
        </div>

        {/* Shipping & Handling (#46: Fluctuates unexpectedly) */}
        <div className="flex justify-between">
          <span>Shipping & Handling:</span>
          <span className={`font-semibold ${pricing.displayShipping === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
            {pricing.displayShipping === 0 ? 'FREE' : formatPrice(pricing.displayShipping)}
          </span>
        </div>

        {/* Promo Discount (#45: Presented as an additional charge +$20.00!) */}
        {pricing.displayDiscount > 0 && (
          <div className="flex justify-between font-bold">
            <span className="text-slate-700">
              Promotional Adjustment:
            </span>
            <span className={pricing.isDiscountAsExtraCharge ? 'text-rose-600' : 'text-emerald-700'}>
              {pricing.isDiscountAsExtraCharge ? `+${formatPrice(pricing.displayDiscount)}` : `-${formatPrice(pricing.displayDiscount)}`}
            </span>
          </div>
        )}

        {/* Estimated Tax (#44: Mutates after unrelated action) */}
        <div className="flex justify-between">
          <span>Estimated Sales Tax (Simulated):</span>
          <span className="font-semibold text-slate-900">
            {formatPrice(pricing.displayTax)}
          </span>
        </div>
      </div>

      {/* Grand Total (#68: Shifts on hover) */}
      {!isCodFlipped && (
        <div
          onMouseEnter={handleTotalHover}
          className={`pt-3 border-t-2 border-slate-200 flex justify-between items-baseline cursor-pointer transition-transform duration-200 ${
            totalJitter ? 'scale-105 text-blue-600' : ''
          }`}
          title="Simulated Order Total (Hover to test Quantum Shift)"
        >
          <span className="text-sm font-bold text-slate-900">
            Total to Pay:
          </span>
          <span className="text-xl font-black text-slate-950 font-mono">
            {formatPrice(pricing.displayTotal)}
          </span>
        </div>
      )}

      {/* Security assurances */}
      <div className="p-2.5 bg-slate-50 rounded border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>100% Simulated Checkout • No Real Currency Transacted</span>
      </div>
    </div>
  );
}
