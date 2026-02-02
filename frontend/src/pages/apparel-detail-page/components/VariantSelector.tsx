import type { ApparelProduct } from "../types/apparel.types";
import InkColorSelector from "./InkColorSelector";
import Tooltip from "./Tooltip";


interface Props {
  product: ApparelProduct;
  decorationMethod: string;
  selected: string | null;
  onSelect: (variant: string) => void;
  dtfPlacementCount: number;
  setDtfPlacementCount: (n: number) => void;

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
  selectedInkColors,
  setSelectedInkColors
}: Props) {
  const method = product.decorationMethods.find(
    (m) => m.method === decorationMethod
  );
  if (!method) return null;

  const variants = Object.keys(method.options);

  const isScreenPrinting = decorationMethod === "Screen Printing";
  const isDTF = decorationMethod === "DTF";
  const isEmbroidery = decorationMethod === "Embroidery";

  // Auto-lock variant for DTF & Embroidery
  const isLockedVariant = isDTF || isEmbroidery;

  // Determine max ink colors for Screen Printing
  const maxInkColors =
    isScreenPrinting && selected === "2_color" ? 2 : 1;

  return (
    <div className="space-y-4">

      {/* Paint Count / Decoration Type */}
      <div>
        <p className="uppercase text-sm font-semibold mb-2 flex items-center">
          {isScreenPrinting ? "Paint Count" : "Decoration Type"}

          <Tooltip
            title={
              isScreenPrinting
                ? "Select your ink count"
                : "Decoration Type"
            }
            description={
              isScreenPrinting
                ? "Choose how many ink colors you want for your screen printed design. More colors allow more detail and vibrancy."
                : "Select the type of decoration for your apparel. Options include Screen Printing, DTF, and Embroidery."
            }
          />
        </p>

        <div className="flex flex-wrap gap-2 mb-2">
          {variants.map((v) => {
            const isSelected = selected === v;

            return (
              <button
                key={v}
                onClick={() => {
                  if (!isLockedVariant) onSelect(v);
                }}
                disabled={isLockedVariant}
                className={`
                  px-3 py-1 rounded-lg text-sm transition
                  ${isSelected ? "border-[3px] border-[#E9252E]" : "border border-gray-300"}
                  ${
                    isLockedVariant
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
      {isDTF && selected === "single_job" && (
        <div>
          <p className="uppercase text-sm font-semibold mb-2 flex items-center">
            Number of DTF Placements
            <Tooltip
              title="DTF Placement Examples"
              description="Choose how many locations you want your DTF transfers applied to. Each placement adds an additional cost."
              images={[
                "../../../../public/img/DTF_TOOLTIP/place1.png",
                "../../../../public/img/DTF_TOOLTIP/place2.png",
                "../../../../public/img/DTF_TOOLTIP/place3.png"
              ]}
            />
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