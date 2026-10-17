import React, { useState } from 'react';
import { Tag, Check, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';

export function CouponPanel() {
  const { appliedCoupons, applyCoupon, removeCoupon } = useCart();
  const { triggerFeature, addToast } = useChaos();

  const [inputCode, setInputCode] = useState("");
  const [secondPromptOpen, setSecondPromptOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingCoupon, setPendingCoupon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const code = inputCode.trim().toUpperCase();

    // Feature #49: Applying a coupon opens another coupon prompt
    if (code === "SAVE20") {
      setPendingCoupon(code);
      setSecondPromptOpen(true);
      triggerFeature("checkout.coupon-spawns-second-prompt", "Coupon triggered second confirmation code step");
      setInputCode("");
      return;
    }

    applyCoupon(code);
    setInputCode("");
  };

  const handleSecondPromptSubmit = (e) => {
    e.preventDefault();
    if (verificationCode.trim().toUpperCase() === "RAGE99" || verificationCode.trim().length > 0) {
      setSecondPromptOpen(false);
      applyCoupon(pendingCoupon);
      addToast({
        title: "Coupon Verification Passed!",
        message: `Security clearance granted for voucher '${pendingCoupon}'.`,
        type: "success"
      });
      setVerificationCode("");
    }
  };

  return (
    <div id="coupon-section" className="bg-white border border-slate-200 rounded-lg p-4 text-left space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-blue-600" />
          <span>Promotions & Gift Vouchers</span>
        </h4>
        <span className="text-[10px] text-slate-400 font-medium">Single-Use Coupons</span>
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter promo code (e.g. SAVE20, AURA10)"
          className="flex-1 h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-navy uppercase font-mono font-medium"
        />
        <button
          type="submit"
          className="h-9 px-4 bg-navy hover:bg-navy-hover text-white text-xs font-bold rounded-md transition-colors"
        >
          Apply
        </button>
      </form>

      {/* Sample clickable promo pills */}
      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <span className="text-[11px] text-slate-400">Available:</span>
        <button
          type="button"
          onClick={() => applyCoupon("SAVE20")}
          className="text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded cursor-pointer"
        >
          SAVE20
        </button>
        <button
          type="button"
          onClick={() => applyCoupon("SHIPFREE")}
          className="text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded cursor-pointer"
        >
          SHIPFREE
        </button>
        <button
          type="button"
          onClick={() => applyCoupon("IMPOSSIBLE50")}
          className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300 px-2 py-0.5 rounded cursor-pointer"
        >
          IMPOSSIBLE50
        </button>
      </div>

      {/* Applied Coupons List (#51: dual coupon single effect) */}
      {appliedCoupons.length > 0 && (
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Applied Vouchers ({appliedCoupons.length} Active)
          </span>
          {appliedCoupons.map(coupon => (
            <div
              key={coupon.code}
              className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1.5 text-xs"
            >
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{coupon.code}</span>
                <span className="text-[10px] text-emerald-600 font-sans font-normal">({coupon.label})</span>
              </div>
              <button
                onClick={() => removeCoupon(coupon.code)}
                className="text-slate-400 hover:text-rose-600 p-0.5"
                title="Remove Coupon"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Feature #49: Secondary Coupon Verification Prompt Modal */}
      {secondPromptOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full border border-slate-200 shadow-xl text-left animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-navy mb-2">
              <ShieldAlert className="w-5 h-5" />
              <h4 className="text-sm font-bold text-slate-900">Secondary Coupon Validation</h4>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              To apply high-value promotional voucher <strong>{pendingCoupon}</strong>, please enter authorization passphrase <strong>RAGE99</strong> below:
            </p>
            <form onSubmit={handleSecondPromptSubmit} className="space-y-3">
              <input
                type="text"
                autoFocus
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter RAGE99"
                className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded font-mono font-bold uppercase focus:outline-none focus:border-navy"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-navy hover:bg-navy-hover text-white text-xs font-bold py-2 rounded"
                >
                  Confirm Voucher Intent
                </button>
                <button
                  type="button"
                  onClick={() => setSecondPromptOpen(false)}
                  className="border border-slate-300 text-slate-700 text-xs px-3 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
