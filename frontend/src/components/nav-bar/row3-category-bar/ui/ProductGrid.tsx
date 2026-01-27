import { FC } from "react";
import { Link } from "react-router-dom";

interface ProductGridProps {
  categorySlug: string;
  products: { name: string; slug: string }[];
  hoveredIndex: number;
  setHoveredIndex: (index: number | null) => void;
}

const ProductGrid: FC<ProductGridProps> = ({
  categorySlug,
  products,
  hoveredIndex,
  setHoveredIndex,
}) => {
  // Defensive guard: ensure products is a valid array
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
      onMouseEnter={() => setHoveredIndex(hoveredIndex)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="w-225 bg-white border rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {safeProducts.map((product, index) => {
            // ✅ Defensive guard: skip if slug is missing
            if (!product?.slug || typeof product.slug !== "string") return null;

            return (
              <Link
                key={`${product.slug}-${index}`} // ✅ Unique key
                to={`/${categorySlug}/${product.slug}`}
                className="text-sm px-4 py-3 rounded border text-black hover:bg-[#E9252E] hover:text-white transition text-center wrap-break-word whitespace-normal"
              >
                {product.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;