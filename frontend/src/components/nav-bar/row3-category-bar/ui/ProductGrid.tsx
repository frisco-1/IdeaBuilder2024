import { FC } from "react";
import { Link } from "react-router-dom";

interface ProductGridProps {
  products: { name: string; slug: string }[];
  hoveredIndex: number;
  setHoveredIndex: (index: number | null) => void;
}

const ProductGrid: FC<ProductGridProps> = ({ products, hoveredIndex, setHoveredIndex }) => {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
      onMouseEnter={() => setHoveredIndex(hoveredIndex)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="w-225 bg-white border rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              to={`/products/${product.slug}`}
              className="text-sm px-4 py-3 rounded border text-black hover:bg-[#E9252E] hover:text-white transition text-center break-words whitespace-normal"
            >
              {product.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;