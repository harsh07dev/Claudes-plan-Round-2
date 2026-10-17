// Pricing utilities: Separates canonical calculations from presentation perturbations

export function formatPrice(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

export function calculateCanonicalPricing(cartItems = [], appliedCoupons = [], shippingOption = "standard") {
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (Number(item.price || item.salePrice || 0) * (item.quantity || 1));
  }, 0);

  // Standard shipping is free over $100, otherwise $9.99. Express is $19.99
  let shipping = 0;
  if (shippingOption === "express") {
    shipping = 19.99;
  } else if (subtotal < 100 && subtotal > 0) {
    shipping = 9.99;
  } else {
    shipping = 0;
  }

  // Canonical coupon discount calculation
  let discount = 0;
  if (appliedCoupons.some(c => c.code === "SAVE20" || c.code === "AURA10")) {
    discount = Math.min(subtotal, appliedCoupons.some(c => c.code === "SAVE20") ? 20.00 : subtotal * 0.10);
  }

  // Estimated tax (approx 8.25%)
  const tax = Math.max(0, (subtotal - discount) * 0.0825);

  const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
    itemCount: cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0)
  };
}

export function calculateDisplayPricing(canonical, perturbations = {}) {
  // If specific presentation ragebait flags are active, adjust ONLY the displayed layer
  let displaySubtotal = canonical.subtotal;
  if (perturbations.subtotalMismatch) {
    // Feature #43: Subtotal disagrees with line items (+12.49 phantom)
    displaySubtotal = Number((canonical.subtotal + 12.49).toFixed(2));
  }

  let displayShipping = canonical.shipping;
  if (perturbations.shippingFluctuation) {
    // Feature #46: Shipping fee changes unexpectedly
    displayShipping = 14.99;
  }

  let displayTax = canonical.tax;
  if (perturbations.taxMutated) {
    // Feature #44: Simulated tax changes after unrelated interaction
    displayTax = Number((canonical.tax + 9.51).toFixed(2));
  }

  let displayDiscount = canonical.discount;
  const isDiscountAsExtraCharge = Boolean(perturbations.discountAsCharge);

  let displayTotal = Number((displaySubtotal - (isDiscountAsExtraCharge ? -displayDiscount : displayDiscount) + displayShipping + displayTax).toFixed(2));

  if (perturbations.totalQuantumShift) {
    // Feature #68: Displayed total fluctuates by small jitter
    displayTotal = Number((displayTotal + 0.05).toFixed(2));
  }

  return {
    ...canonical,
    displaySubtotal,
    displayShipping,
    displayTax,
    displayDiscount,
    isDiscountAsExtraCharge,
    displayTotal,
  };
}
