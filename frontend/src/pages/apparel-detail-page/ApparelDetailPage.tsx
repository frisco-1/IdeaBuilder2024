import { useParams } from "react-router-dom";
import { useState } from "react";
import { useApparelProduct } from "./hooks/useApparelProduct";
import { useApparelPricing } from "./hooks/useApparelPricing";

import {
  ImagePreview,
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>({});
  const [dtfPlacementCount, setDtfPlacementCount] = useState(1);

  // NEW — Ink Colors
  const [selectedInkColors, setSelectedInkColors] = useState<string[]>([]);

  const pricing = useApparelPricing({
    product,
    decorationMethod,
    decorationVariant,
    printSide,
    sizeQuantities,
    dtfPlacementCount,
    selectedInkColors, // NEW
  });

  if (loading) return <div>Loading…</div>;
  if (!product) return <div>Not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT: IMAGE */}
        <div className="flex justify-center items-start">
          <ImagePreview />
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
                  setDecorationVariant("single_job"); // auto-select
                } else {
                  setDecorationVariant(null);
                }
                setPrintSide(null);
                setSelectedInkColors([]);
            }}
          />

          {/* VARIANT OPTIONS */}
          {decorationMethod && (
            <VariantSelector
              product={product}
              decorationMethod={decorationMethod}
              selected={decorationVariant}
              onSelect={(variant) => {
                setDecorationVariant(variant);
                setSelectedInkColors([]); // NEW — reset when switching 1-color/2-color
              }}
              dtfPlacementCount={dtfPlacementCount}
              setDtfPlacementCount={setDtfPlacementCount}
              selectedInkColors={selectedInkColors} // NEW
              setSelectedInkColors={setSelectedInkColors} // NEW
            />
          )}

          {/* PRINT SIDE */}
          {decorationMethod === "Screen Printing" && decorationVariant && (
            <PrintSideSelector
              selected={printSide}
              onSelect={setPrintSide}
            />
          )}


          {/* SHIRT COLOR */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="uppercase text-sm font-semibold">Shirt Color</p>
              <span className="text-xs text-gray-600">
                Selected Color: {selectedColor
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
            <p className="uppercase text-sm font-semibold mb-2">Available Sizes</p>

            <SizeSelector
              sizes={product.sizes}
              quantities={sizeQuantities}
              onChange={(size, qty) =>
                setSizeQuantities((prev) => ({ ...prev, [size]: qty }))
              }
            />

            {/* Minimum Order */}
            <p className="text-xs text-gray-500 mt-2">
              Minimum Quantity Required: {
                decorationMethod && decorationVariant
                  ? product.decorationMethods
                      .find(m => m.method === decorationMethod)
                      ?.options?.[decorationVariant]?.minimumOrder ?? 0
                  : 0
              }
            </p>

          </div>

          {/* PRICE */}
          <PriceSummary
            totalPrice={pricing.totalPrice}
            totalQuantity={pricing.totalQuantity}
          />
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