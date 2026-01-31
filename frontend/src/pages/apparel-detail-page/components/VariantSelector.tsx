import type { ApparelProduct } from "../types/apparel.types";
import InkColorSelector from "./InkColorSelector";

interface Props {
  product: ApparelProduct;
  decorationMethod: string;
  selected: string | null;
  onSelect: (variant: string) => void;
  dtfPlacementCount: number;
  setDtfPlacementCount: (n: number) => void;

  // NEW
  selectedInkColors: string[];
  setSelectedInkColors: (colors: string[]) => void;
}

export default function VariantSelector({
  product,
  decorationMethod,
  selected,
  onSelect,
  dtfPlacementCount,
  setDtfPlacementCount,

  // NEW
  selectedInkColors,
  setSelectedInkColors
}: Props) {
  const method = product.decorationMethods.find(
    (m) => m.method === decorationMethod
  );
  if (!method) return null;

  const variants = Object.keys(method.options);
  const isScreenPrinting = decorationMethod === "Screen Printing";

  // Determine max ink colors based on variant
  const maxInkColors =
    isScreenPrinting && selected === "2_color" ? 2 : 1;

  return (
    <div className="space-y-4">
      {/* Paint Count / Decoration Type */}
      <div>
        <p className="uppercase text-sm font-semibold mb-2">
          {isScreenPrinting ? "Paint Count" : "Decoration Type"}
        </p>

        <div className="flex flex-wrap gap-2 mb-2">
          {variants.map((v) => {
            const isSelected = selected === v;

            return (
              <button
                key={v}
                onClick={() => onSelect(v)}
                className={`
                  px-3 py-1 rounded-lg text-sm transition
                  ${isSelected ? "border-[3px] border-[#E9252E]" : "border border-gray-300"}
                  ${
                    !isScreenPrinting
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {v.replace("_", " ")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ink Color Selector (Screen Printing only) */}
      {isScreenPrinting && selected && (
        <InkColorSelector
          inkColors={method.inkColors || []}
          selected={selectedInkColors}
          onSelect={setSelectedInkColors}
          maxColors={maxInkColors}
        />
      )}

      {/* DTF Placement Counter */}
      {decorationMethod === "DTF" && selected === "single_job" && (
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
              setDtfPlacementCount(
                Math.max(1, parseInt(e.target.value) || 1)
              )
            }
          />
        </div>
      )}
    </div>
  );
}