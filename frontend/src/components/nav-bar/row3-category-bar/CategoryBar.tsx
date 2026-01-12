import { useEffect, useState } from "react";
import CategoryRow from "./ui/CategoryRow";
import ProductGrid from "./ui/ProductGrid";

interface CategoryMeta {
  name: string;
  slug: string;
  items: { name: string; slug: string }[];
}

export default function CategoryBar() {
  const [categories, setCategories] = useState<CategoryMeta[]>([]);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        const formatted = Object.values(data).map((cat: any) => ({
          name: cat.name,
          slug: cat.slug,
          items: cat.items,
        }));

        setCategories(formatted);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative z-30">
      <CategoryRow
        categories={categories}
        hoveredIndex={hoveredCategoryIndex}
        setHoveredIndex={setHoveredCategoryIndex}
      />

      {hoveredCategoryIndex !== null &&
        categories[hoveredCategoryIndex] &&
        categories[hoveredCategoryIndex].items && (
          <ProductGrid
            categorySlug={categories[hoveredCategoryIndex].slug}
            products={categories[hoveredCategoryIndex].items}
            hoveredIndex={hoveredCategoryIndex}
            setHoveredIndex={setHoveredCategoryIndex}
          />
      )}
    </div>
  );
}