import { ChangeEvent, useEffect } from "react";

export default function SelectField({
  label,
  value,
  options,
  onValueChange,
  className,
}: {
  label: string;
  value?: string | number;
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  className?: string;
}) {
  useEffect(() => {}, [options]);

  return (
    <div className={"flex flex-col " + className}>
      <label htmlFor="Select" className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <select
        id="Select"
        name=""
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onValueChange(event.target.value)
        }
        className="px-4 py-2 text-gray-700 bg-white border-[1px] border-gray-300 rounded-md shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
