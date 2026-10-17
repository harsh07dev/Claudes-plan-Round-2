# 🛍️ AuraMarket — Project: Impossible Shopping
> *"The retail platform where your cursor is mocked, your budget is questioned, and the Add to Cart button actively flees from your hand."*

Welcome to **AuraMarket**, the world’s first production-grade, pixel-perfect e-commerce platform engineered specifically as an interactive **UX Ragebait Experiment**. 

At first glance, it looks like an ultra-crisp, trustworthy, billion-dollar retail marketplace styled after Amazon and Flipkart—replete with verified reviews, Prime 1-day badges, star ratings, and crisp typography. But the moment you attempt to shop, the platform's deterministic **Chaos Engine** begins psychological warfare against your sanity.

---

## 📁 Complete File Structure

```text
Claudes-plan-Round-2/
├── index.html                           # Root HTML with Google Inter & JetBrains fonts
├── package.json                         # Dependencies (React 19, Tailwind, Framer Motion, Lucide)
├── postcss.config.js                    # PostCSS Tailwind processor
├── tailwind.config.js                   # Retail design palette & subtle micro-animations
├── vite.config.js                       # Vite compilation configuration
├── README.md                            # You are here (Ragebait Architecture Guide)
├── CHAT_LOGS.md                         # Complete historical dialogue & development log
├── public/
│   ├── favicon.svg                      # Cart logo icon
│   └── icons.svg                        # Vector assets
└── src/
    ├── main.jsx                         # React entrypoint
    ├── index.css                        # Tailwind layers & universe visual perturbation filters
    ├── app/
    │   ├── App.jsx                      # Root container, Providers, Navbar, Footer, & Dialogs
    │   └── router.jsx                   # Exactly 2 routes: / (Store) and /checkout (Checkout)
    ├── pages/
    │   ├── ShopPage.jsx                 # Storefront: Catalog grid, promo banner, filters, compare
    │   └── CheckoutPage.jsx             # Checkout gauntlet: Items, address, coupons, receipt
    ├── data/
    │   └── products.js                  # 24 realistic products with specs, ratings, and variants
    ├── chaos/
    │   ├── featureRegistry.js           # Central 100-feature registry with IDs, test triggers, & counts
    │   ├── chaosEngine.js               # Chaos escalation thresholds (Lvl 0-5), BPI, & sanity scores
    │   ├── chaosEvents.js               # Achievements, slogans, fake leaderboard, and error presets
    │   ├── contextualReactions.js       # Sarcastic affordability, deadlock diagnostics, & visit rules
    │   └── navigationRules.js           # Counter-intuitive routing quirks and button intercepts
    ├── components/
    │   ├── Navbar.jsx                   # Dynamic slogan logo, click-counting cart badge, & chaos gauge
    │   ├── SearchBar.jsx                # Shifting autocomplete, search amnesia, & affordability check
    │   ├── ProductCard.jsx              # Hover image swapper, fleeing buttons, contradictory badges
    │   ├── ProductGrid.jsx              # Disagreeing result count, inverted sorting, & deadlock empty state
    │   ├── FilterSidebar.jsx            # Inverted slider, stubborn filter clearing, & misplaced tooltip
    │   ├── ProductQuickView.jsx         # Modal: wrong variants, bi-harmonic +2 qty, inverted tabs
    │   ├── ProductGallery.jsx           # High-res thumbnail and hero image switcher
    │   ├── PromoBanner.jsx              # Ascending countdown deal banner & promotional redirect
    │   ├── CartItem.jsx                 # Line item review, quantity manipulator, & boomerang removal
    │   ├── OrderSummary.jsx             # Phantom +$12.49 drift, discount-as-charge, & backward progress
    │   ├── CouponPanel.jsx              # Disappearing vouchers, dual stack illusions, & RAGE99 verification
    │   ├── PaymentSimulator.jsx         # Inverted terms, 99% progress crash, & 42-clause policy modal
    │   ├── ChaosMeter.jsx               # Header entropy gauge & overclock trigger
    │   ├── ChaosTerminal.jsx            # In-browser developer terminal shell (`~` key)
    │   ├── FeatureChecklistDrawer.jsx   # Slide-out matrix of all 100 features with live simulation buttons
    │   ├── FakeOSDialog.jsx             # In-browser simulated Windows 11 Security biometric passkey
    │   ├── FakeMaintenanceModal.jsx     # Scheduled database defragmentation popup (wait 2 seconds)
    │   ├── SurvivalSummary.jsx          # Final survival certificate, Blood Pressure Index, & leaderboard
    │   └── ToastContainer.jsx           # Stacked contradictory notification queue
    ├── context/
    │   ├── ChaosContext.jsx             # Shared chaos state, interaction points, dialogs, & toasts
    │   └── CartContext.jsx              # Cart items, click counters, wishlist disagreements, & address
    ├── hooks/
    │   ├── useChaos.js                  # Chaos context consumer hook
    │   ├── useCart.js                   # Cart operations consumer hook
    │   └── useProductViews.js           # Deliberate product visit tracker for milestone triggers
    └── utils/
        └── pricing.js                   # Canonical business pricing vs. perturbed presentation arithmetic
```

---

## 😈 The Ragebait Encyclopedia: How We Break Your Sanity

Every interaction in AuraMarket looks innocent until you touch it. Here is the full breakdown of our psychological traps, written in their true ragebait spirit:

### Phase 1: The Context-Aware Audacity (Features 96–100)

1. **"Can You Even Afford That?" (Feature #96 & #97)**
   * *The Scam:* You search for a 55" OLED TV or a Pro 4K Monitor (anything over $500 / ₹50,000). The search bar doesn't just show results—it questions your financial life choices. An inline banner mocks your tax bracket (*"Looking at the flagship section today? Interesting financial optimism"*).
   * *The Escalation:* Search for luxury twice, and it asks if your wallet requested a recess. Search three times, and the system officially brands you a *"Luxury Window-Shopping Performance Artist."*
   * *The Mercy:* Search for a $49.99 coffee scale, and it stays dead silent.

2. **"Your Requirements Are A Problem" (Feature #98)**
   * *The Scam:* You try filtering for an artisan *TerraBrew* espresso machine inside *Apparel & Fashion*, or demand a 5-star flagship for under $50. Instead of a polite "no results", the catalog diagnoses your stubbornness:
     * *"TerraBrew Does Not Manufacture In 'Apparel & Fashion'. Department and manufacturer are in complete structural disagreement."*
     * *"The budget is strict. The brand prestige is stricter."*
     * *"Three contradictory requirements. Zero survivors. You are currently shopping for a mythical unicorn with express dispatch."*
   * *The Twist:* It gives you clickable remedy buttons that actually fix your mess.

3. **"Buy It Already" (Features #99 & #100)**
   * *The Scam:* You open the Quick View modal for the same headphones. Then you close it. Then you open it again. 
   * *Visit 3:* An alert banner greets you: *"You know the price. You know the specs. What's the holdup?"*
   * *Visit 4:* The store loses patience: *"We should start charging hourly rent for this product modal. This is officially a long-distance relationship with a shopping cart. Buy it already!"*

---

### Phase 2: Storefront Gaslighting (Features 1–40)

* **Search Amnesia (#3):** You carefully type *"mechanical keyboard"* and press Enter. The results show up, but the search box instantly wipes itself clean like you never typed a thing.
* **The Autocomplete Shell Game (#2):** You move your mouse to click an autocomplete recommendation, and the items swap physical slots milliseconds before your click lands.
* **Math Is An Opinion (#4):** The grid header proudly states: *"Showing 47 of 18 products."*
* **Anti-Gravity Sorting (#5 & #31):** Clicking *"Price: Low to High"* sorts from highest to lowest. Clicking *"Customer Reviews"* puts the worst-rated junk at the top.
* **Non-Euclidean Price Sliders (#6):** Dragging the price filter sets the minimum budget to $800 and the maximum ceiling to $50.
* **The Stubborn Filter (#7):** Clicking *"Clear All Filters"* resets everything except *ApexAudio*, which permanently binds to your session out of spite.
* **Image Bait-and-Switch (#13):** Hover your cursor over a sleek titanium smartwatch, and the photo instantly morphs into studio headphones.
* **Bi-Harmonic Quantity Controls (#17 & #18):** Need 2 items? Too bad. Clicking `+` jumps by two (1 → 3 → 5). Attempting to click `-` doesn't change your cart quantity at all—it decrements the *global warehouse stock* counter and warns you of supply chain depletion.
* **The Desperation Click Counter (#19):** Look closely at the cart badge in the navbar. It doesn't count how many units you bought; it counts **how many times you furiously clicked the Add to Cart button.**
* **The Surprise Hitchhiker (#20):** Add a 4K gaming monitor to your cart at higher chaos levels, and the cart telepathy engine sneaks an Ultrasonic Aromatherapy Diffuser in with it for free existential comfort.
* **The Ascending Deal Timer (#26):** The *"Lightning Deal Ends In"* countdown clock doesn't tick down; it ticks **upwards** (`04:12` → `04:13` → `04:14`). The deal is literally gaining time.
* **The Cowardly Button (#36):** Try moving your mouse toward *"Add to Cart"*. At higher chaos levels, the button shifts 18 pixels away to dodge your cursor.
* **Russian Doll Popups (#37):** You finally close the product modal with the `X` button, only to be slapped in the face with an exit-intent retention dialog: *"Wait! Your Shopping Aura Needs Nurturing!"*
* **The Bipolar Toast Notification (#38):** Perform any action, and a green toast proclaims: *"Action Succeeded Perfectly!"* Exactly 350ms later, a yellow toast appears underneath: *"Warning: Data Desynchronized with Quantum Mirrors."*

---

### Phase 3: The Checkout Gauntlet (Features 41–80)

* **The Boomerang Line Item (#41):** You click *Remove* on an item. It disappears. You breathe a sigh of relief. 1.8 seconds later, it reappears with a notification: *"Product refused to leave your cart."*
* **Quantity Gaslighting (#42):** The line item says *"Qty: 1"*, but the order summary totals calculate for *"Qty: 2"*.
* **The Phantom Surcharge (#43):** Summing $249.99 + $129.99? In AuraMarket, that equals $392.47 thanks to a built-in +$12.49 *"Quantum Subtotal Drift"*.
* **Discounts That Hurt (#45):** You apply coupon `SAVE20`. Instead of subtracting $20, the breakdown displays: `Promotional Adjustment: +$20.00` in bright red as an added penalty fee.
* **The Sisyphus Free Shipping Bar (#47):** The progress bar announces: *"You are $15 away from free shipping!"* Add another item, and the bar slips backward: *"You are now $25 away from free shipping!"*
* **The Address Amnesia Trap (#48):** You successfully enter a promo code, feel proud of yourself, and then type a letter into the Street Address box. **Poof.** Your coupon vanishes into thin air.
* **The Bureaucratic Coupon (#49):** Attempting to apply `SAVE20` triggers a modal demanding a secondary authorization code: `RAGE99`.
* **Express Rush Paradox (#52 & #53):** You select *Priority Express Rush Delivery ($19.99)*. The selection ring stubbornly snaps back to *Standard Ground*, charges you $19.99 anyway, and gives you an estimated delivery window of: **6 to 9 Weeks**.
* **Absurd Address Regulations (#54):** The shipping form refuses to accept your address unless it contains punctuation marks (like a period or exclamation point) and strictly forbids any mention of the word *"Tuesday"*.
* **Musical Chairs Input Fields (#55):** Focus your cursor on the *City* field, and the *City* and *State* text boxes instantly swap physical screen positions.
* **Post-Validation Erasure (#56):** You submit your address. A green checkmark confirms *"Address Validated!"*, but the *Zip Code* field immediately wipes itself blank.
* **Inverted Terms Agreement (#67):** Normal websites require checking *"I agree to the terms"*. In AuraMarket, checking the box **disables the Place Order button**. To place an order, you must deliberately leave the terms unchecked.
* **The 42-Clause Policy (#65 & #66):** Clicking *"Place Order"* doesn't buy anything—it traps you in a 42-clause simulated legal policy. Click *"Agree"*, and a second modal accuses you: *"Warning: You accepted 42 clauses in 3 seconds. Confess that you did not read them."*
* **Existential Human Verification (#62):** A two-step interrogation modal forces you to verify:
  1. *"Please confirm you are a living human."*
  2. *"Are you REALLY sure you are prepared for whatever results follow?"*
* **The 99% Meltdown (#63):** You submit your order. The simulated progress bar charges forward: 15%... 60%... 99%... It freezes for a moment. Then it drops back to **12%**: *"Recalculating digital karma (Restarting at 12%)."*
* **Simulated Windows Security (#76 & #85):** When the transaction finally processes, an authentic in-browser Windows 11 Security dialog pops up demanding your simulated PIN passkey.
* **Time-Traveling Logistics (#73):** Your final receipt tracking status says:
  * *Delivered to Front Porch: Yesterday at 4:18 PM*
  * *Departed Sorting Facility: Tomorrow at 8:00 AM*
* **The Receipt Variance (#74):** Your checkout summary total was $379.99. Your printed receipt insists the total was **$389.99**.

---

### Phase 4: Shared Systems & Developer Console (Features 81–95)

* **The 6 Levels of Chaos (#83):**
  * **Level 0 (0–4 interactions):** *Calm* — Standard retail experience.
  * **Level 1 (5–14 interactions):** *Subtle Quirks* — Minor UI anomalies.
  * **Level 2 (15–29 interactions):** *Noticeable Absurdity* — Subtotal drift and delivery lags engage.
  * **Level 3 (30–49 interactions):** *Retail Anarchy* — High-contrast theme glitches and tax mutations activate.
  * **Level 4 (50–74 interactions):** *Quantum Singularity* — Alternate-Universe surreal optical filters turn on.
  * **Level 5 (75+ interactions):** *UX Transcendence* — Final Boss Mode.
* **The Dynamic Gaslighting Logo (#90):** Hovering over the *AuraMarket* logo cycles through 8 satirical corporate taglines:
  * *"Where Shopping Meets Quantum Mechanics"*
  * *"The Cart Always Wins"*
  * *"Delivering Confusion Since 2026"*
  * *"Shopping Is Simply A Social Construct"*
  * *"Return Policy: Good Luck"*
* **Interactive Developer Console (#86):** Press the **`~` (tilde)** key anytime to bring down a retro terminal shell.
  * `help` — Lists all diagnostic tools.
  * `chaos <0-5>` — Force escalates the chaos engine to any level.
  * `trigger <id>` — Dispatches any specific feature by ID or number.
  * `universe` — Toggles the alternate-universe optical reality filter.
  * `stats` — Displays your session interactions, blood pressure, and traps sprung.
  * `reset` — Cleanly restores tranquil initial conditions (#95).
* **The Live 100-Feature Checklist (#81):** Click *"Feature Checklist"* in the top banner. Every single feature has an interactive **`[ Simulate / Trigger ]`** button so judges and testers can witness all 100 traps on demand.
* **The Survival Report & Leaderboard (#88, #89, #94):** Completing checkout opens your survival certificate showing your elapsed speedrun time, your calculated **Blood Pressure Index (e.g., 168/102 mmHg)**, sanity percentage, and where you rank against mock shoppers like *KeyboardSmash99* and *KarenFromAccounting*.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Launch Vite dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

---

## 📜 Full Conversation & Development Log
For the complete chronological transcript of how this application was designed, scaffolded, pushed to git, and iterated on, please refer to:
👉 **[CHAT_LOGS.md](./CHAT_LOGS.md)**
