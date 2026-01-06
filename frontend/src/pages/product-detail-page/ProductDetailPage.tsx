import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface FixedOrder {
  quantity: number | string;
  price: number | null;
}

interface TieredPricing {
  quantityRange: string;
  price: number;
}

interface DeliveryOption {
  type: string;
  dateText: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  features?: string[];
  pricingType: "fixed" | "tiered";
  order?: FixedOrder[];
  pricing?: TieredPricing[];
  deliveryOptions?: DeliveryOption[];
}

export default function ProductDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${category}/${slug}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [category, slug]);

  if (loading) {
    return <div className="p-8 text-center">Loading product…</div>;
  }

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-2">
      {/* LEFT: IMAGE */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg shadow"
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {product.description && (
          <p className="text-gray-700">{product.description}</p>
        )}

        {/* FEATURES */}
        {product.features && product.features.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* PRICING */}
        <div>
          <h2 className="font-semibold mb-2">Pricing</h2>

          {product.pricingType === "fixed" && product.order && (
            <ul className="space-y-1">
              {product.order.map((o, i) => (
                <li key={i} className="text-gray-700">
                  {o.quantity} pcs —{" "}
                  {o.price ? `$${o.price}` : "Contact for pricing"}
                </li>
              ))}
            </ul>
          )}

          {product.pricingType === "tiered" && product.pricing && (
            <ul className="space-y-1">
              {product.pricing.map((p, i) => (
                <li key={i} className="text-gray-700">
                  {p.quantityRange} — ${p.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DELIVERY OPTIONS */}
        {product.deliveryOptions && product.deliveryOptions.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Delivery Options</h2>
            <ul className="space-y-1">
              {product.deliveryOptions.map((opt, i) => (
                <li key={i} className="text-gray-700">
                  <span className="font-medium">{opt.type}:</span>{" "}
                  {opt.dateText}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
          Start Designing
        </button>
      </div>
    </div>
  );
}