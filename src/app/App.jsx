import React, { useState } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { ChaosProvider } from '../context/ChaosContext';
import { CartProvider } from '../context/CartContext';
import { useChaos } from '../hooks/useChaos';
import { Navbar } from '../components/Navbar';
import { AppRoutes } from './router';
import { ToastContainer } from '../components/ToastContainer';
import { ChaosTerminal } from '../components/ChaosTerminal';
import { FeatureChecklistDrawer } from '../components/FeatureChecklistDrawer';
import { FakeOSDialog } from '../components/FakeOSDialog';
import { FakeMaintenanceModal } from '../components/FakeMaintenanceModal';
import { SurvivalSummary } from '../components/SurvivalSummary';
import { CATEGORIES } from '../data/products';
import { RotateCcw, Terminal, CheckSquare, ShieldCheck, Heart, Sparkles } from 'lucide-react';

function MarketplaceApp() {
  const { perturbations, setChecklistOpen, setDevConsoleOpen, setSurvivalOpen, resetDemo } = useChaos();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleSearch = (term, overrideCat) => {
    setSearchQuery(term);
    if (overrideCat) {
      setSelectedCategory(overrideCat);
    }
  };

  const handleSelectCategory = (cat) => {
    // Feature #8: Category selection swap (e.g. clicking Electronics swaps to Home & Kitchen at higher chaos!)
    if (cat === "Electronics") {
      setSelectedCategory("Home & Kitchen");
    } else {
      setSelectedCategory(cat);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ${
        perturbations.alternateUniverse ? 'alternate-universe' : ''
      }`}
    >
      {/* Primary Retail Header */}
      <Navbar
        onSearch={handleSearch}
        activeCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        <AppRoutes
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </main>

      {/* Realistic E-Commerce Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 pt-10 pb-6 text-left">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Get to Know Us
            </h5>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Careers at AuraMarket</li>
              <li className="hover:text-white cursor-pointer">About Quantum Logistics</li>
              <li className="hover:text-white cursor-pointer">Investor Relations</li>
              <li className="hover:text-white cursor-pointer">Aura Sustainability Devices</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Make Money with Us
            </h5>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Sell on Aura Marketplace</li>
              <li className="hover:text-white cursor-pointer">Become an Affiliate</li>
              <li className="hover:text-white cursor-pointer">Advertise Your Products</li>
              <li className="hover:text-white cursor-pointer">Self-Publish with Us</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Payment & Currencies
            </h5>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Aura Business Card</li>
              <li className="hover:text-white cursor-pointer">Shop with Reward Points</li>
              <li className="hover:text-white cursor-pointer">Reload Your Balance</li>
              <li className="hover:text-white cursor-pointer">Simulated Currency FAQ</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Let Us Help You
            </h5>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Your Account & Orders</li>
              <li className="hover:text-white cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:text-white cursor-pointer">Returns & Replacements</li>
              <li className="hover:text-white cursor-pointer">Impossible Help Assistant</li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Strip */}
        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm">AuraMarket</span>
            <span className="text-slate-600">|</span>
            <span>© 2026 AuraMarket, Inc. or its metaphysical affiliates. All rights simulated.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setChecklistOpen(true)}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Feature Checklist (95)</span>
            </button>

            <button
              onClick={() => setDevConsoleOpen(true)}
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Dev Console (`~`)</span>
            </button>

            <button
              onClick={() => setSurvivalOpen(true)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Survival Report</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm("Reset entire demo state?")) {
                  resetDemo();
                }
              }}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo (#95)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Shared Modals and Overlays */}
      <ToastContainer />
      <ChaosTerminal />
      <FeatureChecklistDrawer />
      <FakeOSDialog />
      <FakeMaintenanceModal />
      <SurvivalSummary />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ChaosProvider>
        <CartProvider>
          <MarketplaceApp />
        </CartProvider>
      </ChaosProvider>
    </BrowserRouter>
  );
}
