import React from 'react';
import { useChaos } from '../hooks/useChaos';
import { getChaosLevelInfo } from '../chaos/chaosEngine';
import { Flame, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export function ChaosMeter() {
  const { interactionCount, chaosLevel, setChecklistOpen, triggerFeature, addToast } = useChaos();
  const info = getChaosLevelInfo(interactionCount);

  const handleClick = () => {
    // Feature #40: Chaos meter unlocks new behavior
    triggerFeature("shop.chaos-meter-unlocks-behavior", "Chaos meter tapped - accelerated entropy mode");
    addToast({
      title: "Chaos Sub-Engine Overclocked",
      message: `Entropy Level ${chaosLevel} engaged. Expect heightened unpredictable retail phenomena!`,
      type: "warning"
    });
    setChecklistOpen(true);
  };

  return (
    <div
      onClick={handleClick}
      title="Chaos Meter: Click to open Test Checklist & Feature Registry"
      className="cursor-pointer group flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all"
    >
      <div className="relative flex items-center justify-center">
        <span className={`w-2.5 h-2.5 rounded-full ${
          chaosLevel === 0 ? 'bg-emerald-500' :
          chaosLevel === 1 ? 'bg-blue-500' :
          chaosLevel === 2 ? 'bg-amber-500 animate-pulse' :
          chaosLevel === 3 ? 'bg-orange-500 animate-ping' :
          'bg-rose-600 animate-bounce'
        }`} />
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Entropy: Lvl {chaosLevel}
          </span>
          <span className="text-[10px] font-semibold text-slate-700 hidden sm:inline">
            ({info.name})
          </span>
        </div>
        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden mt-0.5">
          <div
            className={`h-full transition-all duration-300 ${
              chaosLevel === 0 ? 'bg-emerald-500' :
              chaosLevel === 1 ? 'bg-blue-500' :
              chaosLevel === 2 ? 'bg-amber-500' :
              chaosLevel === 3 ? 'bg-orange-500' : 'bg-rose-600'
            }`}
            style={{ width: `${Math.min(100, (interactionCount / 75) * 100)}%` }}
          />
        </div>
      </div>

      <span className="text-[11px] font-mono text-slate-400 group-hover:text-blue-600 font-semibold px-1 bg-slate-50 rounded">
        {interactionCount} pts
      </span>
    </div>
  );
}
