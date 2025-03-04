import {
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import UploadProgressBar from "@/components/storage/UploadProgressBar";
import toast from "react-hot-toast";
import FormContainer from "@/components/forms/FormContainer";
import InputField from "@/components/InputField";
import { getIcon } from "@/lib/icons";
import ToolTip from "@/components/ToolTip";

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
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editDescription] = useEditDescriptionMutation();
  const [deleteDescription] = useDeleteDescriptionMutation();

  const { data: categories, isSuccess } = useGetCategoriesQuery();

  const [state, setState] = useState<Description>({
    ...initialState,
    ...description,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      setEdit(false);
    } else if (response?.error) {
      toast.error("Error updating description");
    }
  };

  const onDelete = async () => {
    if (confirm("Delete this description?") && description?.id) {
      const response = await deleteDescription(description?.id);

      if (response?.data) {
        toast.success("Description deleted");
        setEdit(false);
      } else if (response?.error) {
        toast.error("Error deleting description");
      }
    }
  };

  return (
    <FormContainer
      closeForm={setEdit}
      onSubmit={onSubmit}
      title="Edit Description"
      deleteButton={true}
      onDelete={onDelete}
    >
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
                  (state?.categoryID === item.id ? "bg-yellow-400/50" : "") +
                  " flex flex-col items-center py-2 px-4 rounded-lg"
                }
                onClick={() => handleCategory(item)}
              >
                <ToolTip title={item?.label}>{getIcon(item.icon)}</ToolTip>
              </div>
            ))
          : null}
      </div>
    </FormContainer>
  );
}
