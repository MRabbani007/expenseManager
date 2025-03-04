import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} from "./AdminApiSlice";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/lib/data";
import toast from "react-hot-toast";
import FormContainer from "@/components/forms/FormContainer";
import InputField from "@/components/InputField";
import { T_Category } from "@/lib/templates";

export default function FormEditCategory({
  category,
  setEdit,
}: {
  category: Category;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [state, setState] = useState<Category>({
    ...T_Category,
    ...category,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((curr) => ({ ...curr, [event.target.name]: event.target.value }));
  };

  const [icon, setIcon] = useState(category?.icon ?? "");

  useEffect(() => {
    setState((curr) => ({
      ...curr,
      value: curr.label.replace(/\s+/g, "_").toLowerCase(),
    }));
  }, [state?.label]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await editCategory({ ...state, icon });

    if (response?.data) {
      toast.success("Category updated");
      setEdit(false);
    } else if (response?.error) {
      toast.error("Error updating category");
    }
  };

  const onDelete = async () => {
    if (confirm("Delete this category?") && category?.id) {
      await deleteCategory(category?.id);

      setEdit(false);
    }
  };

  return (
    <FormContainer
      closeForm={setEdit}
      onSubmit={onSubmit}
      title="Edit Category"
      deleteButton={true}
      onDelete={onDelete}
    >
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
