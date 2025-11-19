export type RadioGroupItem = {
  id: string | number;
  label: string;
  value: string;
};

type RadioGroupProps = {
  list: RadioGroupItem[];
  value: RadioGroupItem;
  onChange: (item: RadioGroupItem) => void;
};

export default function RadioGroup({ list, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-3" role="radiogroup">
      {list.map((item) => {
        const isSelected = item.id === value.id;

        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(item)}
            className={`flex items-center gap-2 transition ${isSelected ? "text-primary-600" : "text-gray-700"}`}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                isSelected ? "border-primary-500" : "border-gray-300"
              }`}
            >
              {isSelected && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
            </div>
            <span className="text-body-small-500">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
