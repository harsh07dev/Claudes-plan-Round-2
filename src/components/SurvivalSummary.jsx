import React, { useState, useEffect } from 'react';
import { useChaos } from '../hooks/useChaos';
import { calculateSanity, calculateBPI } from '../chaos/chaosEngine';
import { FAKE_LEADERBOARD, ACHIEVEMENTS } from '../chaos/chaosEvents';
import { Trophy, Clock, Activity, Award, RotateCcw, X, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export function SurvivalSummary() {
  const {
    survivalOpen,
    setSurvivalOpen,
    interactionCount,
    triggeredFeatures,
    unlockedAchievements,
    startTime,
    resetDemo
  } = useChaos();

  const [elapsedTime, setElapsedTime] = useState("00:00");

  useEffect(() => {
    if (!survivalOpen) return;
    const updateTime = () => {
      const totalSec = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      setElapsedTime(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [survivalOpen, startTime]);

  if (!survivalOpen) return null;

  const sanityPercent = calculateSanity(interactionCount);
  const bpiScore = calculateBPI(interactionCount);
  const trapsCount = Object.keys(triggeredFeatures).length;

  return (
    <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200 text-left">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy to-slate-900 text-white p-6 relative">
          <button
            onClick={() => setSurvivalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 fill-current" />
            <span>Official Survival Certificate</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Impossible Checkout Survival Report
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            You navigated through intentionally contradictory retail phenomena without surrendering to despair.
          </p>
        </div>

        {/* Live Metrics Grid (#88: Session speedrun stats) */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Metric 1: Elapsed Time */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <Clock className="w-4 h-4 mx-auto text-blue-600 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Speedrun Time</span>
              <h4 className="text-base font-black text-slate-900 font-mono mt-0.5">{elapsedTime}</h4>
            </div>

            {/* Metric 2: Interaction Points */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <Activity className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Interactions</span>
              <h4 className="text-base font-black text-slate-900 font-mono mt-0.5">{interactionCount}</h4>
            </div>

            {/* Metric 3: Traps Triggered */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <ShieldAlert className="w-4 h-4 mx-auto text-amber-600 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Traps Sprung</span>
              <h4 className="text-base font-black text-slate-900 font-mono mt-0.5">{trapsCount} / 95</h4>
            </div>

            {/* Metric 4: Sanity Remaining */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <Sparkles className="w-4 h-4 mx-auto text-rose-600 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sanity Score</span>
              <h4 className="text-base font-black text-slate-900 font-mono mt-0.5">{sanityPercent}</h4>
            </div>
          </div>

          {/* Blood Pressure Index & Medical Advisory */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-900">Estimated Blood Pressure Index (BPI):</span>
              <span className="ml-2 font-mono font-bold text-amber-800">{bpiScore}</span>
            </div>
            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-semibold">
              Elevated But Stable
            </span>
          </div>

          {/* Unlocked Achievements Section (#87) */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-navy" />
              <span>Session Badges Unlocked ({unlockedAchievements.length} of {ACHIEVEMENTS.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACHIEVEMENTS.map(ach => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-2.5 rounded-lg border flex items-center gap-2.5 transition-all ${
                      isUnlocked
                        ? 'border-emerald-200 bg-emerald-50/60 text-emerald-950'
                        : 'border-slate-200 bg-slate-50 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isUnlocked ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold leading-tight truncate">{ach.title}</h5>
                      <p className="text-[10px] text-slate-500 truncate leading-snug">{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Local Fake Leaderboard Section (#89) */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Hall of Persistence Leaderboard</span>
              <span className="text-[10px] font-normal text-slate-400">Local-only sandbox records</span>
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Rank</th>
                    <th className="py-2 px-3">Shopper</th>
                    <th className="py-2 px-3">Traps Evaded</th>
                    <th className="py-2 px-3">Time</th>
                    <th className="py-2 px-3">Sanity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {FAKE_LEADERBOARD.map(entry => (
                    <tr
                      key={entry.rank}
                      className={entry.name.includes("Current Session") ? "bg-blue-50/80 font-bold text-navy" : ""}
                    >
                      <td className="py-1.5 px-3">#{entry.rank}</td>
                      <td className="py-1.5 px-3 font-sans font-medium">{entry.name}</td>
                      <td className="py-1.5 px-3">{entry.rank === 6 ? `${trapsCount}/95` : entry.score}</td>
                      <td className="py-1.5 px-3">{entry.rank === 6 ? elapsedTime : entry.time}</td>
                      <td className="py-1.5 px-3">{entry.rank === 6 ? sanityPercent : entry.sanity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions: Reset Demo (#95) & Dismiss */}
          <div className="pt-2 border-t border-slate-100 flex justify-between gap-3">
            <button
              onClick={() => {
                if (window.confirm("Restore clean tranquil state and reset interaction points?")) {
                  resetDemo();
                  setSurvivalOpen(false);
                }
              }}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Entire Demo (#95)</span>
            </button>

            <button
              onClick={() => setSurvivalOpen(false)}
              className="px-5 py-2 bg-navy hover:bg-navy-hover text-white text-xs font-bold rounded-lg"
            >
              Close Survival Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
