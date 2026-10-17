# AuraMarket — Project: Impossible Shopping
> A visually polished, realistic e-commerce platform with 95 intentionally implemented UX ragebait interactions.

## 🎯 Project Overview
**AuraMarket** looks and feels like a tier-one online shopping marketplace (inspired by Amazon and Flipkart) with restrained navy accents, clean typography, realistic product cards, customer reviews, discount badges, and a simulated checkout flow.

Beneath the polished surface lies a deterministic **Chaos Engine** powering **95 distinct, reproducible ragebait interactions and systems**:
- **Store Features (1–40)**: Search amnesia, shifting autocomplete, reversed price/rating sorting, inverted price range slider, stubborn filter clearing, variant and product swaps, click-counting cart badges, and contradicting deal countdowns.
- **Checkout Features (41–80)**: Persistent un-removable items, subtotal drift, phantom tax fluctuations, discounts rendered as positive surcharges, fluctuating shipping fees, disappearing coupons, absurd address validation, swappable delivery fields, 99% progress resets, and simulated operating system authentication dialogs.
- **Shared Systems (81–95)**: Centralized Feature Registry, cross-route shared state persistence, escalation thresholds (Levels 0–5), event logger, fake developer console (`~`), 8 unlockable achievements, speedrun metrics, fake leaderboard, dynamic slogan logos, alternate-universe mode, contradictory toast queue, survival report, and demo reset.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Animations & Effects**: Framer Motion & Canvas Confetti

---

## 🧭 Routes & Architecture
- **Storefront (`/`)**: Main marketplace catalog with category navigation, quick view modal, filters, deals banner, and product comparisons.
- **Simulated Checkout (`/checkout`)**: Multi-step checkout pipeline with item review, delivery selection, voucher redemption, fictional address validation, and simulated payment gateways.

### Developer Tools & Testing Drawer
- **Feature Checklist (95/95)**: Click the **"Feature Checklist (95/95)"** link in the top bar to open the slide-out test matrix. Every feature includes a live triggered counter and a **"Simulate / Trigger"** button for immediate verification.
- **Chaos Developer Console**: Press the **`~` (tilde)** key or click **"Dev Console"** in the footer to access the command-line shell (`help`, `chaos <0-5>`, `trigger <id>`, `universe`, `stats`, `log`, `reset`).
- **Survival Report**: Access live speedrun statistics, Blood Pressure Index (BPI), and the Hall of Persistence leaderboard upon completing checkout or via the footer link.
