import { useMemo } from "react";
import type { ApparelProduct } from "../types/apparel.types";

interface PricingInput {
  product: ApparelProduct | null;
  decorationMethod: string | null;
  decorationVariant: string | null;
  printSide: "1 SIDE" | "2 SIDES" | null;
  sizeQuantities: Record<string, number>;
  dtfPlacementCount: number;
  selectedInkColors?: string[]; // hex values or keys
}

export function useApparelPricing({
  product,
  decorationMethod,
  decorationVariant,
  printSide,
  sizeQuantities,
  dtfPlacementCount,
  selectedInkColors = []
}: PricingInput) {
  return useMemo(() => {
    if (!product || !decorationMethod) {
      return { totalPrice: 0, totalQuantity: 0 };
    }

    // ---------------------------------------------
    // 1. TOTAL QUANTITY
    // ---------------------------------------------
    const totalQuantity = Object.values(sizeQuantities).reduce(
      (sum, qty) => sum + (qty || 0),
      0
    );

    if (totalQuantity === 0) {
      return { totalPrice: 0, totalQuantity: 0 };
    }

    // ---------------------------------------------
    // 2. FIND DECORATION METHOD
    // ---------------------------------------------
    const method = product.decorationMethods.find(
      (m) => m.method === decorationMethod
    );
    if (!method) return { totalPrice: 0, totalQuantity: 0 };

    // ---------------------------------------------
    // 3. FIND VARIANT (Screen Printing or DTF)
    // ---------------------------------------------
    const variant = decorationVariant
      ? method.options?.[decorationVariant]
      : null;

    // ---------------------------------------------
    // 4. FIND PRICING TIER
    // ---------------------------------------------
    const tier = variant?.pricing
      ?.slice()
      .reverse()
      .find((t) => totalQuantity >= t.quantity);

    if (!tier) return { totalPrice: 0, totalQuantity: 0 };

    // ---------------------------------------------
    // 5. BASE PRICE PER UNIT (depends on method)
    // ---------------------------------------------
    let basePrice = 0;

    if (decorationMethod === "Screen Printing") {
      if (!printSide) return { totalPrice: 0, totalQuantity: 0 };

      basePrice =
        printSide === "1 SIDE"
          ? tier.perOneSide ?? 0
          : tier.perTwoSides ?? 0;

      // Paint count logic (variant name = "1_color", "2_color")
      const paintCount = decorationVariant
        ? parseInt(decorationVariant.split("_")[0])
        : 1;

      // If you ever want to charge more per ink color, add logic here.
      // Example:
      // basePrice += (paintCount - 1) * 0.50;

    } else if (decorationMethod === "DTF") {
      if (!printSide) return { totalPrice: 0, totalQuantity: 0 };

      basePrice =
        printSide === "1 SIDE"
          ? tier.perOneSide ?? 0
          : tier.perTwoSides ?? 0;

      // Additional placements
      if (dtfPlacementCount > 1) {
        const extraPlacements = dtfPlacementCount - 1;
        basePrice += extraPlacements * (tier.additionalSide ?? 0);
      }

    } else if (decorationMethod === "Embroidery") {
      basePrice = tier.perUnit ?? 0;
    }

    // ---------------------------------------------
    // 6. PLUS-SIZE FEES
    // ---------------------------------------------
    let plusSizeFees = 0;

    for (const size of product.sizes) {
      const qty = sizeQuantities[size.size] || 0;
      if (qty > 0) {
        plusSizeFees += qty * (size.additionalFee ?? 0);
      }
    }

    // ---------------------------------------------
    // 7. FINAL PRICE
    // ---------------------------------------------
    const decorationPrice = basePrice * totalQuantity;
    const totalPrice = decorationPrice + plusSizeFees;

    return {
      totalPrice: Number(totalPrice.toFixed(2)),
      totalQuantity
    };
  }, [
    product,
    decorationMethod,
    decorationVariant,
    printSide,
    sizeQuantities,
    dtfPlacementCount,
    selectedInkColors
  ]);
}