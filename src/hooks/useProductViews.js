import { useCallback } from 'react';
import { useChaos } from './useChaos';
import { getProductVisitReaction } from '../chaos/contextualReactions';

export function useProductViews() {
  const {
    productViewCounts,
    setProductViewCounts,
    triggerFeature,
    addToast
  } = useChaos();

  const recordProductView = useCallback((product) => {
    if (!product || !product.id) return null;

    let reaction = null;

    setProductViewCounts(prev => {
      const currentCount = prev[product.id] || 0;
      const newCount = currentCount + 1;
      const updated = { ...prev, [product.id]: newCount };

      reaction = getProductVisitReaction(product.name, newCount);

      if (newCount === 3) {
        // Milestone 3: Mild playful nudge
        triggerFeature("shop.repeated-product-view-reaction", `View #3 for ${product.name}: Sarcastic visit nudge triggered`);
        addToast({
          title: "Product Visit Milestone #3",
          message: reaction.headline,
          type: "info"
        });
      } else if (newCount === 4 || newCount === 5) {
        // Milestone 4/5: Stronger provocation
        triggerFeature("shop.product-visit-milestone-4", `View #${newCount} for ${product.name}: Rental inquiry triggered`);
        addToast({
          title: `Product Visit Milestone #${newCount}`,
          message: reaction.headline,
          type: "warning"
        });
      } else if (newCount >= 6 && newCount % 2 === 0) {
        triggerFeature("shop.repeated-product-view-reaction", `View #${newCount} for ${product.name}: Devotion milestone reached`);
        addToast({
          title: `Product View #${newCount}`,
          message: reaction.headline,
          type: "warning"
        });
      }

      return updated;
    });

    return reaction;
  }, [setProductViewCounts, triggerFeature, addToast]);

  const getProductViewCount = useCallback((productId) => {
    return productViewCounts[productId] || 0;
  }, [productViewCounts]);

  const resetProductViews = useCallback(() => {
    setProductViewCounts({});
  }, [setProductViewCounts]);

  return {
    productViewCounts,
    recordProductView,
    getProductViewCount,
    resetProductViews
  };
}
