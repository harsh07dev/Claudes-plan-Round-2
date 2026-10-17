// Rules and helpers for navigation-related ragebait interactions

export const NAVIGATION_RULES = {
  // Feature #58: Edit Cart navigates incorrectly (e.g. scrolls to coupon or stays in checkout)
  editCartAction: (navigate, triggerFeature, addToast) => {
    triggerFeature("checkout.edit-cart-navigates-incorrectly");
    addToast({
      title: "Cart Re-indexing in Progress",
      message: "Direct cart editing is temporarily deferred to optimize existential balance.",
      type: "info"
    });
    // Deliberately scroll to coupon panel or stay put instead of normal / navigation
    const couponEl = document.getElementById("coupon-section");
    if (couponEl) {
      couponEl.scrollIntoView({ behavior: "smooth" });
    }
  },

  // Feature #59: Continue Shopping opens a checkout dialog
  continueShoppingAction: (setLeaveDialogOpen, triggerFeature) => {
    triggerFeature("checkout.continue-shopping-opens-dialog");
    setLeaveDialogOpen(true);
  }
};
