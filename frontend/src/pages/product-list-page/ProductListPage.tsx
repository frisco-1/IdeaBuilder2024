import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface OrderItem {
  quantity: number | string;
  price: number | null;
}

interface PerUnitItem {
  print: number;
  label: string;
  price: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  shortDescription?: string;
  code?: string;
  order?: OrderItem[];
  pricing?: { quantityRange: string; price: number }[];
  pricingType: "fixed" | "tiered" | "perUnit" | "hybrid";
  pricingPerUnit?: PerUnitItem[];
}

// Extract numeric portion from product code
function extractCodeNumber(code?: string): number {
  if (!code) return Infinity;
  const num = parseInt(code.replace(/\D+/g, ""), 10);
  return isNaN(num) ? Infinity : num;
}

// Get starting price for list view
function getStartingPrice(product: Product): string {
  if (product.pricingType === "fixed" && product.order?.length) {
    return `Starting at $${product.order[0].price}`;
  }

  if (product.pricingType === "tiered" && product.pricing?.length) {
    return `$${product.pricing[0].price}`;
  }

  if (product.pricingType === "perUnit" && product.pricingPerUnit?.length) {
    const lowest = Math.min(...product.pricingPerUnit.map((p) => p.price));
    return `$${lowest} per copy`;
  }

  return "Contact us for pricing";
}

export default function ProductListPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products/${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div className="p-8 text-center">Loading products…</div>;
  }

  const sortedProducts = [...products].sort(
    (a, b) => extractCodeNumber(a.code) - extractCodeNumber(b.code)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category?.replace(/_/g, " ")}
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {sortedProducts.map((product) => {
          const productImage = product.images?.[0] ?? "/placeholder.png";

          return (
            <Link
              key={product._id}
              to={`/products/${category}/${product.slug}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">{product.name}</h2>

                {product.code && (
                  <p className="text-xs text-gray-500">Code: {product.code}</p>
                )}

                <p className="text-sm text-gray-600">
                  {product.shortDescription}
                </p>

                <p className="text-sm font-medium text-gray-800">
                  {getStartingPrice(product)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}