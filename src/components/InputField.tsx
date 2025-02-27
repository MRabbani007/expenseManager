import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string | number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  className?: string;
};

export default function InputField({
  type = "text",
  label,
  name,
  value = "",
  autoFocus = false,
  handleChange,
  className = "",
}: Props) {
  return (
    <div className={"flex flex-col " + className}>
      <label htmlFor={name} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        autoFocus={autoFocus}
        placeholder={label}
        value={value ?? ""}
        onChange={handleChange}
        className="py-2 px-4 bg-white border-[1px] border-zinc-300 outline-none rounded-md"
      />
    </div>
  );
}
