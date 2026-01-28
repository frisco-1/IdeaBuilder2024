import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/* -------------------------------------------------------
   TYPESCRIPT INTERFACES (matches your MongoDB schema)
------------------------------------------------------- */

interface ApparelColor {
  name: string;
  hex: string;
}

interface PricingTier {
  quantity: number;
  perOneSide?: number;
  perTwoSides?: number;
  additionalSide?: number;
  perUnit?: number;
}

interface DecorationMethod {
  method: string;
  options: {
    [key: string]: {
      minimumOrder: number;
      pricing: PricingTier[];
    };
  };
}

interface ApparelProduct {
  _id: string;
  code: string;
  name: string;
  brand: string;
  brand_logo?: string;
  images: string[];
  category: string;
  productGroup: string;
  shortDescription: string;
  description: string;
  sizes: string[];
  colors: ApparelColor[];
  features: string[];
  decorationMethods: DecorationMethod[];
  slug: string;
}

/* -------------------------------------------------------
   PAGE-LEVEL COMPONENT (fetches from backend)
------------------------------------------------------- */

export default function ApparelDetailPage() {
  const { productGroupSlug, productSlug } = useParams();

  const [product, setProduct] = useState<ApparelProduct | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
  async function fetchApparelProduct() {
    try {
      const res = await fetch(`/api/custom-apparel/${productGroupSlug}/${productSlug}`);
      if (!res.ok) {
        setProduct(null);
        return;
      }
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching apparel product:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchApparelProduct();
}, [productGroupSlug, productSlug]);


  if (loading) {
    return <div className="p-8 text-center">Loading product…</div>;
  }

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  return <ApparelDetail product={product} />;
}

/* -------------------------------------------------------
   UI COMPONENT (receives product as prop)
------------------------------------------------------- */

function ApparelDetail({ product }: { product: ApparelProduct }) {
  const [decorationMethod, setDecorationMethod] = useState<string | null>(null);
  const [decorationVariant, setDecorationVariant] = useState<string | null>(null);
  const [printSide, setPrintSide] = useState<"1 SIDE" | "2 SIDES" | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dtfPlacementCount, setDtfPlacementCount] = useState(1);

 /* -------------------------------------------------------
   CALCULATE TOTAL + PRICING
------------------------------------------------------- */
useEffect(() => {
  const total = Object.values(sizeQuantities).reduce(
    (acc, qty) => acc + (qty || 0),
    0
  );
  setTotalQuantity(total);

  if (!decorationMethod || total === 0) {
    setTotalPrice(0);
    return;
  }

  const methodData = product.decorationMethods.find(
    (m) => m.method === decorationMethod
  );
  if (!methodData) return;

  let unitPrice = 0;

  /* -------------------------------
     SCREEN PRINTING
  --------------------------------*/
  if (decorationMethod === "Screen Printing") {
    if (!decorationVariant || !printSide) {
      setTotalPrice(0);
      return;
    }

    const variantData = methodData.options[decorationVariant];
    if (!variantData) return;

    const tier = [...variantData.pricing]
      .reverse()
      .find((t) => total >= t.quantity);

    if (!tier) {
      setTotalPrice(0);
      return;
    }

    unitPrice =
    printSide === "2 SIDES"
      ? tier.perTwoSides ?? 0
      : tier.perOneSide ?? 0;

  }

  /* -------------------------------
     DTF (single_job)
  --------------------------------*/
  if (decorationMethod === "DTF") {
    const dtfData = methodData.options.single_job;

    const tier = [...dtfData.pricing]
      .reverse()
      .find((t) => total >= t.quantity);

    if (!tier) {
      setTotalPrice(0);
      return;
    }

    // base price for first placement
    unitPrice = tier.perOneSide ?? 0;


    // additional placements
    if (dtfPlacementCount > 1) {
      unitPrice += (dtfPlacementCount - 1) * (tier.additionalSide ?? 0);

    }
  }

  /* -------------------------------
     EMBROIDERY (single_job)
  --------------------------------*/
  if (decorationMethod === "Embroidery") {
    const embData = methodData.options.single_job;

    const tier = [...embData.pricing]
      .reverse()
      .find((t) => total >= t.quantity);

    if (!tier) {
      setTotalPrice(0);
      return;
    }

    unitPrice = tier.perUnit ?? 0;

  }

  setTotalPrice(unitPrice * total);
}, [
  decorationMethod, decorationVariant, printSide, dtfPlacementCount, sizeQuantities, product
]);

useEffect(() => {
  if (
    (decorationMethod === "DTF" || decorationMethod === "Embroidery") &&
    decorationVariant !== "single_job"
  ) {
    setDecorationVariant("single_job");
  }
}, [decorationMethod]);


  /* -------------------------------------------------------
     HANDLERS
  ------------------------------------------------------- */

  const handleQuantityChange = (size: string, qty: string) => {
    setSizeQuantities((prev) => ({
      ...prev,
      [size]: parseInt(qty) || 0,
    }));
  };

  /* -------------------------------------------------------
     UI LAYOUT
  ------------------------------------------------------- */

return (
  <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">

    {/* TOP GRID: IMAGE + OPTIONS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* QUADRANT 1: IMAGE */}
      <div className="flex justify-center items-start">
        <div className="relative w-72 h-80 rounded-xl shadow-lg bg-gray-200 flex items-center justify-center">
          <span className="font-bold text-white text-xl drop-shadow">
            Your DESIGN Here
          </span>
        </div>
      </div>

      {/* QUADRANT 2: OPTIONS */}
      <div className="space-y-3">

        {/* BRAND + LOGO */}
        <div className="flex items-center justify-between text-sm mb-1">
          <div className="flex items-center gap-2 leading-tight">
            <span className="font-medium">{product.brand}</span>
            <span className="text-xs text-gray-500">{product.code}</span>
          </div>

          {product.brand_logo && (
            <img
              src={product.brand_logo}
              alt="brand logo"
              className="w-8 h-8 object-contain"
            />
          )}
        </div>

        {/* PRODUCT NAME */}
        <h4 className="text-base font-bold">{product.name}</h4>

        {/* DECORATION METHODS */}
        <div>
          <p className="uppercase text-sm font-semibold mb-2">Decoration</p>
          <div className="flex flex-wrap gap-2">
            {product.decorationMethods.map((m) => {
              const isSelected = decorationMethod === m.method;

              return (
                <button
                  key={m.method}
                  onClick={() => {
                    setDecorationMethod(m.method);
                    setDecorationVariant(null);
                    setPrintSide(null);
                  }}
                  className={`
                    px-3 py-1 rounded-lg text-sm
                    ${isSelected ? "border-[3px] border-[#E9252E]" : "border border-gray-300"}
                    hover:bg-gray-100
                  `}
                >
                  {m.method}
                </button>
              );
            })}
          </div>
        </div>

        {/* VARIANT OPTIONS */}
        {decorationMethod && (
          <div>
            <p className="uppercase text-sm font-semibold mb-2">
              {decorationMethod === "Screen Printing" ? "Paint Count" : "Decoration Type"}
            </p>

            <div className="flex flex-wrap gap-2 mb-2">
              {Object.keys(
                product.decorationMethods.find((m) => m.method === decorationMethod)!.options
              ).map((variant) => {
                const isScreenPrinting = decorationMethod === "Screen Printing";
                const isSelected = decorationVariant === variant;

                return (
                  <button
                    key={variant}
                    onClick={() => {
                      if (isScreenPrinting) setDecorationVariant(variant);
                    }}
                    disabled={!isScreenPrinting}
                    className={`
                      px-3 py-1 rounded-lg text-sm
                      ${isSelected ? "border-[3px] border-[#E9252E]" : "border border-gray-300"}
                      ${!isScreenPrinting ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "hover:bg-gray-100"}
                    `}
                  >
                    {variant.replace("_", " ")}
                  </button>
                );
              })}
            </div>

            {/* DTF Placement Counter */}
            {decorationMethod === "DTF" && decorationVariant === "single_job" && (
              <div>
                <p className="uppercase text-sm font-semibold mb-2">
                  Number of DTF Placements
                </p>
                <input
                  type="number"
                  min={1}
                  className="w-24 border rounded-lg p-2"
                  value={dtfPlacementCount}
                  onChange={(e) =>
                    setDtfPlacementCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
              </div>
            )}
          </div>
        )}

        {/* PRINT SIDE */}
        {decorationMethod !== "Embroidery" && decorationVariant && (
          <div>
            <p className="uppercase text-sm font-semibold mb-2">Print Side</p>
            <div className="flex gap-2">
              {["1 SIDE", "2 SIDES"].map((side) => {
                const isSelected = printSide === side;

                return (
                  <button
                    key={side}
                    onClick={() => setPrintSide(side as "1 SIDE" | "2 SIDES")}
                    className={`
                      px-3 py-1 rounded-lg text-sm
                      ${isSelected ? "border-[3px] border-[#E9252E]" : "border border-gray-300"}
                      hover:bg-gray-100
                    `}
                  >
                    {side}
                  </button>
                );
              })}
            </div>
          </div>
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

          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
            {product.colors.map((c) => {
              const isSelected = selectedColor === c.hex;

              return (
                <div
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`
                    w-8 h-8 rounded-lg cursor-pointer transition-transform
                    ${isSelected 
                      ? "border-[3px] border-[#E9252E] scale-110" 
                      : "border border-gray-300"
                    }
                  `}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />

              );
            })}
          </div>
        </div>

        {/* SIZES */}
        <div>
          <p className="uppercase text-sm font-semibold mb-2">Available Sizes</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {product.sizes.map((size) => (
              <div key={size} className="flex flex-col items-center">
                <span className="font-semibold text-sm">{size}</span>
                <input
                  type="number"
                  min="0"
                  className="w-12 border rounded-lg p-1 text-center text-sm"
                  value={sizeQuantities[size] || ""}
                  onChange={(e) => handleQuantityChange(size, e.target.value)}
                />
              </div>
            ))}
          </div>

        </div>

        {/* PRICE */}
        <div className="p-3 border rounded-lg bg-gray-50">
          <p className="text-sm font-semibold">Price</p>
          <p className="text-xl font-bold">
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="text-gray-500 text-sm">Total Qty: {totalQuantity}</p>
        </div>
      </div>
    </div>

    {/* QUADRANT 3: DESCRIPTION + FEATURES */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-gray-700 text-sm">{product.description}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Features</h3>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          {product.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}