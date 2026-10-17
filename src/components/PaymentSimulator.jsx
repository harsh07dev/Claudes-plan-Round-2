import React, { useState } from 'react';
import { CreditCard, QrCode, Banknote, ShieldCheck, CheckSquare, Square, AlertTriangle, ArrowRight, Loader2, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useChaos } from '../hooks/useChaos';

export function PaymentSimulator({ onOrderComplete }) {
  const { paymentMethod, setPaymentMethod } = useCart();
  const { triggerFeature, addToast, setOsDialog, setMaintenanceOpen, chaosLevel } = useChaos();

  // Feature #67: Terms checkbox state disagrees
  // termsAccepted = false means ENABLED! termsAccepted = true means DISABLED!
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Flow & Modal states
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [secondContradictoryOpen, setSecondContradictoryOpen] = useState(false);
  const [confirmStepOneOpen, setConfirmStepOneOpen] = useState(false);
  const [confirmStepTwoOpen, setConfirmStepTwoOpen] = useState(false);

  // Processing state (#63, #64, #80)
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [processingStatus, setProcessingStatus] = useState("Encrypting simulated quantum bits...");
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  // Handle Payment Selection (#60, #61)
  const handlePaymentSelect = (method) => {
    // Feature #60: Payment selection and highlighted method disagree
    triggerFeature("checkout.payment-selection-disagrees", `Selected '${method}': Highlight ring anchored to contradictory method`);

    // Feature #61: Switching payment methods changes summary layout
    if (method === "cod") {
      triggerFeature("checkout.payment-switch-rearranges-summary", "Selected Cash On Delivery: Inverted summary order");
    }

    setPaymentMethod(method);
  };

  // Handle Terms Click (#67)
  const handleTermsToggle = () => {
    triggerFeature("checkout.terms-checkbox-state-disagrees", `Terms checkbox clicked: State toggled to ${!termsAccepted ? 'Checked (Disables Button)' : 'Unchecked (Enables Button)'}`);
    setTermsAccepted(prev => !prev);
  };

  // Place Order Click (#65)
  const handlePlaceOrderClick = () => {
    // Feature #65: Place Order opens delivery policy first!
    triggerFeature("checkout.place-order-opens-policy", "Place Order intercepted: Opened Simulated Delivery Policy modal");
    setPolicyModalOpen(true);
  };

  // Accept policy -> Opens second contradictory dialog (#66)
  const handleAcceptPolicy = () => {
    setPolicyModalOpen(false);
    triggerFeature("checkout.confirm-opens-contradictory-modal", "Accepted delivery policy: Triggered secondary unread-agreement verification");
    setSecondContradictoryOpen(true);
  };

  // Accept second modal -> Trigger harmless verification confirmations (#62)
  const handleAcceptContradictory = () => {
    setSecondContradictoryOpen(false);
    triggerFeature("checkout.repeated-harmless-confirmation", "Triggered confirmation check #1: Verify human intent");
    setConfirmStepOneOpen(true);
  };

  // Confirm step 1 -> Confirm step 2 (#62)
  const handleStepOnePass = () => {
    setConfirmStepOneOpen(false);
    setConfirmStepTwoOpen(true);
  };

  // Step 2 pass -> Open Fake OS Dialog (#76) and run multi-step sequence (#80, #63)
  const handleStepTwoPass = () => {
    setConfirmStepTwoOpen(false);

    // Feature #76: Final confirmation opens fake OS dialog!
    triggerFeature("checkout.final-conf-opens-fake-os-dialog", "Simulated Windows Security Passkey dialog triggered");
    setOsDialog({
      title: "Windows Security • Authorize Simulated Order",
      message: "Please enter your simulated biometric passkey to finalize checkout on AuraMarket.",
      style: "win11",
      onConfirm: () => startOrderProcessingSequence(),
      onCancel: () => startOrderProcessingSequence()
    });
  };

  // Feature #80 & #63: Humorous Multi-step sequence & processing restarting at 99%
  const startOrderProcessingSequence = () => {
    // Feature #78: Checkout escalates chaos level
    triggerFeature("checkout.escalates-chaos-level", "Entered final order processing sequence");

    // Feature #79: Brief fake maintenance dialog
    setMaintenanceOpen(true);

    setTimeout(() => {
      setIsProcessing(true);
      setProgressPercent(15);
      setProcessingStatus("Phase 1: Establishing handshake with dimensional warehouse...");

      setTimeout(() => {
        setProgressPercent(60);
        setProcessingStatus("Phase 2: Verifying that zero actual money is being deducted...");
      }, 700);

      setTimeout(() => {
        // Reaches 99%! (#63)
        setProgressPercent(99);
        setProcessingStatus("Phase 3: 99% Complete • Almost done...");

        setTimeout(() => {
          // Drops back to 12%! (#63)
          triggerFeature("checkout.processing-restarts-at-99", "Processing bar reached 99%, paused, and dropped back to 12%");
          setProgressPercent(12);
          setProcessingStatus("Recalculating digital karma (Restarting at 12%)...");

          setTimeout(() => {
            setProgressPercent(50);
            setProcessingStatus("Phase 4: Harmonizing temporal delivery schedules...");
          }, 800);

          setTimeout(() => {
            setProgressPercent(100);
            setProcessingStatus("Phase 5: Simulated Order Confirmed!");

            setTimeout(() => {
              setIsProcessing(false);
              triggerFeature("checkout.humorous-multi-step-sequence", "Multi-phase order sequence completed successfully");
              onOrderComplete();
            }, 600);
          }, 1600);
        }, 1100);
      }, 1500);
    }, 2800);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 text-left space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-navy" />
            <span>Simulated Payment Method</span>
          </h3>
          <p className="text-xs text-slate-500">
            Select a fictional payment instrument. No real payment credentials collected.
          </p>
        </div>
        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
          Sandbox Mode
        </span>
      </div>

      {/* Payment Options: Demo Card, Demo UPI, Cash on Delivery (#60) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Method 1: Demo Card */}
        <div
          onClick={() => handlePaymentSelect("card")}
          className={`cursor-pointer p-4 rounded-lg border transition-all ${
            // Feature #60: If card selected, UPI highlights blue! If not, normal
            paymentMethod === "card"
              ? 'border-slate-300 bg-slate-50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="w-5 h-5 text-blue-700" />
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "card"}
              onChange={() => handlePaymentSelect("card")}
              className="accent-navy"
            />
          </div>
          <h4 className="text-xs font-bold text-slate-800">Demo Card</h4>
          <span className="text-[11px] text-slate-500">Virtual Visa / Mastercard</span>
        </div>

        {/* Method 2: Demo UPI (Shows active blue ring when Card is selected #60!) */}
        <div
          onClick={() => handlePaymentSelect("upi")}
          className={`cursor-pointer p-4 rounded-lg border transition-all ${
            paymentMethod === "card"
              ? 'border-navy ring-2 ring-navy/20 bg-blue-50/50' // Disagreement highlight!
              : paymentMethod === "upi"
              ? 'border-navy ring-2 ring-navy/20 bg-blue-50/50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <QrCode className="w-5 h-5 text-emerald-700" />
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "upi"}
              onChange={() => handlePaymentSelect("upi")}
              className="accent-navy"
            />
          </div>
          <h4 className="text-xs font-bold text-slate-800">Demo UPI / QR</h4>
          <span className="text-[11px] text-slate-500">Instant Virtual Scan</span>
        </div>

        {/* Method 3: Cash On Delivery (Flips summary order #61!) */}
        <div
          onClick={() => handlePaymentSelect("cod")}
          className={`cursor-pointer p-4 rounded-lg border transition-all ${
            paymentMethod === "cod"
              ? 'border-navy ring-2 ring-navy/20 bg-blue-50/50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Banknote className="w-5 h-5 text-amber-700" />
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cod"}
              onChange={() => handlePaymentSelect("cod")}
              className="accent-navy"
            />
          </div>
          <h4 className="text-xs font-bold text-slate-800">Cash on Delivery</h4>
          <span className="text-[11px] text-slate-500">Inverted Summary Mode</span>
        </div>
      </div>

      {/* Terms & Conditions Checkbox (#67: Checkbox and enabled state disagree!) */}
      <div className="pt-2">
        <label
          onClick={handleTermsToggle}
          className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none"
        >
          <div className="mt-0.5">
            {termsAccepted ? (
              <CheckSquare className="w-4 h-4 text-navy" />
            ) : (
              <Square className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <div>
            <span className="font-medium">
              I agree to the simulated terms of retail serendipity and confirm no legal contracts are formed.
            </span>
            <span className="block text-[11px] text-slate-400 mt-0.5">
              (Counter-intuitive rule: Leaving this unchecked permits order placement)
            </span>
          </div>
        </label>
      </div>

      {/* Place Order CTA Button */}
      <div className="pt-2">
        <button
          onClick={handlePlaceOrderClick}
          disabled={termsAccepted} // Feature #67: Disabled IF checked!
          className={`w-full py-3.5 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
            termsAccepted
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-navy hover:bg-navy-hover text-white cursor-pointer active:scale-99'
          }`}
          title={termsAccepted ? "Disabled: Do not overthink terms" : "Click to initiate Simulated Order Flow"}
        >
          <span>Authorize Simulated Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feature #65: Policy Modal */}
      {policyModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto border border-slate-200 shadow-2xl text-left space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-navy">
              <FileText className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">
                AuraMarket Comprehensive Simulated Delivery Policy (Clause 1 of 42)
              </h3>
            </div>
            <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-4 rounded border border-slate-200 leading-relaxed font-mono">
              <p>§ 1.1: All packages dispatched via simulated couriers may or may not exist in this physical timeline.</p>
              <p>§ 1.2: Delivery times are estimated based on planetary alignment and user typing speed.</p>
              <p>§ 1.3: If a package arrives before you ordered it, please return it to yesterday.</p>
              <p>§ 1.4: By clicking 'Agree', you acknowledge that the subtotal discrepancy is entirely decorative.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleAcceptPolicy}
                className="bg-navy hover:bg-navy-hover text-white text-xs font-bold px-5 py-2.5 rounded-lg"
              >
                I Agree to All 42 Clauses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature #66: Second Contradictory Modal */}
      {secondContradictoryOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-slate-200 shadow-2xl text-left space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">
                Contradictory Policy Audit
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Warning:</strong> Our cognitive monitor noticed you accepted 42 legal clauses in less than 4 seconds. By proceeding, you solemnly swear you did not read any of them.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleAcceptContradictory}
                className="bg-navy hover:bg-navy-hover text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                I Confess & Wish To Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature #62: Harmless Confirmations Step 1 */}
      {confirmStepOneOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full border border-slate-200 shadow-2xl text-center space-y-3 animate-in zoom-in-95">
            <h4 className="text-sm font-bold text-slate-900">Step 1 of 2: Sensory Validation</h4>
            <p className="text-xs text-slate-600">
              Please confirm you are a living human enjoying an interactive e-commerce experiment.
            </p>
            <button
              onClick={handleStepOnePass}
              className="w-full bg-navy text-white text-xs font-bold py-2 rounded-lg"
            >
              Yes, I am completely human
            </button>
          </div>
        </div>
      )}

      {/* Feature #62: Harmless Confirmations Step 2 */}
      {confirmStepTwoOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full border border-slate-200 shadow-2xl text-center space-y-3 animate-in zoom-in-95">
            <h4 className="text-sm font-bold text-slate-900">Step 2 of 2: Existential Confirmation</h4>
            <p className="text-xs text-slate-600">
              Are you <em>REALLY</em> sure you are prepared for whatever simulated order results follow?
            </p>
            <button
              onClick={handleStepTwoPass}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg"
            >
              Undeniably, unequivocally sure
            </button>
          </div>
        </div>
      )}

      {/* Feature #63 & #80: Multi-Step Processing Sequence Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 text-left">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Simulated Order Pipeline
              </span>
              <span className="text-xs font-mono font-bold text-slate-700">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-navy transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-navy flex-shrink-0" />
              <span>{processingStatus}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
