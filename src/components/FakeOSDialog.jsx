import React, { useState } from 'react';
import { useChaos } from '../hooks/useChaos';
import { Shield, KeyRound, Check, X, Laptop } from 'lucide-react';

export function FakeOSDialog() {
  const { osDialog, setOsDialog, triggerFeature, addToast } = useChaos();
  const [pin, setPin] = useState("");

  if (!osDialog) return null;

  const handleConfirm = () => {
    triggerFeature("shared.simulated-os-dialogs", "Simulated OS Passkey prompt authorized");
    addToast({
      title: "Biometric Passkey Accepted",
      message: "Virtual Windows Hello credentials cryptographically ratified.",
      type: "success"
    });
    if (osDialog.onConfirm) osDialog.onConfirm();
    setOsDialog(null);
  };

  const handleCancel = () => {
    if (osDialog.onCancel) osDialog.onCancel();
    setOsDialog(null);
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      {/* Windows 11 Fluent Design / Modern OS Card */}
      <div className="bg-[#f3f3f3] text-slate-800 rounded-lg shadow-2xl max-w-md w-full border border-slate-300 overflow-hidden text-left font-sans animate-in zoom-in-95">
        {/* Title bar */}
        <div className="bg-white px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-700">Windows Security</span>
          </div>
          <button
            onClick={handleCancel}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {osDialog.title || "Making sure it's you"}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {osDialog.message || "AuraMarket is requesting biometric or PIN authentication to finalize checkout."}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-slate-200 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Enter Simulated PIN (Any digits):
            </label>
            <input
              type="password"
              autoFocus
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-blue-600 tracking-widest font-mono text-center"
            />
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleConfirm}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-xs transition-colors"
            >
              OK
            </button>
            <button
              onClick={handleCancel}
              className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
