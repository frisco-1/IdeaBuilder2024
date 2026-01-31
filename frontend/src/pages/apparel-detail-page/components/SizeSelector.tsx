import type { ApparelSize } from "../types/apparel.types";

interface Props {
  sizes: ApparelSize[];
  quantities: Record<string, number>;
  onChange: (size: string, qty: number) => void;
}

export default function SizeSelector({ sizes, quantities, onChange }: Props) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {sizes.map((s) => (
        <div key={s.size} className="flex flex-col items-center">
          {/* Size label */}
          <span className="font-semibold text-sm">{s.size}</span>

          {/* Quantity input */}
          <input
            type="number"
            min={0}
            className="w-12 border rounded-lg p-1 text-center text-sm"
            value={quantities[s.size] || ""}
            onChange={(e) =>
              onChange(s.size, parseInt(e.target.value) || 0)
            }
          />

          {/* Optional: show plus-size fee */}
          {s.additionalFee > 0 && (
            <span className="text-[10px] text-gray-500 mt-1">
              +${s.additionalFee.toFixed(2)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}