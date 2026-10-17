import React from 'react';
import { useChaos } from '../hooks/useChaos';
import { CheckCircle2, AlertTriangle, Info, AlertOctagon, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useChaos();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = "bg-white border-slate-200 text-slate-800";
        let Icon = Info;
        let iconColor = "text-blue-600";

        if (toast.type === "success") {
          bg = "bg-emerald-50 border-emerald-200 text-emerald-950";
          Icon = CheckCircle2;
          iconColor = "text-emerald-600";
        } else if (toast.type === "warning") {
          bg = "bg-amber-50 border-amber-200 text-amber-950";
          Icon = AlertTriangle;
          iconColor = "text-amber-600";
        } else if (toast.type === "error") {
          bg = "bg-rose-50 border-rose-200 text-rose-950";
          Icon = AlertOctagon;
          iconColor = "text-rose-600";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-lg border shadow-lg flex items-start gap-3 transition-all duration-200 animate-in slide-in-from-bottom-2 ${bg}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold leading-tight uppercase tracking-wider opacity-90">{toast.title}</h4>
              <p className="text-xs mt-1 leading-snug opacity-80">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
