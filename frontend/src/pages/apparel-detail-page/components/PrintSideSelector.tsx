interface Props {
  selected: "1 SIDE" | "2 SIDES" | null;
  onSelect: (side: "1 SIDE" | "2 SIDES") => void;
}

export default function PrintSideSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <p className="uppercase text-sm font-semibold mb-2">Print Side</p>

      <div className="flex gap-2">
        {["1 SIDE", "2 SIDES"].map((side) => {
          const isSelected = selected === side;

          return (
            <button
              key={side}
              onClick={() => onSelect(side as "1 SIDE" | "2 SIDES")}
              className={`
                px-3 py-1 rounded-lg text-sm transition
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
  );
}