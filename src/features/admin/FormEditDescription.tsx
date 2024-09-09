import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  useDeleteDescriptionMutation,
  useEditDescriptionMutation,
  useGetCategoriesQuery,
} from "./AdminApiSlice";
import { Category, Description } from "@/types/type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/lib/data";
import { useDropzone } from "react-dropzone";
import UploadProgressBar from "@/components/storage/UploadProgressBar";
import toast from "react-hot-toast";

const initialState: Description = {
  id: "",
  userId: "",
  label: "",
  value: "",
  icon: "",
  isSelected: false,
  category: "",
  categoryID: "",
};

export default function FormEditDescription({
  description,
  setEdit,
}: {
  description: Description;
  setEdit: Dispatch<SetStateAction<Description | null>>;
}) {
  const [editDescription] = useEditDescriptionMutation();
  const [deleteDescription] = useDeleteDescriptionMutation();

  const { data: categories, isSuccess } = useGetCategoriesQuery();

  const [state, setState] = useState({ ...initialState, ...description });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((curr) => ({ ...curr, [event.target.name]: event.target.value }));
  };

  const handleCategory = (cat: Category) => {
    setState((curr) => ({
      ...curr,
      category: cat.label,
      categoryID: cat?.id ?? "",
    }));
  };

  useEffect(() => {
    setState((curr) => ({
      ...curr,
      value: curr.label.replace(/\s+/g, "_").toLowerCase(),
    }));
  }, [state?.label]);

  const [file, setFile] = useState<File | null>(null);
  const [foldername, setFoldername] = useState("images/description/");
  const [url, setURL] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await editDescription({
      ...state,
      icon: url ?? state?.icon ?? "",
    });

    if (response?.data) {
      toast.success("Description updated");
      setEdit(null);
    } else if (response?.error) {
      toast.error("Error updating description");
    }
  };

  const onReset = () => {
    setEdit(null);
  };

  const onDelete = async () => {
    if (confirm("Delete this description?") && description?.id) {
      const response = await deleteDescription(description?.id);

      if (response?.data) {
        toast.success("Description deleted");
        setEdit(null);
      } else if (response?.error) {
        toast.error("Error deleting description");
      }

      setEdit(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/30 z-[100]">
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        className="bg-zinc-100 rounded-lg p-4 flex flex-col gap-2 max-w-[1024px]"
      >
        <div>
          <p className="font-bold text-zinc-900">Edit Description</p>
        </div>
        <div className="overflow-y-auto max-h-[60vh] flex flex-col gap-4 ">
          <div className="field">
            <Label htmlFor="label">Label</Label>
            <Input
              type="text"
              id="label"
              name="label"
              value={state?.label || ""}
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
            <Label htmlFor="isSelected">Default List</Label>
            <Input
              type="checkbox"
              id="isSelected"
              name="isSelected"
              value={state?.isSelected ? "true" : "false"}
              onChange={() =>
                setState((curr) => ({ ...curr, isSelected: !curr?.isSelected }))
              }
              className="w-4"
            />
          </div>
          <p className="font-semibold">Icon</p>
          <div
            {...getRootProps()}
            className="w-full h-full flex-1 border-2 border-dashed border-zinc-600 flex flex-col gap-4 items-center "
          >
            <div className="w-full h-full  overflow-hidden flex items-center">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full max-w-20 max-h-20 object-fill"
                />
              ) : url ? (
                <img
                  src={url}
                  className={"w-full h-full max-w-20 max-h-20 object-cover"}
                />
              ) : state?.icon ? (
                <img
                  src={state?.icon}
                  className={"w-full h-full max-w-20 max-h-20 object-cover"}
                />
              ) : (
                <p className="w-fit mx-auto my-auto">
                  Drag and drop files here or click to browse.
                </p>
              )}
            </div>
            <input {...getInputProps()} />
          </div>
          {!url && (
            <UploadProgressBar
              file={file}
              setFile={setFile}
              setURL={setURL}
              foldername={foldername}
            />
          )}
          <span>Category</span>
          <div className="flex items-center gap-2 flex-wrap">
            {isSuccess && Array.isArray(categories)
              ? categories.map((item: Category, idx: number) => (
                  <div
                    key={idx}
                    title={item.label}
                    className={
                      (state?.category === item.label
                        ? "bg-yellow-400/50"
                        : "") +
                      " flex flex-col items-center py-2 px-4 rounded-lg"
                    }
                    onClick={() => handleCategory(item)}
                  >
                    {ICONS[item.icon as keyof typeof ICONS]}
                    {/* <p className="font-mono">{item.label}</p> */}
                  </div>
                ))
              : null}
            {/* {(Object.keys(ICONS) as Array<keyof typeof ICONS>).map(
        (item, idx) => (
          <Button
            key={idx}
            variant={true ? "default" : "ghost"}
            type="button"
            title={item}
          ></Button>
        )
      )} */}
          </div>
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
