import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/types/type";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAddCategoryMutation } from "./AdminApiSlice";
import { ICONS } from "@/lib/data";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
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

export default function FormAddCategory() {
  const [add, setAdd] = useState(false);
  const [addCategory] = useAddCategoryMutation();

  const [state, setState] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const onReset = () => {
    setAdd(false);
  };

  return (
    <div>
      <Button onClick={() => setAdd(true)}>Add</Button>
      {add ? (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/30 z-[100]">
          <form
            onSubmit={onSubmit}
            onReset={onReset}
            className="bg-zinc-100 rounded-lg p-4 flex flex-col gap-4 max-w-[1024px]"
          >
            <div>
              <p className="font-bold text-zinc-900">Add Category</p>
            </div>
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
              <Button type="submit">Add</Button>
              <Button type="reset" variant="ghost">
                Close
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
