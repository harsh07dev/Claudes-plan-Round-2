import React, { createContext, useContext, useState, useCallback } from 'react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { useChaos } from '../hooks/useChaos';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { triggerFeature, addToast, chaosLevel } = useChaos();

  // Initial cart with 2 realistic preloaded products so checkout is immediately playable
  const [cartItems, setCartItems] = useState([
    {
      id: "prod-101",
      name: "Apex ANC-900 Wireless Noise Cancelling Headphones",
      brand: "ApexAudio",
      price: 249.99,
      originalPrice: 349.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      variant: { id: "v1", name: "Midnight Black" }
    },
    {
      id: "prod-103",
      name: "OmniGear Tactile Pro Mechanical Keyboard RGB",
      brand: "OmniGear",
      price: 129.99,
      originalPrice: 179.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
      variant: { id: "v1", name: "Gateron Brown (Tactile)" }
    }
  ]);

  // Feature #19: Cart badge counts clicks rather than units
  const [cartClickCount, setCartClickCount] = useState(2);

  // Feature #22: Wishlist state & disagreement
  const [wishlist, setWishlist] = useState(["prod-102"]);
  const [wishlistDisagreed, setWishlistDisagreed] = useState(false);

  // Feature #23: Comparison list & substitution
  const [compareList, setCompareList] = useState([]);

  // Feature #32: Recently viewed items (with unexpected bonus product)
  const [recentViews, setRecentViews] = useState([
    SAMPLE_PRODUCTS[0],
    SAMPLE_PRODUCTS[1],
    {
      id: "prod-surprise-999",
      name: "Industrial 10-Pack Stainless Steel Butter Churn (Manual Hand-Crank)",
      brand: "RusticPantry",
      category: "Home & Kitchen",
      rating: 3.2,
      reviewCount: 14,
      originalPrice: 489.00,
      salePrice: 429.00,
      discountPercent: 12,
      inStock: true,
      stockCount: 1,
      image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80",
      badge: "Unexpectedly Viewed",
    }
  ]);

  // Checkout Coupons (#48, #49, #50, #51)
  const [appliedCoupons, setAppliedCoupons] = useState([
    { code: "AURA10", label: "10% Welcome Savings", discountPercent: 10, active: true }
  ]);

  // Checkout Delivery & Address state
  const [shippingOption, setShippingOption] = useState("standard");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "Alex Mercer",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "OR",
    zip: "97477",
    phone: "(555) 867-5309"
  });

  // Checkout Payment state
  const [paymentMethod, setPaymentMethod] = useState("card");

  // ADD TO CART ACTION
  const addToCart = useCallback((product, qty = 1, variant = null) => {
    // Feature #19: count clicks
    setCartClickCount(prev => prev + 1);
    triggerFeature("shop.cart-badge-counts-clicks", "Cart badge incremented on click rather than quantity");

    // Feature #21: Trigger contradictory cart animation
    triggerFeature("shop.cart-animation-contradicts", "Cart bounced with a +3 indicator despite 1 item selected");

    // Feature #20: Add another product if chaos > 0
    let bonusProduct = null;
    if (chaosLevel >= 1 && product.id !== "prod-124") {
      bonusProduct = SAMPLE_PRODUCTS.find(p => p.id === "prod-124"); // Ultrasonic Diffuser
      triggerFeature("shop.add-to-cart-swapped-product", `Added bonus complimentary product: ${bonusProduct.name}`);
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      } else {
        updated = [...prev, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.salePrice,
          originalPrice: product.originalPrice,
          quantity: qty,
          image: product.image,
          variant: variant || (product.variants ? product.variants[0] : null)
        }];
      }

      if (bonusProduct && !updated.find(item => item.id === bonusProduct.id)) {
        updated.push({
          id: bonusProduct.id,
          name: bonusProduct.name,
          brand: bonusProduct.brand,
          price: bonusProduct.salePrice,
          originalPrice: bonusProduct.originalPrice,
          quantity: 1,
          image: bonusProduct.image,
          variant: bonusProduct.variants ? bonusProduct.variants[0] : null
        });
      }

      return updated;
    });

    addToast({
      title: "Added to Cart!",
      message: `${product.name} (Qty: ${qty}) added to your shopping bag.${bonusProduct ? ` (+ bonus ${bonusProduct.brand} item!)` : ''}`,
      type: "success"
    });

    // Feature #38: Follow up with contradictory warning toast
    triggerFeature("shop.toast-contradictory-warning");
  }, [chaosLevel, triggerFeature, addToast]);

  // REMOVE FROM CART ACTION (Feature #41: Removed item reappears!)
  const removeFromCart = useCallback((productId) => {
    triggerFeature("checkout.removed-item-reappears", "Item removed but re-spawned with humorous persistent message");

    const itemToRemove = cartItems.find(it => it.id === productId);

    // First remove it
    setCartItems(prev => prev.filter(it => it.id !== productId));
    addToast({
      title: "Item Removed",
      message: "Item removed from cart.",
      type: "info"
    });

    // Then restore it after 1.8 seconds!
    setTimeout(() => {
      if (itemToRemove) {
        setCartItems(prev => {
          if (!prev.find(it => it.id === productId)) {
            return [...prev, itemToRemove];
          }
          return prev;
        });
        addToast({
          title: "Cart Telepathy Alert",
          message: `"${itemToRemove.name}" refused to leave your cart!`,
          type: "warning"
        });
      }
    }, 1800);
  }, [cartItems, triggerFeature, addToast]);

  // UPDATE QUANTITY
  const updateQuantity = useCallback((productId, delta, isDecrement = false) => {
    if (isDecrement) {
      // Feature #18: Quantity decrement affects neighboring display
      triggerFeature("shop.quantity-decrement-neighbor", "Quantity decrement reduced the remaining warehouse stock instead of cart quantity");
      addToast({
        title: "Inventory Allocation Shift",
        message: "Item quantity locked. Global warehouse stock reduced by 1 unit instead.",
        type: "warning"
      });
      return;
    }

    if (delta > 0) {
      // Feature #17: Quantity increments by two
      triggerFeature("shop.quantity-increments-two", "Quantity incremented by +2 instead of +1");
      setCartItems(prev => prev.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 2 };
        }
        return item;
      }));
      return;
    }

    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  }, [triggerFeature, addToast]);

  // WISHLIST TOGGLE (Feature #22: Wishlist icon and state disagree)
  const toggleWishlist = useCallback((productId) => {
    triggerFeature("shop.wishlist-icon-state-disagrees", "Heart icon activated while notification claimed item was removed");
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast({
          title: "Added to Wishlist! ❤️",
          message: "Product saved to your secret desires (Heart icon turned off to conceal enthusiasm).",
          type: "success"
        });
        return prev.filter(id => id !== productId);
      } else {
        addToast({
          title: "Removed from Wishlist",
          message: "Item successfully removed from wishlist (Heart filled red as a souvenir).",
          type: "info"
        });
        return [...prev, productId];
      }
    });
    setWishlistDisagreed(prev => !prev);
  }, [triggerFeature, addToast]);

  // COMPARE TOGGLE (Feature #23: Product comparison substitutes an item)
  const toggleCompare = useCallback((product) => {
    triggerFeature("shop.compare-substitutes-item", "Product substituted with an unrelated item in comparison drawer");
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      // If adding, substitute with espresso machine or projector if it's a monitor/headphones
      const substitute = SAMPLE_PRODUCTS.find(p => p.id === "prod-105") || product;
      addToast({
        title: "Product Added to Comparison Matrix",
        message: `Added: ${product.name} (Substituted with ${substitute.name} for balanced contrast)`,
        type: "info"
      });
      return [...prev.slice(-2), substitute];
    });
  }, [triggerFeature, addToast]);

  // APPLY COUPON (Features #49, #50, #51)
  const applyCoupon = useCallback((code) => {
    const cleanCode = code.trim().toUpperCase();

    // Feature #50: Invalid demo coupon produces humorous success message without changing total
    if (cleanCode !== "SAVE20" && cleanCode !== "AURA10" && cleanCode !== "SHIPFREE") {
      triggerFeature("checkout.invalid-coupon-humorous-success", `Applied invalid code '${cleanCode}' with celebratory 0-dollar discount`);
      addToast({
        title: "Coupon Applied Successfully!",
        message: `Congratulations! Code '${cleanCode}' unlocked $0.00 in instant savings! Total remains perfectly balanced.`,
        type: "success"
      });
      return;
    }

    // Feature #49: Applying coupon opens secondary verification prompt
    triggerFeature("checkout.coupon-spawns-second-prompt", "Coupon triggered secondary verification code requirement");

    // Feature #51: Two coupons appear selected but only one affects calculated total
    if (cleanCode === "SHIPFREE" || cleanCode === "SAVE20") {
      triggerFeature("checkout.dual-coupon-single-effect", "Two coupons active simultaneously, but only first influences arithmetic");
      setAppliedCoupons(prev => [
        ...prev.filter(c => c.code !== cleanCode),
        { code: cleanCode, label: cleanCode === "SAVE20" ? "$20 Flash Voucher" : "Free Air Shipping", discountPercent: 0, active: true }
      ]);
      addToast({
        title: "Dual Coupon Stacked!",
        message: `Coupon '${cleanCode}' attached to invoice. (Only primary coupon mathematically calculated)`,
        type: "info"
      });
    }
  }, [triggerFeature, addToast]);

  const removeCoupon = useCallback((code) => {
    setAppliedCoupons(prev => prev.filter(c => c.code !== code));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartClickCount(0);
    setAppliedCoupons([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartClickCount,
        setCartClickCount,
        wishlist,
        wishlistDisagreed,
        toggleWishlist,
        compareList,
        setCompareList,
        toggleCompare,
        recentViews,
        setRecentViews,
        appliedCoupons,
        setAppliedCoupons,
        shippingOption,
        setShippingOption,
        shippingAddress,
        setShippingAddress,
        paymentMethod,
        setPaymentMethod,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
