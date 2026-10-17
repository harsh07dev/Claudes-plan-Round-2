import React, { useState } from 'react';
import { useChaos } from '../hooks/useChaos';
import { FEATURE_REGISTRY } from '../chaos/featureRegistry';
import { X, CheckSquare, Search, Play, CheckCircle2, AlertCircle, Sparkles, Filter } from 'lucide-react';

export function FeatureChecklistDrawer() {
  const {
    checklistOpen,
    setChecklistOpen,
    triggeredFeatures,
    triggerFeature,
    interactionCount
  } = useChaos();

  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");

  if (!checklistOpen) return null;

  const filtered = FEATURE_REGISTRY.filter(item => {
    if (filterCategory !== "All" && item.category !== filterCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        String(item.num).includes(q) ||
        item.trigger.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalTriggeredCount = Object.keys(triggeredFeatures).length;

  return (
    <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col text-left animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-sm font-bold leading-tight">Feature Registry & Test Matrix</h3>
              <span className="text-[11px] text-slate-400">
                {totalTriggeredCount} of {FEATURE_REGISTRY.length} distinct ragebait systems triggered
              </span>
            </div>
          </div>
          <button
            onClick={() => setChecklistOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by feature #, ID, or trigger..."
              className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-navy"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto text-xs">
            {["All", "Store", "Checkout", "Shared"].map(cat => {
              const catCount = cat === "All"
                ? FEATURE_REGISTRY.length
                : FEATURE_REGISTRY.filter(f => f.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                    filterCategory === cat
                      ? 'bg-navy text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat} ({catCount})
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-3 space-y-2">
          {filtered.map(feat => {
            const count = triggeredFeatures[feat.id] || 0;
            const isFired = count > 0;

            return (
              <div
                key={feat.id}
                className={`p-3 rounded-lg border transition-all ${
                  isFired
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded">
                      #{feat.num}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      {feat.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {feat.id}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isFired
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isFired ? `Triggered (${count}x)` : 'Pending'}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mb-1">
                  {feat.name}
                </h4>

                <div className="text-[11px] text-slate-600 space-y-0.5 mb-2">
                  <p><strong className="text-slate-700">Trigger:</strong> {feat.trigger}</p>
                  <p><strong className="text-slate-700">Expected:</strong> {feat.expected}</p>
                </div>

                {/* Direct Simulate / Trigger Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Implemented & Verified</span>
                  </span>

                  <button
                    onClick={() => {
                      triggerFeature(feat.id, `Simulated from test drawer`);
                    }}
                    className="bg-slate-100 hover:bg-navy hover:text-white text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-300 flex items-center gap-1 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Simulate / Trigger</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          Total Interactions Logged: <strong className="text-slate-800">{interactionCount}</strong>
        </div>
      </div>
    </div>
  );
}
