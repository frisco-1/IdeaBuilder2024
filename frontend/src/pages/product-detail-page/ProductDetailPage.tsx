import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCarousel from "../../components/ProductCarousel";

interface FixedOrder {
  quantity?: number | string;
  label?: string;
  price: number | null;
}

interface TieredPricing {
  quantityRange: string;
  price: number;
}

interface PerUnitItem {
  print: number;
  label: string;
  price: number;
}

interface DeliveryOption {
  type: string;
  dateText: string;
}

interface AddOn {
  name: string;
  price: number;
  description?: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  description?: string;
  features?: string[];
  pricingType: "fixed" | "tiered" | "perUnit" | "hybrid";
  order?: FixedOrder[];
  pricing?: TieredPricing[];
  pricingPerUnit?: PerUnitItem[];
  deliveryOptions?: DeliveryOption[];
  addOns?: AddOn[];
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
      {/* LEFT: IMAGE CAROUSEL */}
      <div>
        <ProductCarousel images={product.images} />
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
              {product.order.map((o, i) => {
                const display = o.label ?? `${o.quantity} pcs`;
                return (
                  <li key={i} className="text-gray-700">
                    {display} — ${o.price}
                  </li>
                );
              })}
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

          {product.pricingType === "perUnit" &&
            product.pricingPerUnit &&
            product.pricingPerUnit.length > 0 && (
              <ul className="space-y-1">
                {product.pricingPerUnit.map((p, i) => (
                  <li key={i} className="text-gray-700">
                    {p.label} — ${p.price} per copy
                  </li>
                ))}
              </ul>
            )}
        </div>

        {/* ADD-ONS */}
        {product.addOns && product.addOns.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Add‑Ons</h2>
            <ul className="space-y-1 text-gray-700">
              {product.addOns.map((addon, i) => (
                <li key={i}>
                  <span className="font-medium">{addon.name}</span>
                  {addon.description && (
                    <span className="text-gray-600"> — {addon.description}</span>
                  )}
                  <span className="ml-2">${addon.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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