import React, { useState, useEffect, useRef } from 'react';
import { useChaos } from '../hooks/useChaos';
import { FEATURE_REGISTRY } from '../chaos/featureRegistry';
import { Terminal, X, CornerDownLeft, Sparkles, AlertCircle } from 'lucide-react';

export function ChaosTerminal() {
  const {
    devConsoleOpen,
    setDevConsoleOpen,
    interactionCount,
    setInteractionCount,
    chaosLevel,
    eventLog,
    triggeredFeatures,
    triggerFeature,
    perturbations,
    setPerturbations,
    resetDemo,
    addToast
  } = useChaos();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "=== AURAMARKET CHAOS DEVELOPER ENGINE v2.6.9 ===",
    "Type 'help' to view available diagnostic commands.",
    "System status: Nominal entropy injection active."
  ]);
  const bottomRef = useRef(null);

  // Keyboard shortcut listener (`~` or `Escape`)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setDevConsoleOpen(prev => !prev);
      }
      if (e.key === 'Escape' && devConsoleOpen) {
        setDevConsoleOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [devConsoleOpen, setDevConsoleOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, `> ${input}`];

    if (cmd === 'help') {
      newHistory.push(
        "Available Diagnostic Commands:",
        "  help              - List all available console directives",
        "  stats             - Display live interaction metrics & Blood Pressure Index",
        "  chaos <0-5>       - Force override entropy escalation level",
        "  trigger <id>      - Manually dispatch a specific ragebait feature by ID",
        "  universe          - Toggle Alternate-Universe visual inversion (#91)",
        "  theme             - Toggle partial high-contrast theme glitch (#39)",
        "  log               - Print the 10 most recent chaos event log entries (#84)",
        "  unlock-all        - Test batch: fire multiple demonstration triggers",
        "  reset             - Restore clean state and zero interaction counters (#95)",
        "  clear             - Clear terminal screen buffer"
      );
    } else if (cmd === 'clear') {
      setHistory(["Terminal output buffer cleared."]);
      setInput("");
      return;
    } else if (cmd === 'stats') {
      newHistory.push(
        `Interaction Points : ${interactionCount}`,
        `Current Entropy    : Level ${chaosLevel}`,
        `Unique Traps Fired : ${Object.keys(triggeredFeatures).length} of 95`,
        `Recent Events Log  : ${eventLog.length} recorded entries`
      );
    } else if (cmd.startsWith('chaos ')) {
      const lvl = parseInt(cmd.split(' ')[1], 10);
      if (!isNaN(lvl) && lvl >= 0 && lvl <= 5) {
        const targetCount = [0, 5, 15, 30, 50, 75][lvl];
        setInteractionCount(targetCount);
        newHistory.push(`[OK] Entropy escalated to Level ${lvl} (${targetCount} interaction threshold set).`);
      } else {
        newHistory.push("[ERR] Invalid level. Usage: chaos <0-5>");
      }
    } else if (cmd === 'universe') {
      setPerturbations(prev => {
        const next = !prev.alternateUniverse;
        newHistory.push(`[OK] Alternate-Universe mode ${next ? 'ENABLED' : 'DISABLED'}.`);
        triggerFeature("shared.alternate-universe-mode", "Alternate universe mode toggled via console");
        return { ...prev, alternateUniverse: next };
      });
    } else if (cmd === 'theme') {
      setPerturbations(prev => {
        const next = !prev.themeGlitch;
        newHistory.push(`[OK] Partial theme glitch ${next ? 'ACTIVATED' : 'DEACTIVATED'}.`);
        triggerFeature("shop.theme-changes-partially", "Partial theme glitch toggled via console");
        return { ...prev, themeGlitch: next };
      });
    } else if (cmd.startsWith('trigger ')) {
      const featId = cmd.split(' ')[1];
      const match = FEATURE_REGISTRY.find(f => f.id === featId || String(f.num) === featId);
      if (match) {
        triggerFeature(match.id, "Console manual execution");
        newHistory.push(`[SUCCESS] Triggered Feature #${match.num}: ${match.name}`);
      } else {
        newHistory.push(`[ERR] Unknown feature '${featId}'. Type 'help' or check Feature Checklist.`);
      }
    } else if (cmd === 'log') {
      newHistory.push("--- RECENT CHAOS LOG ENTRIES ---");
      eventLog.slice(0, 8).forEach(ev => {
        newHistory.push(`[${ev.timestamp}] #${ev.featureNum} (${ev.category}) - ${ev.name}`);
      });
    } else if (cmd === 'unlock-all') {
      triggerFeature("shop.toast-contradictory-warning");
      triggerFeature("checkout.removed-item-reappears");
      triggerFeature("shared.simulated-os-dialogs");
      newHistory.push("[OK] Batch demonstration sequence fired.");
    } else if (cmd === 'reset') {
      resetDemo();
      newHistory.push("[OK] Reset Demo sequence executed.");
    } else {
      newHistory.push(`[ERR] Command not recognized: '${cmd}'. Type 'help' for guidance.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  if (!devConsoleOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-60 bg-slate-950 text-emerald-400 font-mono text-xs border-t-2 border-emerald-500 shadow-2xl max-h-[50vh] flex flex-col text-left">
      {/* Console Top Bar */}
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white">Chaos Engine Developer Console</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
            Interactive Shell
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 hidden sm:inline">Press `~` or Esc to close</span>
          <button
            onClick={() => setDevConsoleOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Output Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.startsWith('>') ? (
              <span className="text-amber-400 font-bold">{line}</span>
            ) : line.startsWith('[ERR]') ? (
              <span className="text-rose-400">{line}</span>
            ) : line.startsWith('[SUCCESS]') || line.startsWith('[OK]') ? (
              <span className="text-emerald-300 font-semibold">{line}</span>
            ) : (
              <span className="text-slate-300">{line}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Field */}
      <form onSubmit={handleCommand} className="bg-slate-900 p-2 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-500 font-bold pl-2">$</span>
        <input
          type="text"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command (e.g. 'help', 'stats', 'universe', 'chaos 4')..."
          className="flex-1 bg-transparent text-emerald-300 focus:outline-none text-xs font-mono"
        />
        <button type="submit" className="text-slate-400 hover:text-white pr-2">
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
