import { Category } from "@/types/type";
import React, {
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/lib/data";
import toast from "react-hot-toast";

const initialState: Category = {
  id: "",
  label: "",
  value: "",
  icon: "",
  detail: "",
  sortIndex: 0,
  group: "",
  groupNo: 0,
};

export default function FormEditCategory({
  category,
  setEdit,
}: {
  category: Category;
  setEdit: Dispatch<SetStateAction<Category | null>>;
}) {
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [state, setState] = useState<Category>({
    ...initialState,
    ...category,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      setEdit(null);
    } else if (response?.error) {
      toast.error("Error updating category");
    }
  };

  const onReset = () => {
    setEdit(null);
  };

  const onDelete = async () => {
    if (confirm("Delete this category?") && category?.id) {
      const response = await deleteCategory(category?.id);

      console.log(response);
      setEdit(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/30 z-[100]">
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        className="bg-zinc-100 rounded-lg p-4 flex flex-col gap-4"
      >
        <div>
          <p className="font-bold text-zinc-900">Edit Category</p>
        </div>{" "}
        <div className="field">
          <Label>Group</Label>
          <Input
            id="group"
            name="group"
            value={state?.group ?? ""}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <Label>Group No</Label>
          <Input
            id="groupNo"
            name="groupNo"
            value={state?.groupNo ? +state?.groupNo : 0}
            onChange={onChange}
          />
          {/* <Select>
                <SelectTrigger>Select Group</SelectTrigger>
                <SelectContent></SelectContent>
              </Select> */}
        </div>
        <div className="field">
          <Label htmlFor="label">Label</Label>
          <Input
            type="text"
            id="label"
            name="label"
            value={state?.label ?? ""}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <Label htmlFor="value">Value</Label>
          <Input
            type="text"
            id="value"
            name="value"
            disabled
            value={state?.value ?? ""}
          />
        </div>
        <div className="field">
          <Label htmlFor="detail">Detail</Label>
          <Input
            type="text"
            id="detail"
            name="detail"
            value={state?.detail ?? ""}
            onChange={onChange}
          />
        </div>
        <p className="font-semibold">Icon</p>
        <div className="flex items-center gap-2 flex-wrap">
          {(Object.keys(ICONS) as Array<keyof typeof ICONS>).map(
            (item, idx) => (
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
            )
          )}
        </div>
        <div className="ml-auto space-x-2">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="ghost">
            Cancel
          </Button>
          <Button variant="outline" type="button" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
