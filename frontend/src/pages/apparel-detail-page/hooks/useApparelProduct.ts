import { useEffect, useState } from "react";
import type { ApparelProduct } from "../types/apparel.types";

export function useApparelProduct(
  productGroupSlug?: string,
  productSlug?: string
) {
  const [product, setProduct] = useState<ApparelProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productGroupSlug || !productSlug) return;

    async function fetchProduct() {
      try {
        const res = await fetch(
          `/api/custom-apparel/${productGroupSlug}/${productSlug}`
        );
        if (!res.ok) {
          setProduct(null);
          return;
        }
        setProduct(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productGroupSlug, productSlug]);

  return { product, loading };
}
