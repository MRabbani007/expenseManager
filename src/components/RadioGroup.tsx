import { ReactNode } from "react";

export default function RadioGroup({
  label,
  name,
  value,
  options,
  onChange,
  showIcon = false,
}: {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string; icon?: ReactNode }[];
  onChange: (name: string, val: string) => void;
  showIcon?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-zinc-700">{label}</p>
      <div className="flex items-center gap-4">
        {options.map((item) => (
          <div key={item.value} className="flex items-center gap-1">
            <input
              type="radio"
              id={name + item.value}
              name={name}
              checked={value === item.value}
              value={item.value}
              onChange={(event) => onChange(name, event.target.value)}
            />
            <label
              htmlFor={name + item.value}
              className="text-sm md:text-base font-medium text-zinc-700 p-1 flex items-center"
            >
              {showIcon === true && item?.icon}
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
