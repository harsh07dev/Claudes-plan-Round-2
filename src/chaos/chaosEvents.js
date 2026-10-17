// Predefined presets, achievements, slogans, and fake leaderboard data

export const ACHIEVEMENTS = [
  {
    id: "first_glitch",
    title: "Glitch Novice",
    desc: "Encountered your first intentional UX ragebait interaction.",
    icon: "Sparkles",
    unlockedAt: 1
  },
  {
    id: "stubborn_shopper",
    title: "Stubborn Shopper",
    desc: "Attempted to fight the inverted filters 3 times.",
    icon: "Filter",
    unlockedAt: 5
  },
  {
    id: "cart_chaos",
    title: "Cart Telepathy",
    desc: "Added an item to cart and discovered a mystery product joined it.",
    icon: "ShoppingBag",
    unlockedAt: 10
  },
  {
    id: "coupon_victim",
    title: "Coupon Houdini",
    desc: "Watched a promo discount vanish before your eyes.",
    icon: "Tag",
    unlockedAt: 20
  },
  {
    id: "patience_god",
    title: "Saint of Persistence",
    desc: "Navigated through 35+ ragebait traps without closing the tab.",
    icon: "Award",
    unlockedAt: 35
  },
  {
    id: "alternate_dimension",
    title: "Dimensional Traveler",
    desc: "Discovered the Alternate Universe mode.",
    icon: "Globe",
    unlockedAt: 50
  },
  {
    id: "final_survivor",
    title: "Impossible Checkout Survivor",
    desc: "Completed the simulated checkout sequence against all odds.",
    icon: "Trophy",
    unlockedAt: 75
  },
  {
    id: "speedrun_master",
    title: "Rage Speedrunner",
    desc: "Triggered 15 features in under 3 minutes.",
    icon: "Zap",
    unlockedAt: 15
  }
];

export const FAKE_LEADERBOARD = [
  { rank: 1, name: "KeyboardSmash99", score: "94/95 Traps", time: "02:18", sanity: "4%" },
  { rank: 2, name: "KarenFromAccounting", score: "88/95 Traps", time: "03:45", sanity: "11%" },
  { rank: 3, name: "ZenBuddhistShopper", score: "82/95 Traps", time: "05:12", sanity: "89%" },
  { rank: 4, name: "BrowserTabHoarder", score: "76/95 Traps", time: "06:30", sanity: "25%" },
  { rank: 5, name: "CheckoutSpeedster", score: "69/95 Traps", time: "07:05", sanity: "32%" },
  { rank: 6, name: "You (Current Session)", score: "Active", time: "Live", sanity: "Evaluating..." }
];

export const DYNAMIC_SLOGANS = [
  "Premium Online Marketplace",
  "Where Shopping Meets Quantum Mechanics",
  "Every Click Is A New Surprise",
  "The Cart Always Wins",
  "Delivering Confusion Since 2026",
  "Shopping Is Simply A Social Construct",
  "Return Policy: Good Luck",
  "Logic Sold Separately"
];

export const ABSURD_ADDRESS_ERRORS = [
  "Street address must contain at least one exclamation point and cannot mention vowels.",
  "City name is not recognized by the Intergalactic Postal Union.",
  "Postal code contains suspicious alignment with lunar tides.",
  "Apartment number must be an imaginary number (e.g. 4i).",
  "Shipping to this street is only permitted on alternate Thursdays."
];
