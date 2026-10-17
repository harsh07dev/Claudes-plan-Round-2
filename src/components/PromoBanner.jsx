import React, { useState, useEffect } from 'react';
import { Clock, Zap, ArrowRight, ShieldCheck, Tag, X } from 'lucide-react';
import { useChaos } from '../hooks/useChaos';

export function PromoBanner({ onSelectCategory }) {
  const { triggerFeature, addToast } = useChaos();

  // Feature #26: Deal countdown increases!
  const [seconds, setSeconds] = useState(72);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);

  useEffect(() => {
    // Ticks UPWARD every second! (#26)
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev % 10 === 0) {
          triggerFeature("shop.deal-countdown-increases", "Lightning deal countdown timer ticked upward instead of downward");
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [triggerFeature]);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Feature #28: Deal banner opens another promotion
  const handleBannerClick = () => {
    triggerFeature("shop.deal-banner-opens-other", "Clicked 'Tech Deals' banner: Opened 'Wool Sweaters Flash Clearance' promotion");
    setBannerModalOpen(true);
  };

  return (
    <div className="mb-6 space-y-3 text-left">
      {/* Primary Retail Banner */}
      <div
        onClick={handleBannerClick}
        className="relative bg-gradient-to-r from-slate-900 via-navy to-slate-900 text-white rounded-xl p-5 sm:p-7 shadow-subtle border border-slate-800 cursor-pointer overflow-hidden group"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>Limited Flash Sale Event</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
            Up to 40% Off Premium Flagship Electronics & Audio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mb-4 line-clamp-2">
            Explore curated noise-cancelling headphones, high-refresh 4K monitors, and ergonomic workstation gear. Guaranteed 1-day delivery for AuraPrime members.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all">
              <span>Claim Lightning Deal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Feature #26: Increasing Countdown */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="text-slate-300">Ends In:</span>
              <span className="text-amber-400">{formatTimer(seconds)}</span>
              <span className="text-[10px] text-slate-500 font-sans ml-1">(Ascending)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature #28: Banner Modal Opening Different Promotion */}
      {bannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-slate-200 shadow-2xl text-left animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Surprise Redirection</span>
              <button onClick={() => setBannerModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium">
                You clicked <strong>"40% Off Tech"</strong>, but our retail aura has aligned you with our <strong>"100% Merino Wool Thermal Sweaters Clearance"</strong>!
              </div>
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80"
                alt="Merino Wool Sweater"
                className="w-full h-44 object-cover rounded-lg"
              />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">NordicComfort 100% Merino Crewneck</h4>
                  <span className="text-xs text-slate-500">Unconditionally warm and odor-resistant</span>
                </div>
                <span className="text-lg font-black text-slate-900">$125.00</span>
              </div>
              <button
                onClick={() => {
                  setBannerModalOpen(false);
                  onSelectCategory("Apparel & Fashion");
                }}
                className="w-full bg-navy hover:bg-navy-hover text-white text-xs font-bold py-2 rounded-lg"
              >
                Browse Merino Sweaters Instead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
