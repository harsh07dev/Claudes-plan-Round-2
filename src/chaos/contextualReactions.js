// Context-Aware Shopping Ragebait Engine: Curated Reactions & Diagnostic Evaluators

export const AFFORDABILITY_CONFIG = {
  // Configurable threshold: ₹50,000 / $500 equivalent in catalog currency
  priceThreshold: 500,
  inrThreshold: 50000,
  currencySymbol: "$"
};

// ==========================================
// FEATURE 1: EXPENSIVE SEARCH REACTIONS
// ==========================================

const EXPENSIVE_SEARCH_REACTIONS_TIER_1 = [
  "Looking at the flagship section today? Interesting financial optimism.",
  "That price tag has entered the chat. Bold taste in hardware.",
  "Luxury-grade inquiry detected. Let's see what the budget says.",
  "High-roller query submitted. Deep breaths before checking the savings balance.",
  "You searched for it. Your wallet has preliminary questions.",
  "That is a serious amount of money for one search query."
];

const EXPENSIVE_SEARCH_REACTIONS_TIER_2 = [
  "Back to the four-figure catalog? Your checking account is requesting a recess.",
  "Another premium flagship query. The digital bank vault is watching nervously.",
  "Big purchase energy. Are we actually committing or just window-shopping luxury?",
  "Consecutive high-ticket searches registered. Someone is feeling ambitious today."
];

const EXPENSIVE_SEARCH_REACTIONS_TIER_3 = [
  "Multiple high-ticket queries in one session. This is officially luxury window-shopping performance art.",
  "AuraMarket Financial Advisory: You have queried multiple premium flagships. We respect the ambition, even if the bank statement trembles.",
  "At this rate of high-end searches, our recommendation algorithm is assuming you inherited an estate."
];

export function getAffordabilityReaction(highestProduct, count = 1) {
  if (!highestProduct) return null;

  const priceFormatted = `$${highestProduct.salePrice.toFixed(2)}`;
  let pool = EXPENSIVE_SEARCH_REACTIONS_TIER_1;

  if (count === 2) {
    pool = EXPENSIVE_SEARCH_REACTIONS_TIER_2;
  } else if (count >= 3) {
    pool = EXPENSIVE_SEARCH_REACTIONS_TIER_3;
  }

  const index = (count - 1) % pool.length;
  const quote = pool[index];

  return {
    quote,
    productName: highestProduct.name,
    productPrice: highestProduct.salePrice,
    priceFormatted,
    escalationLevel: count >= 3 ? 3 : count,
    badgeText: count >= 3 ? "Flagship Habit Detected" : count === 2 ? "High-Roller Alert" : "Premium Query"
  };
}

// ==========================================
// FEATURE 2: RESTRICTIVE FILTER DEADLOCK ANALYSIS
// ==========================================

export function analyzeFilterDeadlock({
  activeCategory,
  selectedBrand,
  selectedRating,
  priceRange,
  searchQuery,
  allProducts
}) {
  const isCategoryRestricted = activeCategory && activeCategory !== "All Categories";
  const isBrandRestricted = Boolean(selectedBrand);
  const isRatingRestricted = selectedRating > 0;
  const isPriceRestricted = priceRange && (priceRange[0] > 20 || priceRange[1] < 1200 || priceRange[0] > priceRange[1]);
  const isSearchRestricted = Boolean(searchQuery && searchQuery.trim());

  // Count active restrictions
  const activeCount = [
    isCategoryRestricted,
    isBrandRestricted,
    isRatingRestricted,
    isPriceRestricted,
    isSearchRestricted
  ].filter(Boolean).length;

  // Check if Brand exists in Category
  if (isBrandRestricted && isCategoryRestricted) {
    const brandInCat = allProducts.filter(p => p.brand === selectedBrand && p.category === activeCategory);
    if (brandInCat.length === 0) {
      return {
        reason: "brand_category_mismatch",
        headline: `${selectedBrand} Does Not Manufacture In '${activeCategory}'`,
        description: `Department and manufacturer are in structural disagreement. ${selectedBrand} does not produce items in this department.`,
        suggestions: [
          { label: `View all ${selectedBrand} products`, action: "clear_category" },
          { label: `View all products in ${activeCategory}`, action: "clear_brand" },
          { label: "Clear all filters", action: "clear_all" }
        ]
      };
    }
  }

  // Check if Brand exists at this Price Ceiling
  if (isBrandRestricted && priceRange && priceRange[1] < 150) {
    const brandProducts = allProducts.filter(p => p.brand === selectedBrand);
    const minBrandPrice = brandProducts.length > 0 ? Math.min(...brandProducts.map(p => p.salePrice)) : 0;
    if (minBrandPrice > priceRange[1]) {
      return {
        reason: "brand_vs_budget",
        headline: "The Budget Is Strict. The Brand Preference Is Stricter.",
        description: `${selectedBrand} products start at $${minBrandPrice.toFixed(2)}. Your current price ceiling of $${priceRange[1]} filtered out the entire catalog for this brand.`,
        suggestions: [
          { label: `Raise budget to at least $${Math.ceil(minBrandPrice + 10)}`, action: "raise_budget_target", targetPrice: Math.ceil(minBrandPrice + 50) },
          { label: `Remove ${selectedBrand} filter`, action: "clear_brand" },
          { label: "Clear all filters", action: "clear_all" }
        ]
      };
    }
  }

  // Check if Rating requirement eliminated everything
  if (isRatingRestricted && activeCount <= 2) {
    return {
      reason: "rating_too_strict",
      headline: "Demanding Perfection: The Catalog Respectfully Declined",
      description: "Your minimum rating requirement filtered out every available option in this subset. Even flagship items failed the audition.",
      suggestions: [
        { label: "Relax rating requirement", action: "clear_rating" },
        { label: "Clear all filters", action: "clear_all" }
      ]
    };
  }

  // Price Inversion or Extreme Ceiling
  if (priceRange && (priceRange[0] > priceRange[1] || priceRange[1] < 50)) {
    return {
      reason: "price_too_restrictive",
      headline: "Zero Products Survived Your Budgetary Perimeter",
      description: priceRange[0] > priceRange[1]
        ? "Your price range is currently inverted (Min price is higher than Max price). Physics and commerce cannot reconcile this."
        : `Your maximum budget of $${priceRange[1]} eliminated all current retail inventory. Inflation sends its regards.`,
      suggestions: [
        { label: "Reset price range to $20 - $1,200", action: "reset_price" },
        { label: "Clear all filters", action: "clear_all" }
      ]
    };
  }

  // Multiple combined filters
  if (activeCount >= 3) {
    return {
      reason: "multiple_constraints",
      headline: "Three Requirements. Zero Survivors.",
      description: "Your combination of category, brand, rating, and pricing parameters is shopping for a mythical unicorn with express dispatch.",
      suggestions: [
        { label: "Remove brand filter", action: "clear_brand" },
        { label: "Reset price range", action: "reset_price" },
        { label: "Relax rating filter", action: "clear_rating" },
        { label: "Clear all filters", action: "clear_all" }
      ]
    };
  }

  // Default fallback for search or single constraint
  return {
    reason: "general_deadlock",
    headline: "Your Filters And The Catalog Are Having A Philosophical Disagreement",
    description: "No product in the active inventory satisfied all specified parameters concurrently.",
    suggestions: [
      { label: "Clear all filters", action: "clear_all" }
    ]
  };
}

// ==========================================
// FEATURE 3: REPEATED PRODUCT VISIT MILESTONES
// ==========================================

export function getProductVisitReaction(productName, visitCount) {
  if (!visitCount || visitCount < 3) return null;

  if (visitCount === 3) {
    return {
      milestone: 3,
      badge: "Visit #3",
      headline: "You know the price. You know the specs. What's the holdup?",
      message: `You've opened '${productName}' three times this session. At this point, it deserves a trial run in your cart.`,
      ctaText: "Add to Cart Already",
      level: "nudge"
    };
  }

  if (visitCount === 4 || visitCount === 5) {
    return {
      milestone: visitCount,
      badge: `Visit #${visitCount}`,
      headline: "We should start charging hourly rent for this product modal.",
      message: `This is officially becoming a long-distance relationship with '${productName}'. Your cursor says yes, but your hesitation says maybe later.`,
      ctaText: "End the Hesitation • Add to Cart",
      level: "provocation"
    };
  }

  // Subsequent visits: 6+
  return {
    milestone: visitCount,
    badge: `Visit #${visitCount}`,
    headline: `Visit #${visitCount}: You have inspected this enough to write the official user review.`,
    message: `Our warehouse team has memorized your interest in '${productName}'. Buy it already or declare it your digital heirloom.`,
    ctaText: "Adopt This Item Now",
    level: "insistence"
  };
}
