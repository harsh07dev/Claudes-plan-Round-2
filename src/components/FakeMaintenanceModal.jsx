import React, { useEffect, useState } from 'react';
import { useChaos } from '../hooks/useChaos';
import { Database, Loader2, CheckCircle2 } from 'lucide-react';

export function FakeMaintenanceModal() {
  const { maintenanceOpen, setMaintenanceOpen, triggerFeature } = useChaos();
  const [countdown, setCountdown] = useState(2);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!maintenanceOpen) {
      setCountdown(2);
      setDone(false);
      return;
    }

    triggerFeature("checkout.fake-maintenance-dialog", "Brief maintenance dialog appeared during order flow");

    const timer1 = setTimeout(() => {
      setCountdown(1);
    }, 1000);

    const timer2 = setTimeout(() => {
      setCountdown(0);
      setDone(true);
    }, 2000);

    const timer3 = setTimeout(() => {
      setMaintenanceOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [maintenanceOpen, setMaintenanceOpen, triggerFeature]);

  if (!maintenanceOpen) return null;

  return (
    <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-slate-300 shadow-2xl text-center space-y-4 animate-in zoom-in-95">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          {done ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          ) : (
            <Database className="w-6 h-6 animate-bounce" />
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {done ? "Maintenance Complete!" : "Scheduled Database Defragmentation"}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            {done
              ? "All cluster partitions aligned. Returning to simulated checkout..."
              : `Optimizing regional storage nodes. Estimated wait: ${countdown} seconds...`}
          </p>
        </div>

        {!done ? (
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Vacuuming SQL indexes...</span>
          </div>
        ) : (
          <span className="text-xs font-bold text-emerald-600">0.002ms latency achieved!</span>
        )}
      </div>
    </div>
  );
}
