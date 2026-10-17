import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FEATURE_REGISTRY } from '../chaos/featureRegistry';
import { getChaosLevelInfo, checkUnlockedAchievements } from '../chaos/chaosEngine';

export const ChaosContext = createContext(null);

export function ChaosProvider({ children }) {
  const [interactionCount, setInteractionCount] = useState(0);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [triggeredFeatures, setTriggeredFeatures] = useState({});
  const [eventLog, setEventLog] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [startTime] = useState(Date.now());
  const [toasts, setToasts] = useState([]);
  const [perturbations, setPerturbations] = useState({
    subtotalMismatch: false,
    taxMutated: false,
    shippingFluctuation: false,
    discountAsCharge: false,
    totalQuantumShift: false,
    alternateUniverse: false,
    themeGlitch: false,
    reversedSort: false,
    invertedPriceRange: false,
    deliveryDateLag: false,
  });

  // Simulated OS Dialog state (#85, #76)
  const [osDialog, setOsDialog] = useState(null);

  // Fake Maintenance state (#79)
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);

  // Dev terminal & test drawer
  const [devConsoleOpen, setDevConsoleOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [survivalOpen, setSurvivalOpen] = useState(false);

  // Context-Aware Ragebait States (Features 1, 2, 3)
  const [expensiveSearchCount, setExpensiveSearchCount] = useState(0);
  const [productViewCounts, setProductViewCounts] = useState({});
  const [activeAffordabilityBanner, setActiveAffordabilityBanner] = useState(null);

  // Calculate chaos level when interactionCount changes
  useEffect(() => {
    const info = getChaosLevelInfo(interactionCount);
    if (info.level !== chaosLevel) {
      setChaosLevel(info.level);
      // Auto-enable perturbations as level rises
      if (info.level >= 2) {
        setPerturbations(prev => ({ ...prev, subtotalMismatch: true, deliveryDateLag: true }));
      }
      if (info.level >= 3) {
        setPerturbations(prev => ({ ...prev, themeGlitch: true, taxMutated: true }));
      }
      if (info.level >= 4) {
        setPerturbations(prev => ({ ...prev, alternateUniverse: true, discountAsCharge: true }));
      }
    }
  }, [interactionCount, chaosLevel]);

  // Toast removal helper
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Add toast helper
  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { id, ...toast, timestamp: Date.now() };

    setToasts(prev => [...prev.slice(-4), newToast]);

    // Auto dismiss after duration unless sticky
    if (!toast.sticky) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 4500);
    }
  }, [removeToast]);

  // Trigger Feature Core Action
  const triggerFeature = useCallback((featureId, details = "") => {
    const feature = FEATURE_REGISTRY.find(f => f.id === featureId);
    if (!feature) {
      console.warn(`Feature ${featureId} not found in registry`);
      return null;
    }

    setInteractionCount(prev => prev + 1);

    setTriggeredFeatures(prev => {
      const current = prev[featureId] || 0;
      const updated = { ...prev, [featureId]: current + 1 };
      
      // Check achievements with updated feature keys
      const allTriggeredIds = Object.keys(updated);
      setUnlockedAchievements(currAch => checkUnlockedAchievements(allTriggeredIds, currAch));

      return updated;
    });

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

    setEventLog(prev => [
      {
        id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        featureId,
        featureNum: feature.num,
        name: feature.name,
        category: feature.category,
        details: details || feature.expected,
        timestamp: timeStr,
      },
      ...prev.slice(0, 99) // keep recent 100 in memory
    ]);

    // Feature #38: Contradictory toast queue helper
    if (featureId === "shop.toast-contradictory-warning" || featureId === "shared.contradictory-toast-queue") {
      addToast({
        title: "Action Succeeded Perfectly",
        message: "Your preferences were permanently registered into the central datastore.",
        type: "success"
      });
      setTimeout(() => {
        addToast({
          title: "Warning: Data Desynchronized",
          message: "Preferences could not be verified by redundant quantum mirrors. Proceed with caution.",
          type: "warning"
        });
      }, 350);
    }

    // Feature #85: Simulated OS Dialog trigger helper
    if (featureId === "shared.simulated-os-dialogs" || featureId === "checkout.final-conf-opens-fake-os-dialog") {
      setOsDialog({
        title: "Windows Security - Authenticate Shopping Intent",
        message: "AuraMarket.exe wants to access your biometric credentials to finalize simulated transaction.",
        style: "win11",
        onConfirm: () => setOsDialog(null),
        onCancel: () => setOsDialog(null)
      });
    }

    return feature;
  }, [addToast]);

  // Reset Demo completely
  const resetDemo = useCallback(() => {
    setInteractionCount(0);
    setChaosLevel(0);
    setTriggeredFeatures({});
    setEventLog([]);
    setUnlockedAchievements([]);
    setToasts([]);
    setPerturbations({
      subtotalMismatch: false,
      taxMutated: false,
      shippingFluctuation: false,
      discountAsCharge: false,
      totalQuantumShift: false,
      alternateUniverse: false,
      themeGlitch: false,
      reversedSort: false,
      invertedPriceRange: false,
      deliveryDateLag: false,
    });
    setOsDialog(null);
    setMaintenanceOpen(false);
    setSurvivalOpen(false);
    setExpensiveSearchCount(0);
    setProductViewCounts({});
    setActiveAffordabilityBanner(null);

    // Trigger reset notification
    addToast({
      title: "Demo Reset Successfully",
      message: "All simulated state, cart anomalies, and interaction counts have been restored to clean state.",
      type: "info"
    });
  }, [addToast]);

  return (
    <ChaosContext.Provider
      value={{
        interactionCount,
        setInteractionCount,
        chaosLevel,
        triggeredFeatures,
        eventLog,
        unlockedAchievements,
        startTime,
        toasts,
        addToast,
        removeToast,
        perturbations,
        setPerturbations,
        osDialog,
        setOsDialog,
        maintenanceOpen,
        setMaintenanceOpen,
        devConsoleOpen,
        setDevConsoleOpen,
        checklistOpen,
        setChecklistOpen,
        survivalOpen,
        setSurvivalOpen,
        triggerFeature,
        resetDemo,
        expensiveSearchCount,
        setExpensiveSearchCount,
        productViewCounts,
        setProductViewCounts,
        activeAffordabilityBanner,
        setActiveAffordabilityBanner
      }}
    >
      {children}
    </ChaosContext.Provider>
  );
}
