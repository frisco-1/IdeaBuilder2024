import { FC } from "react";

interface CategoryRowProps {
  categories: { name: string }[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const CategoryRow: FC<CategoryRowProps> = ({ categories, hoveredIndex, setHoveredIndex }) => {
  return (
    <div className="bg-gray-100 border-t border-gray-300 px-4 h-auto min-h-10.5 flex items-center">
      <div className="mx-auto max-w-6xl w-full flex items-center justify-center gap-6 py-3">
        {categories.map((cat, index) => (
          <button
            key={cat.name}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`text-sm font-medium px-3 py-1 rounded transition ${
              hoveredIndex === index
                ? "bg-[#E9252E] text-white"
                : "text-black hover:bg-[#E9252E] hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;