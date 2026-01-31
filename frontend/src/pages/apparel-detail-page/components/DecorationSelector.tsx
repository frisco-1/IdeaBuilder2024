interface Props {
  methods: string[];
  selected: string | null;
  onSelect: (method: string) => void;
}

export default function DecorationSelector({ methods, selected, onSelect }: Props) {
  return (
    <div>
      <p className="uppercase text-sm font-semibold mb-2">Decoration</p>

      <div className="flex flex-wrap gap-2">
        {methods.map((m) => {
          const isSelected = selected === m;

          return (
            <button
              key={m}
              onClick={() => onSelect(m)}
              className={`
                px-3 py-1 rounded-lg text-sm transition
                ${isSelected
                  ? "border-[3px] border-[#E9252E]"
                  : "border border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );
}