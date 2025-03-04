import { Button } from "@/components/ui/button";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAddCategoryMutation } from "./AdminApiSlice";
import { ICONS } from "@/lib/data";
import toast from "react-hot-toast";
import { T_Category } from "@/lib/templates";
import FormContainer from "@/components/forms/FormContainer";
import InputField from "@/components/InputField";

export default function FormAddCategory({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [addCategory] = useAddCategoryMutation();

  const [state, setState] = useState(T_Category);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((curr) => ({ ...curr, [event.target.name]: event.target.value }));
  };

  const [icon, setIcon] = useState("");

  // const regexLowerCase = /\b[A-Z]{2,}\b/g;

  useEffect(() => {
    setState((curr) => ({
      ...curr,
      value: curr.label.replace(/\s+/g, "_").toLowerCase(),
    }));
  }, [state?.label]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await addCategory({
      ...state,
      icon,
      id: crypto.randomUUID(),
    });

    if (response?.data) {
      toast.success("Category created");
      setAdd(false);
    } else if (response?.error) {
      toast.error("Error creating category");
    }
  };

  return (
    <FormContainer closeForm={setAdd} onSubmit={onSubmit} title="Add Category">
      <InputField
        label="Group"
        name="group"
        value={state?.group ?? ""}
        type="text"
        handleChange={handleChange}
      />
      <InputField
        label="Group No"
        name="groupNo"
        value={state?.groupNo ?? 0}
        type="number"
        handleChange={handleChange}
      />
      <InputField
        label="Label"
        name="label"
        value={state?.label ?? ""}
        type="text"
        handleChange={handleChange}
      />
      <InputField
        label="Value"
        name="value"
        value={state?.value ?? ""}
        type="text"
        handleChange={handleChange}
        disabled={true}
      />
      <InputField
        label="Detail"
        name="detail"
        value={state?.detail ?? ""}
        type="text"
        handleChange={handleChange}
      />
      <p className="font-semibold">Icon</p>
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.keys(ICONS) as Array<keyof typeof ICONS>).map((item, idx) => (
          <Button
            key={idx}
            onClick={() => setIcon(item)}
            variant={icon === item ? "default" : "ghost"}
            className=""
            type="button"
            title={item}
          >
            {ICONS[item]}
          </Button>
        ))}
      </div>
    </FormContainer>
  );
}
