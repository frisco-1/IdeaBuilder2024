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

  lockTwoColor?: boolean; // dark shirt logic
}

export default function VariantSelector({
  product,
  decorationMethod,
  selected,
  onSelect,
  dtfPlacementCount,
  setDtfPlacementCount,
  selectedInkColors,
  setSelectedInkColors,
  lockTwoColor = false
}: Props) {
  const method = product.decorationMethods.find(
    (m) => m.method === decorationMethod
  );
  if (!method) return null;

  const variants = Object.keys(method.options);

  const isScreenPrinting = decorationMethod === "Screen Printing";
  const isDTF = decorationMethod === "DTF";
  const isEmbroidery = decorationMethod === "Embroidery";

  const isLockedVariant = isDTF || isEmbroidery;

  // Determine max ink colors
  const maxInkColors =
    isScreenPrinting && selected === "2_color" ? 2 : 1;

  // ⭐ Normalize ink colors (inject white + enforce maxColors)
  const normalizedInkColors = (() => {
    let colors = [...selectedInkColors];

    // Inject white when dark shirt requires it
    if (lockTwoColor && isScreenPrinting && selected === "2_color") {
      if (!colors.includes("White")) {
        colors = ["White", ...colors];
      }
    }

    // Enforce maxColors (2)
    if (colors.length > maxInkColors) {
      if (lockTwoColor) {
        const withoutWhite = colors.filter((c) => c !== "White");
        colors = ["White", ...withoutWhite.slice(0, maxInkColors - 1)];
      } else {
        colors = colors.slice(0, maxInkColors);
      }
    }

    return colors;
  })();

  return (
    <div className="space-y-4">

      {/* Paint Count / Decoration Type */}
      <div>
        <div className="uppercase text-sm font-semibold mb-2 flex items-center">
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
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {variants.map((v) => {
            const isSelected = selected === v;

            const isDisabled =
              isLockedVariant ||
              (lockTwoColor && v === "1_color");

            return (
              <button
                key={v}
                onClick={() => {
                  if (!isDisabled) {
                    // ⭐ Only reset ink colors if switching AWAY from Screen Printing
                    if (decorationMethod !== "Screen Printing") {
                      setSelectedInkColors([]);
                    }

                    onSelect(v);
                  }
                }}
                disabled={isDisabled}
                className={`
                  px-3 py-1 rounded-lg text-sm transition
                  ${isSelected ? "border-[3px] border-[#E9252E]" : "border border-gray-300"}
                  ${
                    isDisabled
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

      {/* Ink Color Selector */}
      {isScreenPrinting && selected && (
        <InkColorSelector
          inkColors={method.inkColors || []}
          selected={normalizedInkColors}
          maxColors={maxInkColors}
          onSelect={(colors) => {
            let updated = [...colors];

            // Prevent removing white
            if (lockTwoColor) {
              const withoutWhite = updated.filter((c) => c !== "White");
              updated = ["White", ...withoutWhite];
            }

            // Enforce maxColors
            if (updated.length > maxInkColors) {
              const withoutWhite = updated.filter((c) => c !== "White");
              updated = lockTwoColor
                ? ["White", ...withoutWhite.slice(0, maxInkColors - 1)]
                : updated.slice(0, maxInkColors);
            }

            setSelectedInkColors(updated);
          }}
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