import type { InkColor } from "../types/apparel.types";
import Tooltip from "./Tooltip";

interface Props {
  inkColors: InkColor[];
  selected: string[];        // normalized selection from VariantSelector
  onSelect: (newSelection: string[]) => void;
  maxColors: number;         // 1 or 2
}

export default function InkColorSelector({
  inkColors,
  selected,
  onSelect,
  maxColors
}: Props) {

  const toggleColor = (hex: string) => {
    const isSelected = selected.includes(hex);

    // Remove color
    if (isSelected) {
      onSelect(selected.filter((c) => c !== hex));
      return;
    }

    // If selecting new color but max reached → replace the non-white color
    if (selected.length >= maxColors) {
      // If white is selected, keep white and replace the other color
      if (selected.includes("White")) {
        const updated = ["White", hex]; // White stays, new color replaces old
        onSelect(updated);
        return;
      }

      // If white is NOT selected (light shirt case), replace last color
      const updated = [...selected.slice(1), hex];
      onSelect(updated);
      return;
    }

    // Add normally
    onSelect([...selected, hex]);
  };

  return (
    <div className="space-y-2">

      {/* Header with Selected text on the right */}
      <div className="flex items-center justify-between">
        <div className="uppercase text-sm font-semibold flex items-center">
          Ink Colors (choose {maxColors})
          <Tooltip
            title="Ink Colors"
            description={`Choose up to ${maxColors} ink color${maxColors > 1 ? "s" : ""} for your screen printed design.`}
          />
        </div>

        <span className="text-xs text-gray-600">
          Selected:{" "}
          {selected.length === 0
            ? "None"
            : selected
                .map((hex) => inkColors.find((c) => c.hex === hex)?.name)
                .filter(Boolean)
                .join(", ")}
        </span>
      </div>

      {/* Swatches */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {inkColors.map((c) => {
          const isSelected = selected.includes(c.hex);

          return (
            <div key={c.key} className="flex flex-col items-center space-y-1">
              <span className="text-xs font-medium text-gray-700">
                {c.name}
              </span>

              <div
                onClick={() => toggleColor(c.hex)}
                className={`
                  w-8 h-8 rounded-lg cursor-pointer transition
                  ${isSelected ? "border-[3px] border-[#E9252E]" : "border"}
                `}
                style={{ backgroundColor: c.hex }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}