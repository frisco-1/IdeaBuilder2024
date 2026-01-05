import { useState } from "react";
import CategoryRow from "./ui/CategoryRow";
import ProductGrid from "./ui/ProductGrid";

import apparel from "../../data/categories/apparel";
import dtf from "../../data/categories/dtf";
import stationery from "../../data/categories/stationery";
import signage from "../../data/categories/signage";
import promo from "../../data/categories/promo";

const categories = [
  { name: "Custom Apparel", products: apparel },
  { name: "DTF Products", products: dtf },
  { name: "Stationery Items", products: stationery },
  { name: "Signs & Banners", products: signage },
  { name: "Promotional Products", products: promo },
];

export default function CategoryBar() {
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);

  return (
    <div className="relative z-30">
      <CategoryRow
        categories={categories}
        hoveredIndex={hoveredCategoryIndex}
        setHoveredIndex={setHoveredCategoryIndex}
      />

      {hoveredCategoryIndex !== null && (
        <ProductGrid
          products={categories[hoveredCategoryIndex].products}
          hoveredIndex={hoveredCategoryIndex}
          setHoveredIndex={setHoveredCategoryIndex}
        />
      )}
    </div>
  );
}