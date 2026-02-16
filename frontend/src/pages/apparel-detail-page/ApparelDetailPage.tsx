import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApparelProduct } from "./hooks/useApparelProduct";
import { useApparelPricing } from "./hooks/useApparelPricing";
import ProductCarousel from "../../components/ProductCarousel";
import { isDark } from "./utils/isDarkColors";

import {
  ProductHeader,
  DecorationSelector,
  VariantSelector,
  PrintSideSelector,
  ColorSelector,
  SizeSelector,
  PriceSummary,
  ProductDescription,
  ProductFeatures,
} from "./components";

export default function ApparelDetailPage() {
  const { productGroupSlug, productSlug } = useParams();
  const { product, loading } = useApparelProduct(productGroupSlug, productSlug);

  const [decorationMethod, setDecorationMethod] = useState<string | null>(null);
  const [decorationVariant, setDecorationVariant] = useState<string | null>(null);
  const [printSide, setPrintSide] = useState<"1 SIDE" | "2 SIDES" | null>(null);

  // Shirt Colors
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Auto-select first color when product loads
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].hex);
    }
  }, [product]);

  // Determine if shirt is dark
  const darkShirt = selectedColor ? isDark(selectedColor) : false;

  // Ink Colors
  const [selectedInkColors, setSelectedInkColors] = useState<string[]>([]);

  // ⭐ Auto-adjust for dark shirts (Screen Printing only)
  useEffect(() => {
    if (decorationMethod === "Screen Printing" && selectedColor) {
      if (darkShirt) {
        // Force 2-color
        setDecorationVariant("2_color");

        // Inject white underbase
        setSelectedInkColors((prev) => {
          const withoutWhite = prev.filter((c) => c !== "White");
          return ["White", ...withoutWhite];
        });
      } else {
        // Light shirt → remove white
        setSelectedInkColors((prev) => prev.filter((c) => c !== "White"));
      }
    }
  }, [decorationMethod, selectedColor, darkShirt]);

  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>({});
  const [dtfPlacementCount, setDtfPlacementCount] = useState(1);

  const pricing = useApparelPricing({
    product,
    decorationMethod,
    decorationVariant,
    printSide,
    sizeQuantities,
    dtfPlacementCount,
    selectedInkColors,
  });

  if (loading) return <div>Loading…</div>;
  if (!product) return <div>Not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT: IMAGE */}
        <div className="flex justify-center items-start">
          <ProductCarousel
            images={
              product.colors.find((c) => c.hex === selectedColor)?.gallery || []
            }
          />
        </div>

        {/* RIGHT: OPTIONS */}
        <div className="space-y-3">

          <ProductHeader product={product} />

          {/* DECORATION */}
          <DecorationSelector
            methods={product.decorationMethods.map((m) => m.method)}
            selected={decorationMethod}
            onSelect={(m) => {
              setDecorationMethod(m);

              if (m === "DTF" || m === "Embroidery") {
                setDecorationVariant("single_job");
                setSelectedInkColors([]); // OK to reset here
              } else {
                setDecorationVariant(null);
              }

              setPrintSide(null);
            }}
          />

          {/* VARIANT OPTIONS */}
          {decorationMethod && (
            <VariantSelector
              product={product}
              decorationMethod={decorationMethod}
              selected={decorationVariant}
              onSelect={(variant) => {
                // ⭐ DO NOT reset ink colors when switching between 1-color and 2-color
                setDecorationVariant(variant);
              }}
              dtfPlacementCount={dtfPlacementCount}
              setDtfPlacementCount={setDtfPlacementCount}
              selectedInkColors={selectedInkColors}
              setSelectedInkColors={setSelectedInkColors}
              lockTwoColor={darkShirt}
            />
          )}

          {/* PRINT SIDE (Screen Printing only) */}
          {decorationMethod === "Screen Printing" &&
            decorationVariant &&
            !darkShirt && (
              <PrintSideSelector selected={printSide} onSelect={setPrintSide} />
            )}

            {/* White Underbase Badge */}
            {decorationMethod === "Screen Printing" &&
              darkShirt &&
              decorationVariant === "2_color" && (
                <div className="inline-block bg-[#E9252E]/10 text-[#E9252E] text-xs font-semibold px-3 py-1 rounded-md">
                  White Underbase Applied
                </div>
              )}


          {/* SHIRT COLOR */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="uppercase text-sm font-semibold">Shirt Color</p>
              <span className="text-xs text-gray-600">
                Selected Color:{" "}
                {selectedColor
                  ? product.colors.find((c) => c.hex === selectedColor)?.name
                  : "None"}
              </span>
            </div>

            <ColorSelector
              colors={product.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          {/* SIZES */}
          <div>
            <p className="uppercase text-sm font-semibold mb-2">
              Available Sizes
            </p>

            <SizeSelector
              sizes={product.sizes}
              quantities={sizeQuantities}
              onChange={(size, qty) =>
                setSizeQuantities((prev) => ({ ...prev, [size]: qty }))
              }
            />

            {/* Minimum Order */}
            <p className="text-xs text-gray-500 mt-2">
              Minimum Quantity Required:{" "}
              {decorationMethod && decorationVariant
                ? product.decorationMethods.find(
                    (m) => m.method === decorationMethod
                  )?.options?.[decorationVariant]?.minimumOrder ?? 0
                : 0}
            </p>
          </div>

          {/* PRICE */}
          <PriceSummary
            totalPrice={pricing.totalPrice}
            totalQuantity={pricing.totalQuantity}
          />

          {/* Embroidery Disclaimer */}
          {decorationMethod === "Embroidery" && (
            <p className="text-xs text-[#E9252E] leading-snug">
              <span className="font-semibold">Disclaimer:</span> Pricing is based
              on one embroidery placement only. Call to inquire for more
              embroidery positions.
            </p>
          )}
        </div>
      </div>

      {/* DESCRIPTION + FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <ProductDescription description={product.description} />
        <ProductFeatures features={product.features} />
      </div>
    </div>
  );
}