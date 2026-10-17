import { ACHIEVEMENTS, DYNAMIC_SLOGANS } from './chaosEvents';

export const CHAOS_LEVELS = [
  { level: 0, min: 0, max: 4, name: "Calm", subtitle: "Standard Retail Experience", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { level: 1, min: 5, max: 14, name: "Subtle Quirks", subtitle: "Minor UI Anomalies Detected", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { level: 2, min: 15, max: 29, name: "Noticeable Absurdity", subtitle: "Logic Is Fracturing", color: "text-amber-700 bg-amber-50 border-amber-200" },
  { level: 3, min: 30, max: 49, name: "Retail Anarchy", subtitle: "Buttons Have Their Own Free Will", color: "text-orange-700 bg-orange-50 border-orange-200" },
  { level: 4, min: 50, max: 74, name: "Quantum Singularity", subtitle: "Cart State Reaches Superposition", color: "text-rose-700 bg-rose-50 border-rose-200" },
  { level: 5, min: 75, max: Infinity, name: "UX Transcendence", subtitle: "Final Boss Mode Active", color: "text-indigo-900 bg-indigo-50 border-indigo-200" }
];

export function getChaosLevelInfo(interactionCount) {
  for (let i = CHAOS_LEVELS.length - 1; i >= 0; i--) {
    if (interactionCount >= CHAOS_LEVELS[i].min) {
      return CHAOS_LEVELS[i];
    }
  }
  return CHAOS_LEVELS[0];
}

export function calculateSanity(interactionCount) {
  const sanity = Math.max(2, 100 - Math.floor(interactionCount * 1.3));
  return `${sanity}%`;
}

export function calculateBPI(interactionCount) {
  // Blood Pressure Index (starts at 115/75, rises with chaos)
  const systolic = Math.min(210, 115 + Math.floor(interactionCount * 1.25));
  const diastolic = Math.min(130, 75 + Math.floor(interactionCount * 0.7));
  return `${systolic}/${diastolic} mmHg`;
}

export function getDynamicSlogan(interactionCount, chaosLevel) {
  const index = Math.min(DYNAMIC_SLOGANS.length - 1, chaosLevel + Math.floor(interactionCount / 15));
  return DYNAMIC_SLOGANS[index % DYNAMIC_SLOGANS.length];
}

export function checkUnlockedAchievements(triggeredFeatureIds, currentUnlocked) {
  const newUnlocked = [...currentUnlocked];
  const count = triggeredFeatureIds.length;

  ACHIEVEMENTS.forEach(ach => {
    if (!newUnlocked.includes(ach.id) && count >= ach.unlockedAt) {
      newUnlocked.push(ach.id);
    }
  });

  return newUnlocked;
}
