import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';
import { CartItem } from '../components/CartItem';
import { OrderSummary } from '../components/OrderSummary';
import { CouponPanel } from '../components/CouponPanel';
import { PaymentSimulator } from '../components/PaymentSimulator';
import { formatPrice } from '../utils/pricing';
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Printer,
  ChevronRight,
  MapPin,
  Clock,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    shippingOption,
    setShippingOption,
    shippingAddress,
    setShippingAddress,
    appliedCoupons,
    setAppliedCoupons,
    clearCart
  } = useCart();

  const {
    triggerFeature,
    addToast,
    chaosLevel,
    perturbations,
    setPerturbations,
    setSurvivalOpen
  } = useChaos();

  // Multi-step Checkout Stepper: 1 (Cart), 2 (Delivery), 3 (Payment), 4 (Confirmation / Receipt)
  const [currentStep, setCurrentStep] = useState(1);

  // Feature #69: Checkout progress moves backward
  // Visual stepper index can disagree with true step!
  const [visualStep, setVisualStep] = useState(1);

  // Feature #55: Delivery fields change positions (City & State swap)
  const [fieldsSwapped, setFieldsSwapped] = useState(false);

  // Feature #54: Absurd address validation errors
  const [addressError, setAddressError] = useState("");
  const [addressValidated, setAddressValidated] = useState(false);

  // Feature #59: Continue shopping confirmation dialog
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  // Confirmation Order References (#72)
  const [orderRef] = useState({
    headerId: "#9821",
    trackingId: "#AURA-4410-X",
    footerId: "#00000"
  });

  // Feature #48: Editing address clears applied coupons!
  const handleAddressInputChange = (field, value) => {
    if (appliedCoupons.length > 0) {
      triggerFeature("checkout.coupon-disappears-on-edit", "Applied coupon vanished after address field was modified");
      setAppliedCoupons([]);
      addToast({
        title: "Coupon Desynchronized",
        message: "Address modification invalidated active promotional vouchers.",
        type: "warning"
      });
    }

    // Feature #44: Simulated tax changes after unrelated interaction
    triggerFeature("checkout.tax-mutates-unrelated", "Simulated tax fluctuated upon address modification");
    setPerturbations(prev => ({ ...prev, taxMutated: true }));

    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  // Feature #55: Focus on City triggers field swap
  const handleCityFocus = () => {
    triggerFeature("checkout.delivery-fields-swap", "City and State input positions swapped on focus");
    setFieldsSwapped(prev => !prev);
  };

  // Feature #54 & #56: Address validation
  const handleValidateAddress = (e) => {
    e.preventDefault();

    // Feature #54: Absurd address rules
    const street = shippingAddress.street || "";
    const hasPunctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(street);
    const mentionsTuesday = street.toLowerCase().includes("tuesday");

    if (!hasPunctuation || mentionsTuesday) {
      triggerFeature("checkout.absurd-address-rules", "Address validation failed absurd grammatical and temporal rules");
      setAddressError("Street address must contain at least one punctuation mark (e.g. '.') and cannot mention Tuesdays.");
      return;
    }

    setAddressError("");
    setAddressValidated(true);

    // Feature #56: A sample field clears after validation (Zip code wipes empty!)
    triggerFeature("checkout.sample-field-clears-post-validation", "Zip Code field wiped clean immediately after validation success");
    setShippingAddress(prev => ({ ...prev, zip: "" }));

    // Feature #77: Unlocks unrelated achievement
    triggerFeature("checkout.unlocks-unrelated-achievement", "Unlocked Achievement: 'Master of Cartography'");

    addToast({
      title: "Address Certified (Partially)",
      message: "Shipping address validated. Zip code scrubbed for postal secrecy.",
      type: "success"
    });

    // Advance to Step 3
    handleStepAdvance(3);
  };

  // Handle Stepper Advancement (#69: Checkout progress moves backward)
  const handleStepAdvance = (targetStep) => {
    setCurrentStep(targetStep);

    if (targetStep === 3) {
      // Feature #69: Progress moves backward to 1 on the wizard bar!
      triggerFeature("checkout.checkout-progress-moves-backward", "Progressed to Step 3: Stepper wizard animated backward to Step 1");
      setVisualStep(1);
    } else {
      setVisualStep(targetStep);
    }
  };

  // Feature #70: Going back resets visual progress but preserves data
  const handleStepBack = () => {
    triggerFeature("checkout.going-back-resets-visual-progress", "Went back: Visual progress indicators reset while form state persisted");
    setCurrentStep(prev => Math.max(1, prev - 1));
    setVisualStep(1);
  };

  // Feature #58: Edit Cart navigates incorrectly
  const handleEditCart = () => {
    triggerFeature("checkout.edit-cart-navigates-incorrectly", "Clicked Edit Cart: Scrolled to promotions panel instead of editor");
    const el = document.getElementById("coupon-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Feature #59: Continue shopping opens dialog
  const handleContinueShoppingClick = (e) => {
    e.preventDefault();
    triggerFeature("checkout.continue-shopping-opens-dialog", "Clicked Continue Shopping: Triggered abandonment anxiety dialog");
    setLeaveModalOpen(true);
  };

  // Shipping option change (#52, #53)
  const handleShippingChange = (option) => {
    if (option === "express") {
      // Feature #53: Express delivery highlights standard delivery!
      // Feature #52: Delivery date contradicts shipping option ("6 to 9 Weeks")
      triggerFeature("checkout.express-highlights-standard", "Selected Express Delivery: Selection radio stuck on Standard Ground");
      triggerFeature("checkout.delivery-date-contradicts-option", "Priority Express selected: Displayed delivery estimate of 6 to 9 Weeks");
    }
    setShippingOption(option);
  };

  // Final Order Completion (#71, #72, #73, #74, #80)
  const handleFinalOrderComplete = () => {
    setCurrentStep(4);
    setVisualStep(4);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // graceful fallback
    }

    // Feature #71: Success followed by simulated correction
    triggerFeature("checkout.success-simulated-correction", "Order confirmed, followed by correction indicating parallel dimension routing");
    addToast({
      title: "Order Placed Successfully! 🎉",
      message: "Order #8921 confirmed in digital datastore.",
      type: "success"
    });

    setTimeout(() => {
      addToast({
        title: "Routing Correction #8921",
        message: "Correction: Order has been placed in Parallel Dimension #B-12. Delivery eta: Yesterday.",
        type: "warning"
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-left">
      {/* Checkout Header / Stepper */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-navy">Simulated Checkout</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              Secure Sandbox
            </span>
          </div>

          {/* Stepper Wizard (#69: moves backward) */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md ${
              visualStep >= 1 ? 'bg-navy text-white font-bold' : 'text-slate-400 bg-slate-100'
            }`}>
              <span>1. Cart Review</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md ${
              visualStep >= 2 ? 'bg-navy text-white font-bold' : 'text-slate-400 bg-slate-100'
            }`}>
              <span>2. Delivery</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md ${
              visualStep >= 3 ? 'bg-navy text-white font-bold' : 'text-slate-400 bg-slate-100'
            }`}>
              <span>3. Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Checkout Grid */}
      {currentStep < 4 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns: Selected Step View */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: CART REVIEW */}
            {currentStep === 1 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">
                    Review Cart Items ({cartItems.length})
                  </h3>
                  <div className="flex gap-3 text-xs">
                    {/* Feature #58: Edit Cart navigates incorrectly */}
                    <button
                      onClick={handleEditCart}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit Cart
                    </button>
                    {/* Feature #59: Continue Shopping opens dialog */}
                    <button
                      onClick={handleContinueShoppingClick}
                      className="text-slate-500 hover:text-slate-800"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <p>Your simulated shopping cart is empty.</p>
                    <Link to="/" className="mt-2 inline-block text-xs font-bold text-navy hover:underline">
                      Return to Storefront
                    </Link>
                  </div>
                ) : (
                  <div>
                    {cartItems.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <Link
                    to="/"
                    onClick={handleContinueShoppingClick}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Store</span>
                  </Link>

                  <button
                    onClick={() => handleStepAdvance(2)}
                    disabled={cartItems.length === 0}
                    className="bg-navy hover:bg-navy-hover text-white text-xs font-bold py-2.5 px-6 rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Proceed to Delivery Selection</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DELIVERY & ADDRESS */}
            {currentStep === 2 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-navy" />
                    <span>Shipping Address & Fulfillment Method</span>
                  </h3>
                  <button
                    onClick={handleStepBack}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Back to Items
                  </button>
                </div>

                {/* Delivery Method Radios (#52, #53) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Delivery Speed
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Standard Delivery */}
                    <div
                      onClick={() => handleShippingChange("standard")}
                      className={`p-3.5 rounded-lg border cursor-pointer text-left transition-all ${
                        // Feature #53: Even when express clicked, standard stays visually highlighted!
                        shippingOption === "standard" || shippingOption === "express"
                          ? 'border-navy bg-blue-50/40 ring-1 ring-navy'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-900">Standard AuraGround</span>
                        <span className="text-xs font-bold text-emerald-700">FREE</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Estimated Delivery: 2 to 3 Business Days
                      </p>
                    </div>

                    {/* Express Delivery (#52: contradicts option!) */}
                    <div
                      onClick={() => handleShippingChange("express")}
                      className={`p-3.5 rounded-lg border cursor-pointer text-left transition-all ${
                        shippingOption === "express" ? 'border-slate-300 bg-slate-50' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-900">Priority Express ($19.99)</span>
                        <span className="text-xs font-bold text-blue-700">Rush</span>
                      </div>
                      {/* Feature #52: Contradictory delivery estimate */}
                      <p className="text-[11px] text-rose-600 font-semibold">
                        Estimated Delivery: 6 to 9 Weeks
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address Form (#54, #55, #56) */}
                <form onSubmit={handleValidateAddress} className="space-y-4 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Fictional Shipping Destination
                  </h4>

                  {addressError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>{addressError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={shippingAddress.fullName}
                        onChange={(e) => handleAddressInputChange("fullName", e.target.value)}
                        className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={shippingAddress.phone}
                        onChange={(e) => handleAddressInputChange("phone", e.target.value)}
                        className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address <span className="text-[10px] text-slate-400 font-normal">(Needs punctuation, no Tuesdays)</span>
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => handleAddressInputChange("street", e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace."
                      className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                    />
                  </div>

                  {/* Swappable City & State fields (#55) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {fieldsSwapped ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">State / Province</label>
                          <input
                            type="text"
                            value={shippingAddress.state}
                            onChange={(e) => handleAddressInputChange("state", e.target.value)}
                            className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">City (Swapped)</label>
                          <input
                            type="text"
                            onFocus={handleCityFocus}
                            value={shippingAddress.city}
                            onChange={(e) => handleAddressInputChange("city", e.target.value)}
                            className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                          <input
                            type="text"
                            onFocus={handleCityFocus}
                            value={shippingAddress.city}
                            onChange={(e) => handleAddressInputChange("city", e.target.value)}
                            className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">State / Province</label>
                          <input
                            type="text"
                            value={shippingAddress.state}
                            onChange={(e) => handleAddressInputChange("state", e.target.value)}
                            className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Zip / Postal Code</label>
                      <input
                        type="text"
                        value={shippingAddress.zip}
                        onChange={(e) => handleAddressInputChange("zip", e.target.value)}
                        placeholder="e.g. 97477"
                        className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="submit"
                      className="bg-navy hover:bg-navy-hover text-white text-xs font-bold py-2.5 px-6 rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Validate Address & Continue to Payment</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: PAYMENT SIMULATOR */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <PaymentSimulator onOrderComplete={handleFinalOrderComplete} />

                {/* Back to Delivery option */}
                <div className="flex justify-between items-center text-xs">
                  <button
                    onClick={handleStepBack}
                    className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Delivery Method</span>
                  </button>

                  {/* Feature #75: Review Order returns to payment selection */}
                  <button
                    onClick={() => {
                      triggerFeature("checkout.review-order-returns-to-payment", "Clicked Review Order: Bounced back to payment options");
                      addToast({
                        title: "Payment Calibration Check",
                        message: "Returned to payment method matrix to reaffirm digital aura.",
                        type: "info"
                      });
                    }}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Review Order (Re-check Payment)
                  </button>
                </div>
              </div>
            )}

            {/* Coupon Panel Component */}
            <CouponPanel />
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <OrderSummary
              onProceedToPayment={() => handleStepAdvance(3)}
              isStepThree={currentStep === 3}
            />
          </div>
        </div>
      ) : (
        /* STEP 4: FINAL CONFIRMATION & RECEIPT SEQUENCER (#71, #72, #73, #74, #80) */
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Inconsistent Order References (#72) */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Simulated Transaction Approved
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Thank You! Fictional Order {orderRef.headerId} Confirmed
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                A confirmation facsimile has been sent to your metaphysical mailbox.
              </p>
            </div>

            {/* Contradictory Tracking Statuses (#73) */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-navy" />
                  <span>Tracking Identifier: {orderRef.trackingId}</span>
                </span>
                <span className="text-blue-700 font-mono">Carrier: QuantumExpress</span>
              </div>

              {/* Status Timeline (#73: Delivered Yesterday AND Departed Tomorrow) */}
              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Delivered to Front Porch: Yesterday at 4:18 PM</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Clock className="w-4 h-4 flex-shrink-0 animate-spin" />
                  <span>Departed Regional Logistics Facility: Tomorrow at 8:00 AM</span>
                </div>
              </div>
            </div>

            {/* Printable Receipt with Total Discrepancy (#74) */}
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-4 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">AuraMarket Simulated Sales Receipt</span>
                <span>Invoice Ref: {orderRef.footerId}</span>
              </div>
              {cartItems.map(it => (
                <div key={it.id} className="flex justify-between">
                  <span>{it.quantity}x {it.name}</span>
                  <span>{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
              <div className="pt-2 border-t flex justify-between font-bold text-sm text-slate-950">
                <span>Receipt Grand Total:</span>
                {/* Feature #74: Total disagrees with previous summary! */}
                <span className="text-rose-700">$389.99 (Receipt Variance)</span>
              </div>
            </div>

            {/* Actions: Open Survival Summary (#94) or Reset Demo (#95) */}
            <div className="flex flex-wrap gap-3 justify-center pt-3">
              <button
                onClick={() => {
                  triggerFeature("shared.final-survival-summary", "Opened Survival Summary report modal");
                  setSurvivalOpen(true);
                }}
                className="bg-navy hover:bg-navy-hover text-white text-xs font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>View Chaos Survival Report & Stats</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Mock Receipt</span>
              </button>

              <Link
                to="/"
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center gap-1.5"
              >
                <span>Return to Storefront</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Feature #59: Continue Shopping Modal */}
      {leaveModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full border border-slate-200 shadow-2xl text-center space-y-4 animate-in zoom-in-95">
            <h4 className="text-sm font-bold text-slate-900">Cart Attachment Advisory</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you certain you wish to return to the catalog? Your selected items may develop separation anxiety in your absence.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setLeaveModalOpen(false);
                  navigate('/');
                }}
                className="flex-1 bg-navy text-white text-xs font-bold py-2 rounded-lg hover:bg-navy-hover"
              >
                Return to Store
              </button>
              <button
                onClick={() => setLeaveModalOpen(false)}
                className="flex-1 border border-slate-300 text-slate-700 text-xs font-semibold py-2 rounded-lg"
              >
                Stay in Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
