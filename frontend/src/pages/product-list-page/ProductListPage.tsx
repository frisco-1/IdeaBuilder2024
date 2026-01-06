import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface OrderItem {
  quantity: number | string;
  price: number | null;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription?: string;
  code?: string;
  order?: OrderItem[];
}

// Extract numeric portion from product code
//Probably can make this into a react component (idk yet)
function extractCodeNumber(code?: string): number {
  if (!code) return Infinity;
  const num = parseInt(code.replace(/\D+/g, ""), 10);
  return isNaN(num) ? Infinity : num;
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

  // Sort products by numeric portion of product code
  const sortedProducts = [...products].sort((a, b) => {
    return extractCodeNumber(a.code) - extractCodeNumber(b.code);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category?.replace(/_/g, " ")}
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {sortedProducts.map((product) => {
          const firstPrice = product.order?.[0]?.price ?? null;

          return (
            <Link
              key={product._id}
              to={`/products/${category}/${product.slug}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">{product.name}</h2>

                {/* Product Code */}
                {product.code && (
                  <p className="text-xs text-gray-500">Code: {product.code}</p>
                )}

                {/* Short Description */}
                <p className="text-sm text-gray-600">{product.shortDescription}</p>

                {/* Starting Price */}
                <p className="text-sm font-medium text-gray-800">
                  {firstPrice
                    ? `Starting at $${firstPrice}`
                    : "Contact us for pricing"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}