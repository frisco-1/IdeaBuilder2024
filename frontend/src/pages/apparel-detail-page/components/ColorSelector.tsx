import type { ApparelColor } from "../types/apparel.types";

interface Props {
  colors: ApparelColor[];
  selected: string | null;
  onSelect: (hex: string) => void;
}

export default function ColorSelector({ colors, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => {
        const isSelected = selected === c.hex;

        return (
          <div
            key={c.hex}
            onClick={() => onSelect(c.hex)}
            className={`
              w-8 h-8 rounded-lg cursor-pointer transition-transform
              ${isSelected 
                ? "border-[3px] border-[#E9252E] scale-110" 
                : "border border-gray-300 hover:border-gray-400"
              }
            `}
            style={{ backgroundColor: c.hex }}
            title={c.name}
          />
        );
      })}
    </div>
  );
}