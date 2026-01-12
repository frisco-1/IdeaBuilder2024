import { Link } from "react-router-dom";

interface CategoryMeta {
  name: string;
  slug: string;
  items: { name: string; slug: string }[];
}

interface CategoryRowProps {
  categories: CategoryMeta[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

export default function CategoryRow({
  categories,
  hoveredIndex,
  setHoveredIndex,
}: CategoryRowProps) {
  return (
    <div className="bg-gray-100 border-t border-gray-300 px-4 h-auto min-h-10.5 flex items-center">
      <div className="mx-auto max-w-6xl w-full flex items-center justify-center gap-6 py-3">
        {categories.map((cat, index) => {
          // Defensive guard: skip if slug is missing
          if (!cat?.slug || typeof cat.slug !== "string") return null;

          return (
            <Link
              key={`${cat.slug}-${index}`} // ✅ Unique key
              to={`/products/category/${cat.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`text-sm font-medium px-3 py-1 rounded transition ${
                hoveredIndex === index
                  ? "bg-[#E9252E] text-white"
                  : "text-black hover:bg-[#E9252E] hover:text-white"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}