// ---------------------------------------------
// COLOR (Shirt Colors)
// ---------------------------------------------
export interface ApparelColor {
  name: string;
  hex: string;
}

// ---------------------------------------------
// INK COLORS (Screen Printing)
// ---------------------------------------------
export interface InkColor {
  key: string;   // "Color 1", "Color 2", etc.
  name: string;
  hex: string;
}

// ---------------------------------------------
// PRICING TIERS
// ---------------------------------------------
export interface PricingTier {
  quantity: number;
  perOneSide?: number;
  perTwoSides?: number;
  additionalSide?: number; // DTF additional placements
  perUnit?: number;        // Embroidery
}

// ---------------------------------------------
// SIZE STRUCTURE (NEW)
// ---------------------------------------------
export interface ApparelSize {
  size: string;          // "S", "M", "2XL", etc.
  additionalFee: number; // 0, 2, 3, 3.5, etc.
}

// ---------------------------------------------
// DECORATION METHOD OPTIONS
// ---------------------------------------------
export interface DecorationMethodOptions {
  [variant: string]: {
    minimumOrder: number;
    pricing: PricingTier[];
  };
}

// ---------------------------------------------
// DECORATION METHOD
// ---------------------------------------------
export interface DecorationMethod {
  method: string; // "Screen Printing", "DTF", "Embroidery"
  options: DecorationMethodOptions;
  inkColors?: InkColor[]; // Only Screen Printing has this
}

// ---------------------------------------------
// MAIN PRODUCT TYPE
// ---------------------------------------------
export interface ApparelProduct {
  _id?: string;
  code: string;
  name: string;
  brand: string;
  brand_logo?: string;
  images: string[];
  category: string;
  productGroup: string;
  shortDescription: string;
  description: string;

  // UPDATED
  sizes: ApparelSize[];

  colors: ApparelColor[];
  features: string[];

  // UPDATED
  decorationMethods: DecorationMethod[];

  slug: string;
}