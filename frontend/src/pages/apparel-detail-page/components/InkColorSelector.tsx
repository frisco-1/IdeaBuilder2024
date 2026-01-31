import type { InkColor } from "../types/apparel.types";

interface Props {
  inkColors: InkColor[];
  selected: string[]; // array of hex values or keys
  onSelect: (newSelection: string[]) => void;
  maxColors: number; // 1 for 1-color, 2 for 2-color
}

export default function InkColorSelector({
  inkColors,
  selected,
  onSelect,
  maxColors
}: Props) {
  const toggleColor = (hex: string) => {
    // If already selected → remove it
    if (selected.includes(hex)) {
      onSelect(selected.filter((c) => c !== hex));
      return;
    }

    // If selecting new color but max reached → replace last
    if (selected.length >= maxColors) {
      const updated = [...selected.slice(1), hex];
      onSelect(updated);
      return;
    }

    // Otherwise add normally
    onSelect([...selected, hex]);
  };

  return (
    <div className="space-y-2">
      <p className="uppercase text-sm font-semibold">
        Ink Colors (choose {maxColors})
      </p>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {inkColors.map((c) => {
          const isSelected = selected.includes(c.hex);

          return (
            <div
              key={c.key}
              className="flex flex-col items-center space-y-1"
            >
              {/* Label */}
              <span className="text-xs font-medium text-gray-700">
                {c.name}
              </span>

              {/* Swatch */}
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

      {/* Selected Color Names */}
      <div className="text-xs text-gray-600">
        Selected:{" "}
        {selected.length === 0
          ? "None"
          : selected
              .map((hex) => inkColors.find((c) => c.hex === hex)?.name)
              .filter(Boolean)
              .join(", ")}
      </div>
    </div>
  );
}